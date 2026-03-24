---
name: django-patterns
type: reference
description: Django architecture patterns, REST API design with DRF, ORM best practices, caching, signals, middleware, and production-grade Django apps.
category: code
source: everything-claude-code
model: any
---

# Django Development Patterns

## When to Activate
- Building Django web apps or REST APIs (DRF)
- Working with Django ORM, models, caching, signals, middleware

## Project Structure

```
myproject/
  config/settings/{base,development,production,test}.py
  config/{urls,wsgi,asgi}.py
  manage.py
  apps/{users,products,...}/
    models.py, views.py, serializers.py, urls.py,
    permissions.py, filters.py, services.py, tests/
```

**Split settings:** `base.py` (shared) -> `development.py` (DEBUG, console email) -> `production.py` (SSL, HSTS, file logging). Select via `DJANGO_SETTINGS_MODULE`.

## Model Patterns

```python
# Always use custom user model from day one
class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

# Model best practices
class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    tags = models.ManyToManyField('Tag', blank=True, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'is_active']),
        ]
        constraints = [
            models.CheckConstraint(check=models.Q(price__gte=0), name='price_non_negative')
        ]

    def save(self, *args, **kwargs):
        if not self.slug: self.slug = slugify(self.name)
        super().save(*args, **kwargs)
```

**Model rules:** Always set `related_name`. Use `db_index=True` or `Meta.indexes` for filtered fields. Use `CheckConstraint` for DB-level validation. Auto-slug in `save()`.

## Custom QuerySets

```python
class ProductQuerySet(models.QuerySet):
    def active(self): return self.filter(is_active=True)
    def with_category(self): return self.select_related('category')
    def with_tags(self): return self.prefetch_related('tags')
    def in_stock(self): return self.filter(stock__gt=0)
    def search(self, q): return self.filter(Q(name__icontains=q) | Q(description__icontains=q))

# Attach: objects = ProductQuerySet.as_manager()
# Chain: Product.objects.active().with_category().in_stock()
```

**Manager extras:** `get_or_none(**kwargs)` — returns None instead of DoesNotExist.

## DRF Serializers

```python
# Read serializer — computed fields, related data
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    discount_price = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discount_price', 'category_name', 'created_at']
        read_only_fields = ['id', 'created_at']

# Write serializer — validation, custom create
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords don't match"})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        pw = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(pw)
        user.save()
        return user
```

**Pattern:** Separate read vs write serializers. Use `get_serializer_class()` in ViewSet to switch.

## ViewSet Pattern

```python
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('tags')
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering = ['-created_at']

    def get_serializer_class(self):
        return ProductCreateSerializer if self.action == 'create' else ProductSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        return Response(ProductService.purchase(self.get_object(), request.user), status=201)
```

## Service Layer

Keep business logic out of views/serializers. Use `@transaction.atomic` for multi-step writes.

```python
class OrderService:
    @staticmethod
    @transaction.atomic
    def create_order(user, cart) -> Order:
        order = Order.objects.create(user=user, total_price=cart.total_price)
        OrderItem.objects.bulk_create([
            OrderItem(order=order, product=i.product, quantity=i.quantity, price=i.product.price)
            for i in cart.items.all()
        ])
        cart.items.all().delete()
        return order
```

## N+1 Prevention

| Relationship | Solution | Method |
|-------------|----------|--------|
| ForeignKey (forward) | `select_related('category')` | SQL JOIN |
| ManyToMany / reverse FK | `prefetch_related('tags')` | Separate query + Python join |
| Nested | `Prefetch('items', queryset=...)` | Custom prefetch queryset |

**Rule:** Never access related objects in a loop without `select_related` or `prefetch_related`.

## Caching

| Level | Method | TTL |
|-------|--------|-----|
| View | `@cache_page(60*15)` | 15 min |
| Template fragment | `{% cache 500 sidebar %}` | 500 sec |
| Low-level | `cache.get(key)` / `cache.set(key, val, timeout)` | Custom |

**Pattern:** Check cache -> miss -> query -> `cache.set(key, result, ttl)` -> return.

## Signals

```python
# signals.py
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created: Profile.objects.create(user=instance)

# apps.py — must import signals in ready()
def ready(self):
    import apps.users.signals
```

**Rule:** Use signals only for cross-app side effects. For same-app logic, call directly.

## Middleware

```python
class RequestLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.start_time = time.time()
    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            logger.info(f'{request.method} {request.path} - {response.status_code} - {time.time() - request.start_time:.3f}s')
        return response
```

## Production Security

```python
# production.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

## Bulk Operations

```python
Product.objects.bulk_create([Product(name=f'P{i}', price=10) for i in range(1000)])
Product.objects.bulk_update(products, ['is_active'])
Product.objects.filter(stock=0).delete()
```

## Quick Reference

| Pattern | Purpose |
|---------|---------|
| Split settings | Env-specific config |
| Custom QuerySet | Reusable, chainable query methods |
| Service layer | Business logic separation |
| `select_related` | FK optimization (JOIN) |
| `prefetch_related` | M2M / reverse FK optimization |
| Separate serializers | Read vs write validation |
| `@action` decorator | Custom ViewSet endpoints |
| `@transaction.atomic` | Multi-step write safety |
| Signals | Cross-app side effects |
| `cache.set(k, v, ttl)` | Low-level caching |
