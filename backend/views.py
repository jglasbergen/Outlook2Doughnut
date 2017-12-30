from django.shortcuts import render
from django.views import generic


# Create your views here.
class IndexView(generic.base.TemplateView):
    
    # template_name = 'ui/index.html'
    template_name = 'index-source.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['csv_data'] = "CSV_Data"
        return context    