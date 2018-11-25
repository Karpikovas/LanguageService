from django.http import JsonResponse
from rest_framework.response import Response
import requests
from rest_framework import status
from rest_framework import viewsets
from .models import Card, Translate
from .serializers import CardSerializer, TranslateSerializer

from django.shortcuts import get_object_or_404
import requests
from json import loads

# Create your views here.
def words_list(request):
    MAX_OBJECTS = 20
    words = Card.objects.all()[:MAX_OBJECTS]
    data = {
        "words": list(words.values("word"))}
    return JsonResponse(data)


def translate_list(request, pk):
    card = get_object_or_404(Card, pk=pk)
    data = {
        "word": card.word,
        "translate": card.translate_set
    }
    return JsonResponse(data)

def get_api(request):
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7&lang=en-ru&text=time"
        response = requests.get(url)
        return JsonResponse(loads(response.text), safe=False, )

class CardsViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7"
    data = None

    def create(self, request):
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang=en-ru&text={1}".format(self.key,
                                                                                                               request.data[
                                                                                                                   "word"])
        response = requests.get(url)
        self.data = response.json()
        card = Card.objects.create(word=self.data['def'][0]['text'])
        Translate.objects.create(card=card, translate=self.data['def'][0]['tr'][0]['text'])
        #translates = list()
        #translates.append(self.data['def'][0]['tr'][0]['text'])
        # for i in len(self.data['def'][0]['tr'][0]['syn'])-1:
        #   translates.append(self.data['def'][0]['tr'][0]['syn'][i])
        #data = {'word': self.data['def'][0]['text'],
         #       'translates': {'card_id': self.kwargs["pk"], 'translate': self.data['def'][0]['tr'][0]['text']}}
        # return Response(request.data, status=status.HTTP_201_CREATED)
        serializer_class = CardSerializer(Card.objects.all(),many=True)
        #if serializer_class.is_valid():
        #card_serializer = serializer_class.save()
        return Response(serializer_class.data, status=status.HTTP_201_CREATED)

        #else:
         #   return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)