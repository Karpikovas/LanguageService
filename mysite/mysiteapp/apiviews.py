from .models import Card, Translate

from .serializers import CardSerializer, TranslateSerializer, ChooseTranslateSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class WordsList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class WordDetail(generics.RetrieveDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class TranslateList(generics.ListCreateAPIView):
    def get_queryset(self):
        queryset  = Translate.objects.filter(card_id=self.kwargs["pk"])
        return queryset
    serializer_class = TranslateSerializer

class ChooseTranslateView(APIView):
    def post(self, request, pk, translate_pk):
        data = {'card': pk, 'translate': translate_pk, 'user': user}
        serializer = ChooseTranslateSerializer(data=data)
        if serializer.is_valid():
            chooseTranslate = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)