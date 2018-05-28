from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

# Create your models here.

class DataSet(models.Model):
    inleesdatum = models.DateTimeField(default=timezone.now)
    datum = models.DateField(default=timezone.now, null=True)
    naam = models.CharField(max_length=128, verbose_name="Naam dataset")
    user = models.ForeignKey(User ,blank=True, null=True)
    outlook = models.BooleanField(default=False)
    google = models.BooleanField(default=False)
    importfile = models.FileField(upload_to=user_directory_path, null=True)

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
