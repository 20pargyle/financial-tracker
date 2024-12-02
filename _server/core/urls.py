from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('transaction/', view=views.transaction, name="transaction")
]