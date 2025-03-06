from rest_framework import serializers
from django.contrib.auth.models import User
from App.models import * 



class InfoSerializer(serializers.ModelSerializer):


    class Meta:

        model = User_Profile

        fields = ['address', 'mobile', 'profile_image']  

class UserSerializers(serializers.ModelSerializer):

    info = InfoSerializer()  

    class Meta:
        model = User
        exclude = ['password']  



class ProductSerializers(serializers.ModelSerializer):


    class Meta :

        model = Products_Upload

        fields = '__all__'


class CartSerializers (serializers.ModelSerializer):

    product = ProductSerializers()

    class Meta :
        
        model = CartItems
    
        fields = '__all__'


class WishListSerializers(serializers.ModelSerializer):

    product = ProductSerializers()
    
    class Meta:

        model = WishList

        fields = '__all__'


class Offer_Deals_Serializer(serializers.ModelSerializer):

    class Meta : 
        
        model = Offers_Deals

        fields = '__all__'



class AuctionSerializer(serializers.ModelSerializer):

    class Meta :

        model = Auction

        fields = '__all__' 
