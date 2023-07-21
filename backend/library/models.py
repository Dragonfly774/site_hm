from django.db import models

# Create your models here.

'''
Автор книги, Книга, Жанр
'''


class Country(models.Model):
    name_of_the_country = models.CharField(max_length=30)

    def __str__(self):
        return self.name_of_the_country


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    age = models.IntegerField(null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.first_name


class Genre(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=200)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=127)
    annotation = models.TextField(max_length=2500)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, )
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.name
