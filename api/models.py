# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class Wxuser(models.Model):
    username = models.CharField('用户名',max_length=32)
    realname =models.CharField('姓名',max_length=64, null=True)
    authword = models.CharField('授权码',max_length=256)
    deadline = models.IntegerField('使用年限', default=1)
    alipay = models.CharField('支付宝账号',max_length=256,null=True)
    rcdword = models.CharField('推荐码',max_length=256, null=True, default=" ")
    recordTime = models.DateTimeField()

    def __unicode__(self):
        return self.username
    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'

class LoginInfo(models.Model):
    username = models.CharField('用户名',max_length=32)
    lastTime = models.DateTimeField(auto_now=True, null=True)
    isonline = models.BooleanField(default=False)
    def __unicode__(self):
        return self.username
    class Meta:
        verbose_name = '登录信息'
        verbose_name_plural = '登录信息'

class LoginRecord(models.Model):
    username = models.CharField('用户名',max_length=32)
    loginTime = models.DateTimeField('登录时间', auto_now=True)

    def __unicode__(self):
        return self.username
    class Meta:
        verbose_name = '登录历史'
        verbose_name_plural = '登录历史'