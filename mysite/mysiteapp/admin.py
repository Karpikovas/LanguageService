from django.contrib import admin
from .models import *

# Register your models here.
class TranslateInline(admin.StackedInline):
    model = Translate
    extra = 5


class CardAdmin(admin.ModelAdmin):
    model = CardWord
    extra = 5

class TranslateAdmin(admin.ModelAdmin):
    list_display = ['translate', 'card']


admin.site.register(CardWord, CardAdmin)
admin.site.register(Translate, TranslateAdmin)
