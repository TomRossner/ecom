from django.db import models

# Create your models here.

# Order model
class Order(models.Model):
    orderId = models.CharField(primary_key = True)
    totalPrice = models.IntegerField()
    items = models.JSONField()
    date = models.DateTimeField()
    confirmed = models.BooleanField()
    email = models.CharField(max_length=100)