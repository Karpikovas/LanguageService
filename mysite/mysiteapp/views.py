from django.http import JsonResponse
from .models import Card, Translate

from django.shortcuts import get_object_or_404


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
        "translate": card.translate_set.first()
    }
    return JsonResponse(data)
