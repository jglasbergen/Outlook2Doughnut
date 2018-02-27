# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from backend.models import AgendaItem

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('url', 'username', 'email', 'groups')


# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ('url', 'name')


class AgendaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendaItem
        # fields = ('categorie', 'onderwerp', 'begintijd', 'eindtijd', 'tijdsduur')
        fields = ('categorie', 'sum_categorie', 'percentage')

class PieChartSerializer(serializers.Serializer):
    categorie = serializers.CharField(max_length=128)
    percentage = serializers.DecimalField(max_digits=5, decimal_places=2)
    # sum_categorie = serializers.CharField()

