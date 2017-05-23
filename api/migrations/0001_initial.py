# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Wxuser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=32, verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('realname', models.CharField(max_length=64, null=True, verbose_name=b'\xe5\xa7\x93\xe5\x90\x8d')),
                ('authword', models.CharField(max_length=256, verbose_name=b'\xe6\x8e\x88\xe6\x9d\x83\xe7\xa0\x81')),
                ('rcdword', models.CharField(max_length=256, null=True, verbose_name=b'\xe6\x8e\xa8\xe8\x8d\x90\xe7\xa0\x81')),
                ('isonline', models.BooleanField(default=False)),
                ('recordTime', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': '\u7528\u6237',
                'verbose_name_plural': '\u7528\u6237',
            },
        ),
    ]
