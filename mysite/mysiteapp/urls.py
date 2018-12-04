"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from .views import words_list, translate_list
from rest_framework import routers

from .apiviews import WordsList, WordDetail, ChooseTranslateView, TranslateList, GetWords
from .views import Cards, CardsViewSet
"""
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('words/', WordsList.as_view(), name="words_list"),

    path('test/<int:pk>', GetWords.as_view(), name="get_words"),

    path("words/<int:pk>/translates/", TranslateList.as_view(), name="translate_list"),
    path("words/<int:pk>/translates/<int:translate_pk>/vote/", ChooseTranslateView.as_view(), name="choose_translate")
]"""
"""
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cards/', Cards.as_view()),
    url(r'^docs', schema_view)
]
router = routers.DefaultRouter()

router.register(r'cards', CardsViewSet, basename='cards_list')
urlpatterns += router.urls

"""
from rest_framework import routers
from django.urls import path
from . import views
from .views import Cards, CardsViewSet
from .apiviews import WordsList


urlpatterns = [
    path('', views.index),
    path('cards/',WordsList.as_view())
]
