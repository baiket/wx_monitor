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

#每隔十分钟查询下用户的保活时间
@task
def offline_sync():
    users = Wxuser.objects.all()
    for user in users:
        record_time= time.mktime(user.onlineTime.timetuple())
        now_time = time.time()
        if now_time - record_time > 600.0 and user.isonline == 1:
            user.isonline = False
            user.save()