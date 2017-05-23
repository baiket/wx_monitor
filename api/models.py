# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class Wxuser(models.Model):
    username = models.CharField('用户名',max_length=32)
    realname =models.CharField('姓名',max_length=64, null=True)
    authword = models.CharField('授权码',max_length=256)
    alipay = models.CharField('支付宝账号',max_length=256,null=True)
    rcdword = models.CharField('推荐码',max_length=256, null=True, default=" ")
    onlineTime = models.DateTimeField(auto_now=True, null=True)
    isonline = models.BooleanField(default=False)
    recordTime = models.DateTimeField()

    def __unicode__(self):
        return self.username
    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'

class LoginRecord(models.Model):
    username = models.CharField('用户名',max_length=32)
    recordTime = models.DateTimeField('登录时间', auto_now=True)

    def __unicode__(self):
        return self.username
    class Meta:
        verbose_name = '登录记录'
        verbose_name_plural = '登录记录'