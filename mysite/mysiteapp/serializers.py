from rest_framework import serializers
from .models import Card, Translate

class TranslateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translate
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
    translates = TranslateSerializer(many=True, required=False, read_only=True)
    class Meta:
        model = Card
        fields = '__all__'