from rest_framework import serializers
from .models import Card, Translate, ChooseTranslate

class ChooseTranslateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChooseTranslate
        fields = '__all__'

class TranslateSerializer(serializers.ModelSerializer):
    choices = ChooseTranslateSerializer(many=True, required=False)
    class Meta:
        model = Translate
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
    translates = TranslateSerializer(many=True, required=False, read_only=True)
    class Meta:
        model = Card
        fields = '__all__'