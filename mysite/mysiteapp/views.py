from django.http import JsonResponse, Http404
from rest_framework.response import Response
from rest_framework.parsers import FormParser
from django.http import HttpResponse
from rest_framework import status
from rest_framework import generics
from .permissions import IsOwner
from rest_framework import permissions, authentication
from rest_framework.decorators import api_view
from django.utils.six import text_type
from django.utils.translation import ugettext_lazy as _

from rest_framework import HTTP_HEADER_ENCODING, exceptions

from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import *

from django.shortcuts import get_object_or_404
import requests
from json import loads

# Create your views here.

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
        serializer_class = CardSerializer(Card.objects.all(),many=True)
        if serializer_class.is_valid():
            serializer_class.save()
        return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        #return Response({'Cards': self.queryset})


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


class Users(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CardsView(viewsets.ModelViewSet):
    queryset = CardWord.objects.all()
    serializer_class = CardWordSerializer
    #permission_classes = [IsOwner]
    authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication,)

    def get(self, request, format=None):
        queryset = CardWord.objects.filter(owner=request.user)
        serializer = CardWordSerializer(queryset, many=True)

        return Response(serializer.data)

    #def perform_create(self, serializer):
     #   serializer.save(owner=self.request.auth)
def get_authorization_header(request):
    """
    Return request's 'Authorization:' header, as a bytestring.

    Hide some test client ickyness where the header can be unicode.
    """
    auth = request.META.get('HTTP_AUTHORIZATION', b'')
    if isinstance(auth, text_type):
        # Work around django test client oddness
        auth = auth.encode(HTTP_HEADER_ENCODING)
    return auth


def get_model(self):
    from rest_framework.authtoken.models import Token
    return Token

class CardsWordView(APIView):
    authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication,)
    #permission_classes = (permissions.IsAdminUser,)
    key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7"

    def get(self, request, format=None):
        queryset = CardWord.objects.filter(owner=request.user)
        serializer = CardWordSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request):
        url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={0}&lang=en-ru&text={1}".format(self.key,
                                                                                                               request.data["word"])
        response = requests.get(url)
        data = response.json()
        card = CardWord.objects.create(
            owner=request.user,
            word=data['def'][0]['text'],
            translate=data['def'][0]['tr'][0]['text'],
            pos=data['def'][0]['pos']
        )
        serializer = CardWordSerializer(CardWord.objects.all(), many=True)
        if serializer.is_valid():
            serializer.save()
            queryset = CardWord.objects.all()
            return Response({'Cards': queryset})
        return Response(serializer.errors)
"""
class WordDetail(generics.RetrieveDestroyAPIView):
    queryset = CardWord.objects.all()
    authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication,)
    serializer_class = CardWordSerializer
"""


class WordDetail(viewsets.ModelViewSet):
    authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication,)
    queryset = CardWord.objects.all()
    serializer_class = CardWordSerializer
    """def put(self, request, pk, format=None):
        card = CardWord.objects.filter(id=request.data["id"])
        data = request.data
        serializer = CardWordSerializer(card, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
"""
    def update(self, request, pk):
        card = CardWord.objects.filter(id=request.data["id"])
        data = request.data
        serializer = CardWordSerializer(card, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
'''
    def delete(self, request, pk, format=None):
        card = self.get_object(pk)
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''