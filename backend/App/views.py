from django.shortcuts import redirect, render 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login 
import json 
from django.http import JsonResponse
from App.models import *
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login_user(request):

        data = json.loads(request.body)

        
        user = authenticate( username = data.get('email') , password = data.get('password') )

        if user is not None:

            login(request , user)

            return JsonResponse({ "message" : "User Succesfully Login" , "status" : 200})

        else : 

            return JsonResponse({ "message" : "Enter Valid Credentials " , "status" : "invalid" })
        
 
    
@csrf_exempt
def create_user(request):

    data = json.loads(request.body)


    username  = data.get('username')
    password  = data.get('password')
    email  = data.get('email')

    user = User.objects.create( username = username , email = email)
    user.set_password(password)
    user.save()

    

    return JsonResponse({"message" : "Account Created Succesfully"})
    



def show_categories(request):

    categories = Index_Products.objects.all()
    feature = Featured_Products.objects.all()

    categories_data = []
    featured_data = []

    for n in categories:

        categories_data.append({
            'category' : n.category ,
            'image' : n.image.url
        })

    for n in feature:

        featured_data.append({
            'category' : n.category,
            'image' : n.image.url , 
            'price' : n.price
        })


    return JsonResponse({"data" : categories_data , "feature" : featured_data} , safe=False)


