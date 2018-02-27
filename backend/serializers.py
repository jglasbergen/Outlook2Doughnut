from rest_framework import serializers
from backend.models import AgendaItem

class AgendaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendaItem
        # fields = ('categorie', 'onderwerp', 'begintijd', 'eindtijd', 'tijdsduur')
        fields = ('categorie', 'sum_categorie', 'percentage')

class PieChartSerializer(serializers.Serializer):
    categorie     = serializers.CharField(max_length=128)
    percentage    = serializers.DecimalField(max_digits=5, decimal_places=2)
    sum_categorie = serializers.CharField()


class AgendaItemSerializer(serializers.Serializer):
    categorie = serializers.CharField(max_length=128)
    onderwerp = serializers.CharField(max_length=256)
    begintijd = serializers.TimeField()
    eindtijd  = serializers.TimeField()
    tijdsduur = serializers.IntegerField()
