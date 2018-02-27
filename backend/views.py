from django.shortcuts import render
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import requires_csrf_token
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth import logout
from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response
# Import serializer --> moet nog gedefinieerd worden  in serializers.py
from backend.models import DataSet, AgendaItem
from backend.serializers import AgendaItemSerializer, PieChartSerializer

# Create your views here.
@method_decorator(login_required, name='dispatch')
class AnalyseView(generic.base.TemplateView):
    
    template_name = 'templates/analyse/analyse.html'

    def get_context_data(self, **kwargs):
        context = super(AnalyseView, self).get_context_data(**kwargs)
        dataset = DataSet.objects.latest('inleesdatum')
        agendaitems = AgendaItem.objects.filter(dataset = dataset)
        context['dataset_naam'] = dataset.naam
        context['agendaitems'] = agendaitems
        return context    

# PieChart viewset
# Retourneer dict { categorie: string, percentage: number }
class PieChartViewset(viewsets.ViewSet):

    def list(self, request):
        # queryset = AgendaItem.objects.all()
        queryset_1 = AgendaItem.objects.all().aggregate(sum_tijdsduur = models.Sum('tijdsduur'))
        totale_tijdsduur = queryset_1['sum_tijdsduur']
        queryset = AgendaItem.objects.all().values('categorie').annotate(sum_categorie = models.Sum('tijdsduur'))
        for item in queryset:
            item['percentage'] = item['sum_categorie'] / totale_tijdsduur

        serializer = PieChartSerializer(queryset, many=True)
        return Response(serializer.data)



# Categorie totalen tabel viewset

# AgendaItems tabel viewset
class AgendaItemViewset(viewsets.ModelViewSet):
    queryset = AgendaItem.objects.all()
    

class ChartView(generic.base.TemplateView):
    template_name = 'templates/analyse/chart.html'

class BeheerView(generic.base.TemplateView):
    # print("In Beheer View")
    template_name = 'beheer.html'

class LoginView(generic.base.TemplateView):
    # print("In LoginView")
    template_name = 'login.html'
#     success_url = reverse_lazy('analyse')


class TrendView(generic.base.TemplateView):
    
    template_name = 'trend.html'