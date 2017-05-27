#coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from .models import *
import json
import requests
import time
from datetime import datetime
from celery import task, group, platforms

platforms.C_FORCE_ROOT = True

#每隔五分钟查询下用户的保活时间
@task
def offline_sync():
    users = LoginInfo.objects.all()
    for user in users:
        lastTime= time.mktime(user.lastTime.timetuple())
        now_time = time.time()
        if now_time - lastTime > 300.0 and user.isonline == 1:
            user.isonline = False
            user.save()