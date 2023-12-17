from django.shortcuts import HttpResponse
import json
from django.db import models, connections
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.http import JsonResponse
from ecom_api.models import Order

# Create your views here.

# Returns products data as JSON.
def loadJsonData():
    data = open('ecom_api/products.json').read()

    jsonData = json.loads(data)
    dumpedJsonData = json.dumps(jsonData)

    return dumpedJsonData

# Returns products as JSON.
def getProducts(request):
    return HttpResponse(loadJsonData())

# Update stocks
def updateStocks(request):
    return HttpResponse(200)

# Returns CSRF Token.
def getCsrfToken(request):
    csrfToken = get_token(request)
    return JsonResponse({'csrfToken': csrfToken})

# csrf_exempt not recommended.
@csrf_exempt
def addOrder(request):
    order = json.loads(request.body)
    
    Order.objects.create(
        orderId = order['orderId'],
        totalPrice = order['totalPrice'],
        items = order['items'],
        date = order['date'],
        confirmed = order['confirmed'],
        email = order['email']
    ).save()

    return HttpResponse(json.dumps(order))


# csrf_exempt not recommended.
@csrf_exempt
# Fetches past orders.
def fetchOrders(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body.get('email', '')

    # Check if the email is not empty before querying the database
    if email:
        # Filter orders based on the provided email
        orders = Order.objects.filter(email=email)
        
        # Create a response with the list of orders
        response_data = {
            'orders': [
                {
                    'orderId': order.orderId,
                    'items': order.items,
                    'date': order.date,
                    'totalPrice': order.totalPrice
                }
            for order in orders]
        }
        
        return JsonResponse(response_data)
    else:
        # Return a response indicating that the email is required
        return HttpResponse('Email is required for fetching orders.', status=400)
    