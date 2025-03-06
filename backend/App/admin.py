from django.contrib import admin
from App.models import *

class IndexProductsAdmin(admin.ModelAdmin):
    list_display = ['category', 'image']
    search_fields = ['category']



class FeaturedProductsAdmin(admin.ModelAdmin):

    list_display = ['category' , 'image' , 'price']
    search_fields = ['category' , 'image' , 'price']

class InfoTable (admin.ModelAdmin):

    list_display = ['user' , 'address' , 'mobile' , 'profile_image']
    search_fields = ['user' , 'address' , 'mobile' , 'profile_image']


class Product_Table(admin.ModelAdmin):

    list_display = [    'product_name' ,
                        'category' ,
                        'description' ,
                        'price' ,
                        'product_image' ,
                        'stock_quantity' ,
                        'brand' ,
                        'rating' ,
                        'discount' ,
                        'DateTime'
                    ]
    


    search_fields = [    'product_name' ,
                        'category' ,
                        'description' ,
                        'price' ,
                        'product_image' ,
                        'stock_quantity' ,
                        'brand' ,
                        'rating' ,
                        'discount' ,
                        'DateTime'
                    ]
    



class AddCart(admin.ModelAdmin):

    list_display = [
            'user',
            'product',
            'address',
            'date_time',
            'quantity',
    ]
    

    search_fields = [
            'user',
            'product',
            'address',
            'date_time',
            'quantity',
    ]


class WishListTable(admin.ModelAdmin):

    list_display = [
                    'user' , 
                    'product' , 
                    'created_at' , 
                ]


    search_fields  = [
                    'user' , 
                    'product' , 
                    'created_at' , 
                ]


class OffersDealsTable(admin.ModelAdmin):

    list_display = [
        
        'title',
        'image',
        'description'

    ]

    search_fields = [

            'title',
            'image',
            'description'

    ]


class AuctionTable(admin.ModelAdmin):


    list_display = [

                'item_name' ,
                'description' ,
                'image' ,
                'base_price' ,
                'start_time' ,
                'end_time' ,
                'created_by' ,
                'is_active' ,

    ]



    search_fields = [
        
                'item_name' ,
                'description' ,
                'image' ,
                'base_price' ,
                'start_time' ,
                'end_time' ,
                'created_by' ,
                'is_active' ,

    ]



class Schedule_AuctionTable(admin.ModelAdmin):


    list_display = [

                'item_name' ,
                'description' ,
                'image' ,
                'base_price' ,
                'start_time' ,
                'end_time' ,
                'created_by' ,
                'is_active' ,

    ]



    search_fields = [
        
                'item_name' ,
                'description' ,
                'image' ,
                'base_price' ,
                'start_time' ,
                'end_time' ,
                'created_by' ,
                'is_active' ,

    ]





class BidTable (admin.ModelAdmin):

    list_display = [

            'auction' ,
            'user' ,
            'bid_amount' ,
            'bid_time' ,

        ]


    search_fields = [

            'auction' ,
            'user' ,
            'bid_amount' ,
            'bid_time' ,

        ]
    


class ChatsTable (admin.ModelAdmin):

    list_display = [
            'sender'  ,
            'message'  ,
            'DateTime'  ,
    ]

    search_fields = [
            'sender' , 
            'message' , 
            'DateTime' , 
    ]



admin.site.register(Auction_Scheduling , Schedule_AuctionTable)
admin.site.register(Auction_Chats ,ChatsTable)
admin.site.register(BidModel , BidTable)
admin.site.register(Auction , AuctionTable)
admin.site.register( Offers_Deals , OffersDealsTable)
admin.site.register(Products_Upload , Product_Table)
admin.site.register(Index_Products, IndexProductsAdmin)
admin.site.register( Featured_Products , FeaturedProductsAdmin)
admin.site.register(User_Profile , InfoTable)
admin.site.register(CartItems , AddCart)
admin.site.register(WishList , WishListTable)



