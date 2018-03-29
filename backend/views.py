from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import requires_csrf_token
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth import logout
from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response

from backend.models import DataSet, AgendaItem
from backend.serializers import AgendaItemSerializer, DataSetSerializer, DSetSerializer, PieChartSerializer, TrendviewSerializer

#####################################################################
# Views voor de "normale" url's

# Startview voor analyse.html
@method_decorator(login_required, name='dispatch')
class AnalyseView(generic.base.TemplateView):
    
    template_name = 'templates/analyse/analyse.html'

    def get_context_data(self, **kwargs):
        context = super(AnalyseView, self).get_context_data(**kwargs)
        dataset = DataSet.objects.latest('inleesdatum')
        datasets = DataSet.objects.order_by('-inleesdatum')
        agendaitems = AgendaItem.objects.filter(dataset = dataset)
        context['dataset_naam'] = dataset.naam
        context['agendaitems'] = agendaitems
        context['datasets'] = datasets
        return context    

class TrendView(generic.base.TemplateView):

    template_name = 'templates/trend/trend.html'

    def get_context_data(self, **kwargs):
        context = super(TrendView, self).get_context_data(**kwargs)
        dataset = DataSet.objects.latest('inleesdatum')
        context['dataset_naam'] = dataset.naam
        return context  

######################################################################
# Views voor de "Rest Framework" url's
# PieChart viewset tbv DRF API
# Retourneer queryset { categorie: string, percentage: number }
class PieChartViewset(viewsets.ViewSet):
    def list(self, request):
        dataset = DataSet.objects.latest('inleesdatum')
        queryset_1 = AgendaItem.objects.filter(dataset = dataset).aggregate(sum_tijdsduur = models.Sum('tijdsduur'))
        totale_tijdsduur = queryset_1['sum_tijdsduur']
        queryset = AgendaItem.objects.filter(dataset = dataset).values('categorie').annotate(sum_categorie = models.Sum('tijdsduur'))
        for item in queryset:
            item['percentage'] = item['sum_categorie'] / totale_tijdsduur

        serializer = PieChartSerializer(queryset, many=True)
        return Response(serializer.data)

# Trendview viewset
class TrendviewViewset(viewsets.ViewSet):
    def list(self, request):
        queryset = AgendaItem.objects.all().values('categorie', 'dataset__naam', 'dataset__inleesdatum').annotate(sum_categorie = models.Sum('tijdsduur'))

        serializer = TrendviewSerializer(queryset, many=True)
        return Response(serializer.data)
    
# AgendaItems tabel viewset tbv DRF API
# Retourneer queryset { categorie: string, onderwerp: string, begintijd: string , eindtijd: string, tijdsduur: number }
class AgendaItemViewset(viewsets.ViewSet):
    def list(self, request):
        dataset = DataSet.objects.latest('inleesdatum')
        queryset = AgendaItem.objects.filter(dataset = dataset)

        serializer = AgendaItemSerializer(queryset, many=True)
        return Response(serializer.data)

class DataSetViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = DataSet.objects.all()

        serializer = DataSetSerializer(queryset, many=True)
        return Response(serializer.data)

class DSetViewSet(viewsets.ModelViewSet):
    queryset = DataSet.objects.all()
    serializer_class = DSetSerializer
    

class ChartView(generic.base.TemplateView):
    template_name = 'templates/analyse/chart.html'

class BeheerView(generic.base.TemplateView):
    # print("In Beheer View")
    template_name = 'beheer.html'

class LoginView(generic.base.View):
    def get(self, request):
        return render(request, 'templates/login.html')
        
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        print(user)

        if user is not None:
            if user.is_active:
                print("Active User")
                login(request, user)
                return render(request, 'templates/analyse/analyse.html')
            else:
                return HttpResponse("Inactive user.")
        else:
            return render(request, 'templates/login.html')

        return render(request, "templates/analyse/analyse.html")        

class RegisterView(generic.base.View):
    def post(self, request):
        print("In registerview")
        print(request.POST['username'])
        print(request.POST['password'])
        return render(request, 'templates/login.html')        


