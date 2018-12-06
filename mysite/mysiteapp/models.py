from django.db import models
#from django.contrib.auth.models import User


class CardWord(models.Model):
    word = models.CharField(max_length=200)
    translate = models.CharField(max_length=200)
    rate = models.IntegerField(default=0)
    is_learned = models.BooleanField(default=False)
    pos = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.word



class Card(models.Model):
    word = models.CharField(max_length=200)

    def __str__(self):
        return self.word


class Translate(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='translates')
    translate = models.CharField(max_length=200)

    def __str__(self):
        return self.translate


class Answer(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer_text


class ChooseTranslate(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, default=False)


    #user = models.ForeignKey(User, on_delete=models.CASCADE)

    #class Meta:
        #unique_together = ("card", "user")