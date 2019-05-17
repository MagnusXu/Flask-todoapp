#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 03 10:42:57 2019
@author: lordxuzhiyu
all controllers for various collections of database
"""

import os
import glob
__all__ = [os.path.basename(f)[:-3]
           for f in glob.glob(os.path.dirname(__file__) + "/*.py")]
