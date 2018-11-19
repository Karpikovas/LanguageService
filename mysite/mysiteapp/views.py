from django.http import JsonResponse
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