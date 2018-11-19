from .models import Card, Translate
from django.http import JsonResponse
from .serializers import CardSerializer, TranslateSerializer, ChooseTranslateSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import requests


class WordsList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class WordDetail(generics.RetrieveDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class TranslateList(generics.ListCreateAPIView):
    def get_queryset(self):
        queryset = Translate.objects.filter(card_id=self.kwargs["pk"])
        return queryset
    serializer_class = TranslateSerializer


class ChooseTranslateView(generics.ListCreateAPIView):

    def post(self, request, pk, translate_pk):
        data = {'card': pk, 'translate': translate_pk}
        #        data = {'card': pk, 'translate': translate_pk, 'user': user}
        serializer = ChooseTranslateSerializer(data=data)
        if serializer.is_valid():
            chooseTranslate = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetWords(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def __init__(self):
        self.word = None
        self.key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7"
        self.data = None


    def post(self, request):
        self.word = "time"
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang=en-ru&text={1}".format(self.key, request.data["word"])
        response = requests.get(url)
        self.data = response.json()
        translates = list()
        translates.append(self.data['def'][0]['tr'][0]['text'])
        #for i in len(self.data['def'][0]['tr'][0]['syn'])-1:
         #   translates.append(self.data['def'][0]['tr'][0]['syn'][i])
        data = {'word': self.data['def'][0]['text']}
        #return Response(request.data, status=status.HTTP_201_CREATED)
        serializer = CardSerializer(data=data)
        if serializer.is_valid():
            card_serializer = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    '''
    def get(self, request):
        basepath = os.path.abspath(".")
        json_data = open(basepath + "/static/dict.json", encoding='utf-8')
        data1 = json.load(json_data)
        #  data2 = json.dump(json_data, fp)
        Card.objects.create()
        json_data.close()
        return Response(data1)
    '''