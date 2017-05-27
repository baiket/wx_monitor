# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20170523_1655'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=32, verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('lastTime', models.DateTimeField(auto_now=True, null=True)),
                ('isonline', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': '\u767b\u5f55\u4fe1\u606f',
                'verbose_name_plural': '\u767b\u5f55\u4fe1\u606f',
            },
        ),
        migrations.AlterModelOptions(
            name='loginrecord',
            options={'verbose_name': '\u767b\u5f55\u5386\u53f2', 'verbose_name_plural': '\u767b\u5f55\u5386\u53f2'},
        ),
        migrations.RenameField(
            model_name='loginrecord',
            old_name='recordTime',
            new_name='loginTime',
        ),
        migrations.RemoveField(
            model_name='wxuser',
            name='isonline',
        ),
        migrations.RemoveField(
            model_name='wxuser',
            name='onlineTime',
        ),
        migrations.AddField(
            model_name='wxuser',
            name='deadline',
            field=models.IntegerField(default=1, verbose_name=b'\xe4\xbd\xbf\xe7\x94\xa8\xe5\xb9\xb4\xe9\x99\x90'),
        ),
    ]
