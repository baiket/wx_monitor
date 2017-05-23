# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_wxuser_alipay'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wxuser',
            name='rcdword',
            field=models.CharField(default=b'', max_length=256, null=True, verbose_name=b'\xe6\x8e\xa8\xe8\x8d\x90\xe7\xa0\x81'),
        ),
    ]
