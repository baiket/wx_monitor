# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_wxuser_onlinetime'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginRecord',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=32, verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('recordTime', models.DateTimeField(auto_now=True, verbose_name=b'\xe7\x99\xbb\xe5\xbd\x95\xe6\x97\xb6\xe9\x97\xb4')),
            ],
            options={
                'verbose_name': '\u767b\u5f55\u8bb0\u5f55',
                'verbose_name_plural': '\u767b\u5f55\u8bb0\u5f55',
            },
        ),
    ]
