---
name: python-testing
type: reference
description: Python testing strategies using pytest, TDD methodology, fixtures, mocking, parametrization, and coverage requirements.
category: test
source: everything-claude-code
model: any
---

# Python Testing Patterns

## When to Activate
- Writing new Python code (follow TDD: red, green, refactor)
- Designing test suites, reviewing coverage, setting up testing infra

## TDD Cycle
1. **RED**: Write failing test for desired behavior
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Improve while keeping green

**Coverage target:** 80%+ overall, 100% on critical paths. Measure: `pytest --cov=pkg --cov-report=term-missing`

## Assertions Quick Reference

```python
assert result == expected                          # equality
assert result is None / is True / is False         # identity
assert item in collection                          # membership
assert isinstance(result, str)                     # type
with pytest.raises(ValueError, match="invalid"):   # exception + message
    raise ValueError("invalid input")
with pytest.raises(CustomError) as exc_info:       # exception attributes
    raise CustomError("err", code=400)
assert exc_info.value.code == 400
```

## Fixtures

```python
# Basic — returns data
@pytest.fixture
def sample_data():
    return {"name": "Alice", "age": 30}

# Setup/teardown — yield pattern
@pytest.fixture
def database():
    db = Database(":memory:")
    db.create_tables()
    yield db          # provided to test
    db.close()        # teardown

# Scopes: function (default), module, session
@pytest.fixture(scope="session")
def shared_resource():
    r = ExpensiveResource()
    yield r
    r.cleanup()

# Parameterized fixture — test runs once per param
@pytest.fixture(params=["sqlite", "postgresql"])
def db(request):
    return Database(request.param)

# Autouse — runs for every test automatically
@pytest.fixture(autouse=True)
def reset_config():
    Config.reset()
    yield
    Config.cleanup()
```

**Shared fixtures** go in `tests/conftest.py` — pytest discovers them automatically.

## Parametrization

```python
@pytest.mark.parametrize("input,expected", [
    ("hello", "HELLO"),
    ("world", "WORLD"),
], ids=["basic", "another"])
def test_uppercase(input, expected):
    assert input.upper() == expected
```

## Markers & Test Selection

```python
@pytest.mark.slow           # custom marker
@pytest.mark.integration    # custom marker
```

```bash
pytest -m "not slow"                  # skip slow
pytest -m "integration"               # only integration
pytest -k "test_user"                 # pattern match
pytest -x                             # stop on first failure
pytest --lf                           # rerun last failed
```

Register in `pytest.ini` or `pyproject.toml` under `[tool.pytest.ini_options]` with `markers = [...]`.

## Mocking

```python
from unittest.mock import patch, Mock, PropertyMock, mock_open

# Mock function return value
@patch("mypackage.external_api_call")
def test_api(mock_call):
    mock_call.return_value = {"status": "success"}
    result = my_function()
    mock_call.assert_called_once()

# Mock exception
@patch("mypackage.api_call")
def test_error(mock_call):
    mock_call.side_effect = ConnectionError("fail")
    with pytest.raises(ConnectionError):
        api_call()

# Mock file open
@patch("builtins.open", new_callable=mock_open)
def test_file(mock_file):
    mock_file.return_value.read.return_value = "content"

# Autospec — catches API misuse
@patch("mypackage.DBConnection", autospec=True)
def test_autospec(db_mock): ...

# Mock property
type(mock_obj).debug = PropertyMock(return_value=True)
```

## Async Testing

```python
@pytest.mark.asyncio
async def test_async():
    result = await async_add(2, 3)
    assert result == 5

# Async mock — use assert_awaited_once()
@pytest.mark.asyncio
@patch("mypackage.async_api_call")
async def test_async_mock(mock_call):
    mock_call.return_value = {"status": "ok"}
    result = await my_async_function()
    mock_call.assert_awaited_once()
```

## Test Organization

```
tests/
  conftest.py              # shared fixtures
  unit/test_models.py      # fast, isolated
  integration/test_api.py  # real dependencies
  e2e/test_user_flow.py   # full workflows
```

Group related tests in classes with `@pytest.fixture(autouse=True)` for shared setup.

## Common Patterns

```python
# API endpoint testing (Flask/FastAPI)
@pytest.fixture
def client():
    return create_app(testing=True).test_client()

def test_create_user(client):
    resp = client.post("/api/users", json={"name": "Alice"})
    assert resp.status_code == 201

# Database with rollback
@pytest.fixture
def db_session():
    session = Session(bind=engine)
    session.begin_nested()
    yield session
    session.rollback()
    session.close()

# Temp files — use built-in tmp_path
def test_file(tmp_path):
    f = tmp_path / "test.txt"
    f.write_text("hello")
    assert process_file(str(f)) == "hello"
```

## DO / DON'T

| DO | DON'T |
|----|-------|
| Follow TDD (red-green-refactor) | Test implementation details |
| Test one behavior per test | Use complex conditionals in tests |
| Use descriptive names: `test_login_with_invalid_creds_fails` | Share state between tests |
| Use fixtures to eliminate duplication | Test third-party library internals |
| Mock external dependencies | Catch exceptions manually (use `pytest.raises`) |
| Test edge cases (empty, None, boundaries) | Use `print` (use assertions + pytest output) |
| Aim for 80%+ coverage on critical paths | Write brittle, over-specific mocks |
| Mark and separate slow tests | Ignore test failures |

## Configuration (pyproject.toml)

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = ["--strict-markers", "--cov=mypackage", "--cov-report=term-missing"]
markers = ["slow: marks tests as slow", "integration: integration tests"]
```

## Quick Reference

| Pattern | Usage |
|---------|-------|
| `pytest.raises(Ex, match=...)` | Test exceptions |
| `@pytest.fixture(scope=...)` | Reusable setup/teardown |
| `@pytest.mark.parametrize` | Multiple inputs |
| `@patch("mod.thing")` | Mock functions/classes |
| `tmp_path` fixture | Auto-cleaned temp dir |
| `pytest --cov` | Coverage report |
| `pytest -m "not slow"` | Skip slow tests |
| `conftest.py` | Shared fixtures |
