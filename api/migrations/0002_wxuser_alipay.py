# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wxuser',
            name='alipay',
            field=models.CharField(max_length=256, null=True, verbose_name=b'\xe6\x94\xaf\xe4\xbb\x98\xe5\xae\x9d\xe8\xb4\xa6\xe5\x8f\xb7'),
        ),
    ]
