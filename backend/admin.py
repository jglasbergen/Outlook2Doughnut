from django.contrib import admin

# Register your models here.
from .models import AgendaItem, DataSet

class AgendaItemListAdmin(admin.TabularInline):
    model = AgendaItem
    extra = 0
    # fields = ('categorie', 'onderwerp', 'begintijd', 'eindtijd')
    readonly_fields = ('categorie', 'onderwerp', 'begintijd', 'eindtijd')
    search_fields = ('categorie', 'onderwerp')
    list_filter = ('categorie', 'onderwerp')
    
class DataSetAdmin(admin.ModelAdmin):
    inlines = [AgendaItemListAdmin]

admin.site.register(AgendaItem)
admin.site.register(DataSet, DataSetAdmin)