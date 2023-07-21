from django.contrib import admin
from .models import Author,Country, Genre, Book
# Register your models here.

admin.site.register(Country)
admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(Book)
