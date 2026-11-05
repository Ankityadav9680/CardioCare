from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('Heart/', views.Heart, name='Heart'),
    path('ECG/', views.ECG, name='ECG'),
]