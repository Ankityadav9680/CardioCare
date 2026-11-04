
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')
def Heart(request):
    return render(request, 'Heart.html')
def services(request):
    return render(request, 'services.html')
def ECG(request):
    return render(request, 'ECG.html')