from django.db import models
from django.contrib.auth.models import User


class Card(models.Model):
    word = models.CharField(max_length=200)

    def __str__(self):
        return self.word

class Translate(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='translates')
    translate = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.translate

class ChooseTranslate(models.Model):
    translate = models.ForeignKey(Translate, on_delete=models.CASCADE, related_name='choices')
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("card", "user")