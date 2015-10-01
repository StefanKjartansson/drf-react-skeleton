#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
"""
from __future__ import absolute_import, print_function, unicode_literals

import os

from django.core.exceptions import ImproperlyConfigured


def get_envvar_string(string):
    s = os.getenv(string)
    if s == None:
        raise ImproperlyConfigured('Missing ENVVAR %s' % string)
    return s
