# Generated by Django 5.0.1 on 2024-03-07 15:14

import base.models
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="quiz",
            name="close_datetime",
            field=models.DateTimeField(default=base.models.default_close_datetime),
        ),
        migrations.AlterField(
            model_name="quiz",
            name="start_datetime",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
