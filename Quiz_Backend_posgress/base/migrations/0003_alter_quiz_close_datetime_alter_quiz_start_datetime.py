# Generated by Django 5.0.1 on 2024-03-05 21:08

import datetime
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0002_alter_group_admin_alter_group_members"),
    ]

    operations = [
        migrations.AlterField(
            model_name="quiz",
            name="close_datetime",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 5, 23, 8, 26, 828791, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="quiz",
            name="start_datetime",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]