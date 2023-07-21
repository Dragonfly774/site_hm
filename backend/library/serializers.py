from rest_framework import serializers
from library.models import Book, Genre, Author, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"

class CountryRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Country.objects.get(name=data)

class GenreRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Genre.objects.get(name=data)

class AuthorRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return f'{value.first_name} {value.second_name}'

    def to_internal_value(self, data):
        first_name = data.split()[0]
        second_name = data.split()[1]
        return Author.objects.get(first_name=first_name, second_name=second_name)



class BookSerializer(serializers.ModelSerializer):
    author = AuthorRelatedField(
        queryset=Author.objects.all()
    )
    genres = GenreRelatedField(
        queryset=Genre.objects.all(),
        many=True
    )

    class Meta:
        model = Book
        fields = (
            'id',
            'name',
            'annotation',
            'author',
            'genres'
        )


class AuthorSerializer(serializers.ModelSerializer):
    country = CountryRelatedField(
        queryset=Country.objects.all()
    )
    class Meta:
        model = Author
        fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"
