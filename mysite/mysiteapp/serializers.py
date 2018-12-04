from rest_framework import serializers
from .models import *


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

