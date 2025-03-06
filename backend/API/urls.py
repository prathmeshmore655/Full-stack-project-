from django.contrib import admin
from django.urls import path , include
from API.views import *


urlpatterns = [
    
   path('get_user' , UserViewsAPI.as_view() , name = 'user-details'),
   path('update_user', UserViewsAPI.as_view() , name = 'update-user-details'),
   path('get_products' , ProductAPI.as_view() , name = 'get-products' ),
   path('add_to_cart' , ProductAPI.as_view() , name = 'add-to-cart' ),
   path('cart-details' , CartAPI.as_view() , name = 'cart-details'),
   path('add-to-wishlist' , WishListAPI.as_view() , name = 'add-to-wishlist'),
   path('remove-from-wishlist/<int:productId>' , WishListAPI.as_view() , name = 'remove-from-wishlist'),
   path('wishlist-items' , WishListAPI.as_view() , name = 'wishlist-items'),
   path('remove-from-cart/<int:productId>' , CartAPI.as_view() , name = 'remove-from-cart'),
   path('contact' , ContactAPI.as_view() , name = 'contact'),
   path('offers-deals' , Offers_Deals_API.as_view() , name = 'offers-deals'),
   path('auction-items' , AuctionAPI.as_view() , name = 'auction-items')
]
