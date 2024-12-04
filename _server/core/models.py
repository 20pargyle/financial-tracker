from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Transaction(models.Model):
    id = models.BigAutoField(primary_key=True)
    amount = models.FloatField()
    place = models.TextField()
    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.BooleanField(default=True)
