---
name: python-patterns
type: reference
description: Pythonic idioms, PEP 8 standards, type hints, and best practices for building robust, efficient, and maintainable Python applications.
category: code
source: everything-claude-code
model: any
---

# Python Development Patterns

## When to Activate
- Writing, reviewing, or refactoring Python code
- Designing Python packages/modules

## Core Principles

1. **Readability counts** — clear names, type hints, docstrings. No clever one-liners.
2. **Explicit > implicit** — no hidden side effects, no magic setup calls.
3. **EAFP** — prefer `try/except` over pre-checking conditions (Pythonic).

## Type Hints

```python
# Modern (3.10+): built-in types, union with |
def process(user_id: str, data: dict[str, Any], active: bool = True) -> User | None: ...
def first(items: list[T]) -> T | None:
    return items[0] if items else None

# Protocol-based duck typing
class Renderable(Protocol):
    def render(self) -> str: ...

def render_all(items: list[Renderable]) -> str:
    return "\n".join(item.render() for item in items)

# Type alias for complex types
JSON = dict[str, Any] | list[Any] | str | int | float | bool | None
```

## Error Handling

```python
# Catch specific exceptions, chain with `from`
try:
    with open(path) as f:
        return Config.from_json(f.read())
except FileNotFoundError as e:
    raise ConfigError(f"Config not found: {path}") from e
except json.JSONDecodeError as e:
    raise ConfigError(f"Invalid JSON: {path}") from e

# Custom hierarchy
class AppError(Exception): pass
class ValidationError(AppError): pass
class NotFoundError(AppError): pass
```

**Rules:** Never bare `except:`. Never silently swallow. Always chain with `from e`.

## Context Managers

```python
# Function-based (contextlib)
@contextmanager
def timer(name: str):
    start = time.perf_counter()
    yield
    print(f"{name}: {time.perf_counter() - start:.4f}s")

# Class-based (for stateful resources)
class DatabaseTransaction:
    def __enter__(self):
        self.conn.begin_transaction()
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit() if exc_type is None else self.conn.rollback()
        return False  # don't suppress exceptions
```

## Data Containers

```python
# Dataclass — mutable, auto __init__/__repr__/__eq__
@dataclass
class User:
    id: str
    name: str
    email: str
    created_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):  # validation hook
        if "@" not in self.email:
            raise ValueError(f"Invalid email: {self.email}")

# NamedTuple — immutable, lightweight
class Point(NamedTuple):
    x: float
    y: float
```

**Decision:** Mutable + methods -> `@dataclass`. Immutable value object -> `NamedTuple`. Many instances, tight memory -> add `__slots__`.

## Comprehensions & Generators

```python
# List comp for simple transforms
names = [u.name for u in users if u.is_active]

# Generator for large data (lazy, memory-efficient)
total = sum(x * x for x in range(1_000_000))  # no intermediate list

def read_large_file(path: str) -> Iterator[str]:
    with open(path) as f:
        for line in f:
            yield line.strip()
```

**Rule:** If comprehension needs multiple `if` clauses or nesting, use a regular loop.

## Decorators

```python
# Basic — always use functools.wraps
def timer(func: Callable) -> Callable:
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

# Parameterized
def repeat(times: int):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return [func(*args, **kwargs) for _ in range(times)]
        return wrapper
    return decorator
```

## Concurrency Decision

| Pattern | Use When | GIL Impact |
|---------|----------|------------|
| `ThreadPoolExecutor` | I/O-bound (HTTP, file, DB) | No issue |
| `ProcessPoolExecutor` | CPU-bound (math, image) | Bypasses GIL |
| `asyncio` + `await` | High-concurrency I/O | No issue |

```python
# Threads for I/O
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
    results = {url: ex.submit(fetch, url) for url in urls}

# Async for high-concurrency I/O
async def fetch_all(urls: list[str]) -> list[str]:
    return await asyncio.gather(*[fetch(u) for u in urls], return_exceptions=True)
```

## Package Layout

```
src/mypackage/__init__.py|main.py|api/|models/|utils/
tests/conftest.py|test_api.py|test_models.py
pyproject.toml
```

**Import order:** stdlib -> third-party -> local. Use `isort`. Export via `__all__` in `__init__.py`.

## Performance Tips

| Problem | Solution |
|---------|----------|
| High memory (many instances) | Add `__slots__` to class |
| Large intermediate lists | Use generators / `yield` |
| String concat in loops (O(n^2)) | `"".join(...)` (O(n)) |
| Repeated dict lookups | Local variable for inner loop |

## Anti-Patterns

| Bad | Good |
|-----|------|
| `def f(items=[])` (mutable default) | `def f(items=None)` then `items = items or []` |
| `type(obj) == list` | `isinstance(obj, list)` |
| `value == None` | `value is None` |
| `from module import *` | Explicit imports |
| Bare `except: pass` | `except SpecificError as e: log(e)` |

## Tooling (pyproject.toml)

```toml
[tool.black]
line-length = 88
[tool.ruff]
line-length = 88
select = ["E", "F", "I", "N", "W"]
[tool.mypy]
python_version = "3.9"
disallow_untyped_defs = true
```

**Commands:** `black .` | `isort .` | `ruff check .` | `mypy .` | `pytest --cov` | `bandit -r .`

## Quick Reference

| Idiom | Purpose |
|-------|---------|
| EAFP (`try/except`) | Pythonic conditional access |
| `with` (context managers) | Resource management |
| List comprehensions | Simple transforms |
| Generators / `yield` | Lazy eval, large data |
| Type hints | Function signatures |
| `@dataclass` | Auto-generated data containers |
| `__slots__` | Memory optimization |
| f-strings | String formatting |
| `pathlib.Path` | Cross-platform paths |
| `enumerate()` | Index-element iteration |
