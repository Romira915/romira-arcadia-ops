#!/bin/bash

{% for account in script.mydns %}
# {{ account.domain }}
wget -O - 'https://{{ account.user }}:{{ account.pass }}@ipv4.mydns.jp/login.html'
{% endfor %}
