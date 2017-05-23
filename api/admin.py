from django.contrib import admin
from .models import *
# Register your models here.
# Register your models here.
class WxuserAdmin(admin.ModelAdmin):
    list_display = ['username', 'realname', 'authword', 'alipay']
    list_filter = ['username', 'realname', 'authword', 'alipay']
    search_fields = ['username', 'realname', 'alipay']

admin.site.register(Wxuser,  WxuserAdmin)