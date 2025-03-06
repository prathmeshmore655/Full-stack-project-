from django.db import models
from django.contrib.auth.models import User


class Index_Products(models.Model):
    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Fashion', 'Fashion'),
        ('Home', 'Home & Kitchen'),
        ('Books', 'Books'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.FileField(upload_to='categories/')

    def __str__(self):
        return self.category




class Featured_Products(models.Model):
    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Fashion', 'Fashion'),
        ('Home', 'Home & Kitchen'),
        ('Books', 'Books'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.FileField(upload_to='featured/')
    price = models.IntegerField()

    def __str__(self):
        return self.category



class User_Profile(models.Model):


    user = models.OneToOneField(User, related_name='info', on_delete=models.CASCADE)
    address = models.TextField(max_length=100, null=True , blank=True)
    mobile = models.CharField(max_length=12, null=True , blank=True)
    profile_image = models.FileField(upload_to='profiles/' , null = True , blank = True)


def get_upload_to(instance , filename ):

    category = instance.category.lower().replace(" ","_")

    return f"products/{category}/{filename}"



class Products_Upload(models.Model):

    CATEGORY_CHOICES = [

        ('Electronics' ,'Electronics' ),
        ('Fashion' , 'Fashion'),
        ('Books' , 'Books'),
        ('Home' , 'Home & Kitchen')

    ]

    RATING_CHOICES = [

        ('1' , '1'),
        ('2' , '2'),
        ('3' , '3'),
        ('4' , '4'),
        ('5' , '5')

    ]


    product_name = models.CharField(max_length=100)
    category = models.CharField(max_length = 20 , choices = CATEGORY_CHOICES)
    description = models.TextField(max_length = 300)
    price = models.DecimalField( max_digits = 10, decimal_places=2)
    product_image = models.FileField(upload_to = get_upload_to)
    stock_quantity = models.IntegerField()
    brand = models.CharField(max_length = 20)
    rating = models.CharField(max_length = 5 , choices = RATING_CHOICES)
    discount = models.IntegerField()
    DateTime = models.DateTimeField(auto_now_add = True , null=True)


 

class CartItems(models.Model):

    user = models.ForeignKey(User , on_delete=models.CASCADE)
    product = models.ForeignKey(Products_Upload , on_delete = models.CASCADE )
    address = models.TextField(max_length=500)
    date_time = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField()
    


class WishList(models.Model):

    user = models.ForeignKey(User , on_delete = models.CASCADE )
    product = models.ForeignKey(Products_Upload , on_delete = models.CASCADE )
    created_at = models.DateTimeField(auto_now_add = True)


class Offers_Deals (models.Model):

    title = models.CharField(max_length = 50)
    image = models.FileField(upload_to = 'offers-deals/')
    description = models.TextField(max_length = 300)



class Auction(models.Model):


    item_name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.FileField(upload_to='auction_items/active')
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)


class Auction_Scheduling (models.Model):

    item_name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.FileField(upload_to='auction_items/scheduled')
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)


    



class BidModel(models.Model):


    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name='bids')
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name = 'bidder')
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_time = models.DateTimeField(auto_now_add=True)




class Auction_Chats (models.Model):

    sender = models.ForeignKey( User , on_delete = models.CASCADE , related_name = 'sender' )
    message = models.TextField()
    DateTime = models.DateTimeField(auto_now_add = True ) 



class OnBoard_sellers (models.Model) :

    seller_name = models.ForeignKey(User , on_delete = models.CASCADE )
     