from django.http import JsonResponse, Http404
from rest_framework.response import Response
import requests
from django.shortcuts import get_object_or_404
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from .models import *
from .serializers import *

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
    renderer_classes = (TemplateHTMLRenderer,)
    template_name = 'exercises\enter_word.html'
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7"
    data = None



    def get(self, request):
        if request.accepted_renderer.format == 'html':
            data = {'Cards': self.queryset}
            return Response(data, template_name='exercises\enter_word')



    def create(self, request):
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang=en-ru&text={1}".format(self.key,
                                                                                                               request.data[
                                                                                                                   "word"])
        response = requests.get(url)
        self.data = response.json()
        card = Card.objects.create(word=self.data['def'][0]['text'])
        Translate.objects.create(card=card, translate=self.data['def'][0]['tr'][0]['text'])
        serializer_class = CardSerializer(Card.objects.all(),many=True)
        #return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response({'Cards': self.queryset})

class Cards(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'exercises\enter_word.html'
    key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7"

    def get(self, request):
        queryset = Card.objects.all()
        #serializer = CardSerializer(Card.objects.all(), many=True)
        return Response({'Cards': queryset})

    def post(self, request):
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang=en-ru&text={1}".format(self.key,
                                                                                                               request.POST.get('word'))
        response = requests.get(url)
        data = response.json()
        card = Card.objects.create(word=data['def'][0]['text'])
        Translate.objects.create(card=card, translate=data['def'][0]['tr'][0]['text'])
        serializer = CardSerializer(Card.objects.all(), many=True)
        serializer.save()
        queryset = Card.objects.all()
        return Response({'Cards': queryset})


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')