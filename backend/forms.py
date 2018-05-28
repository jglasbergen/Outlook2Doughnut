from django.db import models
from django import forms
from django.forms import ModelForm
from backend.models import DataSet

class DatasetForm(ModelForm):
     class Meta:
        model = DataSet
        fields = ['datum', 'naam', 'outlook', 'google', 'importfile']
        layout = [
            ("Text", "<h4 class=\"ui dividing header\"></h4>"),
            ("Two Fields", 
                ("Field", "naam"),
                ("Field", "datum"),
            ),
            ("Text", "<h4 class=\"ui dividing header\"></h4>"),
            ("Inline Fields", 
                ("Field", "outlook"),
                ("Field", "google"),
            ),
            ("Field", "importfile"),
            ("Text", "<h4 class=\"ui dividing header\"></h4>"),
        ]
    
