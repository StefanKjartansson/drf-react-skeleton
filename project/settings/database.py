#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
"""
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(),
}
