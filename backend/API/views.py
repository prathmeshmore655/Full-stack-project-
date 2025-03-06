from django.contrib.auth.models import User
from django.http import JsonResponse
from API.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from App.models import *

class UserViewsAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            user = request.user  

            serialized_data = UserSerializers(user).data  
            
            return Response(data=serialized_data, status=status.HTTP_200_OK)
        
        except Exception as e:
        
        
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


    def post(self, request):

        try:
        
            data = request.data  

            user = request.user  
            info = User_Profile.objects.get(user_id = user.id)


            if 'first_name' in data:

                user.first_name = data['first_name']
            

            if 'last_name' in data:

                user.last_name = data['last_name']


            if 'email' in data:

                user.email = data['email']




            info.mobile = data['mobile']
            info.address = data['address']


            
            if 'profile_image' in request.FILES:

                info.profile_image = request.FILES['profile_image']
             

            

            user.save()
            info.save()



            return Response({"message": "Profile updated successfully!"},status=status.HTTP_200_OK)

        except Exception as e:
            
            print("Error:", e)
            return Response({"error": "An error occurred while updating the user."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        





class ProductAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self ,request):

        user = request.user

        all_products = Products_Upload.objects.all()

        serialized_data = ProductSerializers(all_products , many = True).data

        count = CartItems.objects.filter(user = user).count()



        return Response({"data" : serialized_data  , "count" : count }, status = status.HTTP_200_OK)
    

    def post(self ,request):

        
        data = request.data

        user = request.user

        product_id = data['product']
        address = data['address']
        quantity = data['quantity']
        product = Products_Upload.objects.get(pk = product_id)
        count = 0


        if CartItems.objects.filter(user = user , product = product ).exists():

            return Response({"message" : "Item already added in cart"} , status = status.HTTP_200_OK)
        
        try :

            cart = CartItems.objects.create( user = user , product = product , address = address , quantity = quantity )
            cart.save()

            count = CartItems.objects.filter(user = user).count()

        
            return Response({"message" : "Item added in cart succesfully" , "count" : count} , status = status.HTTP_200_OK)
        
        except :

            return Response({"message" : "Bad Request" , "count" : count} , status=status.HTTP_400_BAD_REQUEST)



class CartAPI(APIView):


    def get(self , request):

        user = request.user

        cart = CartItems.objects.filter(user = user)

        cart_data = CartSerializers(cart , many = True).data

        return Response(data = cart_data , status = status.HTTP_200_OK)
    

    def delete(self , request , productId):

        try:


            cart = CartItems.objects.get(id = productId)
            cart.delete()

            return Response({"message" : "Item removed from cart successfully"} , status = status.HTTP_200_OK)

        except:

            return Response({"message" : "Bad Request"} , status = status.HTTP_400_BAD_REQUEST)
    



        


class WishListAPI(APIView):



    def get(self , request ):

        try:

            user = request.user

            if  WishList.objects.filter().exists():

                wishlist = WishList.objects.filter(user = user)
                
                w_data = WishListSerializers(wishlist , many = True).data

                return Response(data = w_data , status = status.HTTP_200_OK )
            
            return Response({"message": "YOur Wishlist is Empty"} , status = status.HTTP_404_NOT_FOUND)

        except :

            return Response({"message" : "Bad Request "},status = status.HTTP_400_BAD_REQUEST)
        





    def post(self , request):

        data = request.data

        user = request.user
        product_id = data['id']
        product = Products_Upload.objects.get(id = product_id)

        
        if WishList.objects.filter( user = user, product = product_id).exists():

            WishList.objects.get(user = user , product = product)
            
            return Response({"message" : "Already have added in wishlist"})
        
        try:

            wishlist = WishList.objects.create(user = user , product = product)
            wishlist.save()
            
            return Response({"message" : "Successfully added in wishlist"} , status = status.HTTP_201_CREATED)
        
        except : 
            return Response({"message" : "Bad Request"} , status = status.HTTP_400_BAD_REQUEST)
        


    def delete(self , request , productId):

        try:


            wish = WishList.objects.get(id = productId)
            wish.delete()

            return Response({"message" : "Item removed from wishlist successfully"} , status = status.HTTP_200_OK)

        except:

            return Response({"message" : "Bad Request"} , status = status.HTTP_400_BAD_REQUEST)

        

from django.conf import settings


class ContactAPI(APIView):

    def post (self , request):
        
        data = request.data

        name = data['name']
        email = data['email']
        message = data['message']
        subject = f'{name} , ({email}) trying to contact you'

        
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER , 
            [settings.EMAIL_HOST_USER],
            fail_silently = False            
        )

        return Response({"message" : "We will contact you later"} , status = status.HTTP_200_OK)


class Offers_Deals_API(APIView):

    def get(self, request):


        data = Offers_Deals.objects.all()

        print("Dtata : " , data)

        s_data = Offer_Deals_Serializer(data, many=True).data

    
        return Response(data=s_data, status=status.HTTP_200_OK)
    


class AuctionAPI(APIView):

    def get(self , request):

        data = Auction.objects.get(is_active = True)

        s_data = AuctionSerializer([data] , many = True).data

        return Response(data = s_data , status = status.HTTP_200_OK)