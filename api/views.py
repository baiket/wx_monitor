# -*- coding: utf-8 -*-
#解决中文乱码问题
import sys
reload(sys)
sys.setdefaultencoding( "utf-8")
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import traceback
from .models import *
import time, datetime
# Create your views here.

def register(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        realname = param['realname']
        alipay = param['alipay']
        if not username or not realname or not alipay:
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    if Wxuser.objects.filter(username=username).exists():
        return JsonResponse({"status": "error", "message": "username is exist"})
    Wxuser.objects.create(username=username, realname=realname,
                          alipay=alipay, recordTime=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})

def login(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        authword = param['authword']
        if not username or not authword:
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    if Wxuser.objects.filter(username=username).exists():
        user = Wxuser.objects.get(username=username)
        if user.authword != authword.strip():
            return JsonResponse({"status": "success", "data": {"validate": False, "username":username}})
        else:
            LoginRecord.objects.create(username=username)
            #添加记录时间
            user.isonline = True
            user.onlineTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            user.save()
            return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})
    return JsonResponse({"status": "error", "message": "user not exists"})

#每隔十分钟发送在线消息
def heartListen(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        if not username :
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    user = Wxuser.objects.get(username=username)
    user.onlineTime=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    user.save()
    return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})

def logout(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        if not username :
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    user = Wxuser.objects.get(username=username)
    user.isonline=False
    user.save()
    return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})