# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-26 14:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20180221_1653'),
    ]

    operations = [
        migrations.AddField(
            model_name='agendaitem',
            name='tijdsduur',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
