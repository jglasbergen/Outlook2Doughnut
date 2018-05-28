from rest_framework import serializers
from django.contrib.auth.models import User
from backend.models import AgendaItem, DataSet

class AgendaItemSerializer(serializers.Serializer):
    categorie = serializers.CharField(max_length=128)
    onderwerp = serializers.CharField(max_length=256)
    begintijd = serializers.TimeField()
    eindtijd  = serializers.TimeField()
    tijdsduur = serializers.IntegerField()

class DataSetSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    class Meta:
        model = DataSet
        fields = ('pk', 'id', 'inleesdatum', 'naam', 'user', 'outlook', 'google', 'importfile')

    def create(self, validated_data):
        return DataSet.objects.create(**validated_data)
        
class PieChartSerializer(serializers.Serializer):
    categorie     = serializers.CharField(max_length=128)
    percentage    = serializers.DecimalField(max_digits=5, decimal_places=2)
    sum_categorie = serializers.CharField()

class TrendviewSerializer(serializers.Serializer):
    categorie     = serializers.CharField(max_length=128)
    sum_categorie = serializers.CharField()
    dataset__naam = serializers.CharField()
    dataset__inleesdatum = serializers.CharField()
