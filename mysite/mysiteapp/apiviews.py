from .models import Card, Translate

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import CardSerializer

class WordsList(APIView):
    def get(self, request):
        MAX_OBJECTS = 20
        words = Card.objects.all()[:MAX_OBJECTS]
        data = CardSerializer(words, many=True).data
        return Response(data)

class WordDetail(APIView):
    def get(self, request, pk):
        card = get_object_or_404(Card, pk=pk)
        data = CardSerializer(card).data
        return Response(data)