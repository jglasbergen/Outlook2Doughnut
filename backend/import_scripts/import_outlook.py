"""
Importeer Outlook CSV bestand
"""

__author__ = 'Jaap Glasbergen'

def import_csv():

    """ 
    Verzamel de naam van de wedstrijd, het wedstrijddeel en de csv file
    """
  
    csv_filename = "outlook_export.csv"
    """
    Categorie�n,Onderwerp,Begintijd,Eindtijd
    """
# Read file    
    print("Opening file: " + csv_filename)
    dataReader = csv.reader(open(csv_filename, encoding='utf-8-sig'), delimiter=',', quotechar='"')

    # Haal de huidige gebruiker op    
    current_user = User.objects.get(username='jaap')
    # Maak het dataset record aan met de 
    dataset = DataSet()
    dataset.naam = "februari-2018"
    dataset.user = current_user
    dataset.save()

    first_line = True
    for row in dataReader:
        # Skip de eerste regel
        if first_line:
            first_line = False
            continue
        # Vul de waarden in de kolommen
        agendaitem = AgendaItem()
        agendaitem.dataset   = dataset
        agendaitem.categorie = row[0]
        agendaitem.onderwerp = row[1]
        agendaitem.begintijd = row[2]
        agendaitem.eindtijd  = row[3]
        # Bereken de tijdsduur
        eindtijd = datetime.strptime(row[3], '%H:%M:%S')
        begintijd = datetime.strptime(row[2], '%H:%M:%S')
        tijdsduur = ( (eindtijd - begintijd) // timedelta(minutes=1) )
        agendaitem.tijdsduur = tijdsduur
        # Voer nu de regel op in de DB
        agendaitem.save()

 
# Start execution here!
if __name__ == '__main__':
    print("Starting Bedrijven population script...")

    import sys, os
    BASE_PATH=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    your_djangoproject_home=os.path.join(BASE_PATH, '..')
    print("your_djangoproject_home= " + your_djangoproject_home)
    sys.path.append(your_djangoproject_home)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

    
    import csv   
    import django
    from datetime import date, datetime, time, timedelta


    django.setup()
    from backend.models import AgendaItem, DataSet
    from django.contrib.auth.models import User

    import_csv()   
    
    