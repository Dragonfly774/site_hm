from django.urls import path, include

from rest_framework.routers import DefaultRouter

from library.views import BookView, AuthorView, GenreView, CountryView

router = DefaultRouter()
router.register(r'book', BookView, basename='book')
router.register(r'author', AuthorView, basename='author')
router.register(r'genre', GenreView, basename='genre')
router.register(r'country', CountryView, basename='country')
urlpatterns = router.urls
