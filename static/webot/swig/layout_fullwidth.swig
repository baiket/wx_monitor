{% set html_class = '' %}
{% set app_class = 'app-aside-fixed app-aside-folded' %}
{% set content_class = 'app-content-full' %}

{% extends "blocks/layout.html" %}

{% block page_content %}

{% include '../src/tpl/layout_fullwidth.html' %}

{% endblock %}
