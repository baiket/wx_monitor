# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_loginrecord'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wxuser',
            name='recordTime',
            field=models.DateTimeField(),
        ),
    ]
