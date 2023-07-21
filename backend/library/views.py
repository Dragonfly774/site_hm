from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from library.models import Book, Genre, Author, Country
from library.serializers import BookSerializer, AuthorSerializer, CountrySerializer, GenreSerializer
from rest_framework import viewsets, permissions

# Create your views here.
"""обработка входящих запросов"""


class CountryView(viewsets.ModelViewSet):
    serializer_class = CountrySerializer
    queryset = Country.objects.all()


class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()


class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class GenreView(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
