"""
Django settings for q project.

Generated by 'django-admin startproject' using Django 2.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import sys
import ldap
from django_auth_ldap.config import LDAPSearch, GroupOfUniqueNamesType
from django.conf.locale.ru import formats as ru_formats

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u2FoNZ#S6yVL5RkJu2FoNZ#S6yVL5RkJu2FoNZ#S6yVL5RkJu2FoNZ#S6yVL5RkJu2FoNZ#S6yVL5RkJu2FoNZ#S6yVL5RkJ'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
SITE_ID = 1
INSTALLED_APPS = [
    'im.apps.ImConfig',
    # 'bots.apps.BotsConfig',
    # 'q2.apps.q2Config',
    # 'wiki.apps.WikiConfig',
    # 'users.apps.UsersConfig',
    # 'reps.apps.RepsConfig',
    # 'tasks.apps.TasksConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

ROOT_URLCONF = 'main.urls'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIAFILES_DIRS = (
    os.path.join(BASE_DIR, 'media'),
)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

CKEDITOR_UPLOAD_PATH = 'ckeditor/'

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'q.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'OPTIONS': {    # https://stackoverflow.com/questions/1160598/how-to-use-schemas-in-django
        #     'options': '-c search_path=q2'
        # },
        # 'NAME': 'q',
        # 'USER': 'q',
        # 'PASSWORD': 'rB3683YW0VF',
        # 'HOST': '127.0.0.1',
        # 'PORT': 5432,
    },
}

if 'test' in sys.argv:
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # 'TEST_MIRROR': 'default',
        'SUPPORTS_TRANSACTIONS': 'False',
    }

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'django_auth_ldap.backend.LDAPBackend',
    # 'django.contrib.auth.backends.RemoteUserBackend',
)


AUTH_LDAP_SERVER_URI = "ldap://q.ru"
AUTH_LDAP_USER_SEARCH = LDAPSearch(
    "DC=q,DC=ru",
    # if 'test' in sys.argv else "OU=Employees,OU=IDM,DC=q,DC=ru",
    ldap.SCOPE_SUBTREE,
    "(sAMAccountName=%(user)s)"
)
AUTH_LDAP_CONNECTION_OPTIONS = {
    # ldap.OPT_DEBUG_LEVEL: 2,
    ldap.OPT_REFERRALS: 0,
}
AUTH_LDAP_BIND_AS_AUTHENTICATING_USER = True
# What to do once the user is authenticated
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail",
    "ldap_dn": "dn",
    # "description": "manager",
    "title": "title",
    "department": "department",
    "name": "description",     # FIO
    "phone_number": "mobile",  # mobile number, telephoneNumber - xer
    "tab_number": "employeeID",
}
AUTH_LDAP_USERNAME_FIELD = "sAMAccountName"
USERNAME_FIELD = "username"
# Cache settings
AUTH_LDAP_CACHE_GROUPS = True
AUTH_LDAP_CACHE_TIMEOUT = 3600

# AUTH_USER_MODEL = 'users.User'
ME_USER_ID = 5

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'verbose': {
            'format': '%(process)-5d %(thread)d %(name)-50s %(levelname)-8s %(message)s'
        },
        'simple': {
            'format': '[%(asctime)s] %(name)s %(levelname)s %(message)s',
            'datefmt': '%d/%b/%Y %H:%M:%S'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'syslog': {
            'level': 'DEBUG',
            'class': 'logging.handlers.SysLogHandler',
            'facility': 'local7',
            'address': '/dev/log',
            'formatter': 'verbose'
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        },
        # 'tamtam_logging': {
        #     'level': 'DEBUG',
        #     'class': 'bots.HLoggingHandler.HLoggingHandler',
        # },
    },
    'loggers': {
        '': {
            'handlers': ['console', ],  # 'syslog'
            'level': 'INFO',
            'disabled': False
        },
        # 'django.request': {
        #     'handlers': ['tamtam_logging', 'mail_admins'],
        #     'level': 'ERROR',
        #     'propagate': True,
        # },
        # 'django_auth_ldap': {
        #     'handlers': ['tamtam_logging', 'stream_to_console'],
        #     'level': 'DEBUG',
        #     'propagate': True,
        # },
        # 'django': {
        #     'handlers': ['tamtam_logging'],
        #     'level': 'DEBUG',
        #     'propagate': True,
        # },
        'bots': {
            'handlers': ['console', ],
            'level': 'DEBUG',
            'propagate': True,
        },
        'users': {
            'handlers': ['console', ],
            'level': 'INFO',
            'propagate': True,
        },
        'main': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'tasks': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#     {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
#     {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
#     {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
#     {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
# ]

MIDDLEWARE_CLASSES = (
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.auth.middleware.RemoteUserMiddleware',
)

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'
TIME_ZONE_BOTS = "Asia/Yekaterinburg"

USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/
STATIC_URL = '/static/'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': BASE_DIR+'/cache',
    }
}

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}

ru_formats.DATE_FORMAT = "d/m/y"
ru_formats.DATETIME_FORMAT = 'd/m/y H:i'

X_FRAME_OPTIONS = 'ALLOWALL'

XS_SHARING_ALLOWED_METHODS = ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE']
