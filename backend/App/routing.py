from django.urls import re_path
from App import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat_auction/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/bid_auction/(?P<product_id>\w+)/$', consumers.AuctionConsumer.as_asgi())

]
