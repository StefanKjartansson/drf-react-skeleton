#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
"""
from __future__ import absolute_import, print_function, unicode_literals

import os
import dj_database_url

try:
    DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': 'postgres',                      
           'USER': 'postgres',
           'PASSWORD': os.environ['DB_ENV_POSTGRES_PASSWORD'],
           'HOST': 'db',                      
        }
    }
except:
    DATABASES = {'default': dj_database_url.config()}

