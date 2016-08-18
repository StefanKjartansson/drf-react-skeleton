from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework_jwt import views as jwt_views

router = DefaultRouter()


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api-token-auth/', jwt_views.obtain_jwt_token),
    url(r'^api-token-refresh/', jwt_views.refresh_jwt_token),
    url(r'^api-token-verify/', jwt_views.verify_jwt_token),
    url(r'^$', TemplateView.as_view(template_name='index.html'))
]
