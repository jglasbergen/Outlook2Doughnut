from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class DataSet(models.Model):
    inleesdatum = models.DateTimeField(default=timezone.now)
    naam = models.CharField(max_length=128)
    user = models.ForeignKey(User, blank=True, null=True)

    def publish(self):
        self.inleesdatum = timezone.now()
        self.save()

    def __str__(self):
        return self.naam

class AgendaItem(models.Model):
    dataset = models.ForeignKey(DataSet)
    categorie = models.CharField(max_length=128)
    onderwerp = models.CharField(max_length=256)
    begintijd = models.TimeField()
    eindtijd = models.TimeField()
    tijdsduur = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.dataset.naam + " - " + self.categorie + " - " + self.onderwerp
