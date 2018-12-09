from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

class TranslateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Translate
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    translates = TranslateSerializer(many=True, required=False)

    class Meta:
        model = Card
        fields = '__all__'

class CardSerializerShort(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('card', 'is_correct')


class ChooseTranslateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChooseTranslate
        fields = '__all__'


User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        #email = data['email']
        #username = data['username']
        #user_em = User.objects.filter(email=email)
        #user_us = User.objects.filter(username=username)
        #if user_em.exists() or user_us.exists():
         #   raise serializers.ValidationError('Пользователь уже зарегестрирован')
        return data

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        user_obj = User(
            username=username,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data

class CardWordSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model = CardWord
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset=CardWord.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'cards')