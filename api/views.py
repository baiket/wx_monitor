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
import time
from datetime import datetime
# Create your views here.

def buy(request):
    return render(request, 'buy.html')

def download(request):
    return render(request, 'download.html')

def pay(request):
    return render(request, 'paypage.html')

def home(request):
    return render(request, 'index.html')

def register(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        realname = param['realname']
        alipay = param['alipay']
        deadline = param['deadline']
        if not username or not realname or not alipay or not deadline:
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    if Wxuser.objects.filter(username=username).exists():
        return JsonResponse({"status": "error", "message": "username is exist"})
    Wxuser.objects.create(username=username, realname=realname,deadline=deadline,
                          alipay=alipay, recordTime=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})

def login(request):
    message = '参数格式错误'
    try:
        param = json.loads(request.body)
        username = param['username']
        authword = param['authword']
        if not username or not authword or username == "" or authword == "":
            message = "参数不能为空"
            raise 'param is none!'
    except:
        return JsonResponse({'status': 'error', 'message': message, 'traceback': traceback.format_exc()})
    if Wxuser.objects.filter(username=username).exists():
        user = Wxuser.objects.get(username=username)
        if user.authword != authword.strip():
            return JsonResponse({"status": "success", "data":
                                 {"validate": False, "msg": "授权码输入错误","username":username}})
        record_time= time.mktime(user.recordTime.timetuple())
        now_time = time.time()
        dead_line = user.deadline * 31622400.0
        if now_time - record_time > dead_line :
            return JsonResponse({"status": "success", "data":
                                 {"validate": False, "msg": "授权码已到期","username":username}})
        LoginRecord.objects.create(username=username)
        #添加记录时间
        if LoginInfo.objects.filter(username=username).exists():
            login_user = LoginInfo.objects.get(username=username)
            if login_user.isonline:
                return JsonResponse({"status": "success", "data":
                                     {"validate": False, "msg": "账号已在他处登录","username":username}})
            login_user.isonline = True
            login_user.lastTime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            login_user.save()
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
    user = LoginInfo.objects.get(username=username)
    user.onlineTime=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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
    user = LoginInfo.objects.get(username=username)
    user.isonline=False
    user.save()
    return JsonResponse({"status": "success", "data": {"validate": True, "username": username}})