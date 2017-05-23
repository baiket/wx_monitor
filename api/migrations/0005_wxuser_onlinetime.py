# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20170522_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='wxuser',
            name='onlineTime',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
