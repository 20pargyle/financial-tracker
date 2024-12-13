from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('transactions/', view=views.transactions, name="transactions"),
    path('transactions/<int:id>', view=views.singleTransaction, name="singleTransaction"),
    path('transactions/<int:id>/delete/', view=views.deleteTransaction, name="deleteTransaction"),
    path('month-data/', view=views.monthData, name="monthData")
]