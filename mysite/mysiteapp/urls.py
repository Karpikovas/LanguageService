"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import words_list, translate_list
from rest_framework import routers

from .apiviews import WordsList, WordDetail, ChooseTranslateView, TranslateList, GetWords
from .views import CardsViewSet
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('words/', WordsList.as_view(), name="words_list"),

    path('test/<int:pk>', GetWords.as_view(), name="get_words"),

    path("words/<int:pk>/translates/", TranslateList.as_view(), name="translate_list"),
    path("words/<int:pk>/translates/<int:translate_pk>/vote/", ChooseTranslateView.as_view(), name="choose_translate")
]
"""
urlpatterns = [
    path('admin/', admin.site.urls)
]
router = routers.DefaultRouter()


router.register(r'cards', CardsViewSet)

urlpatterns += router.urls