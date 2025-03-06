from decimal import Decimal
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import  sync_to_async
from channels.db import database_sync_to_async
import re


def sanitize_group_name(group_name):
    """
    Sanitizes group names to ensure they are valid for Channels.
    """
    # Replace invalid characters with underscores
    sanitized_name = re.sub(r"[^a-zA-Z0-9._\-]", "_", group_name)
    # Ensure the length is less than 100 characters
    return sanitized_name[:100]


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_room_name = sanitize_group_name(f"chat_{self.room_name}")

        try:
            await self.channel_layer.group_add(
                self.group_room_name,
                self.channel_name
            )
            await self.accept()
        except Exception as e:
            await self.close(code=4001)







    async def receive(self, text_data):

        from django.contrib.auth.models import User

        data = json.loads(text_data)

        if data.get("type") == "fetch_history":
            await self.chat_history()
        else:
            message = data.get("message")
            sender = data.get("sender")


            user = await sync_to_async(User.objects.get)(pk = sender)

            await self.add_chat( user , message )

            await self.channel_layer.group_send(
                self.group_room_name,
                {
                    "type": "send_message",
                    "message": message,
                    "sender":  user.username,
                },
            )

    @database_sync_to_async
    def add_chat( self , user , message ):

        from App.models import Auction_Chats

        data = Auction_Chats.objects.create( sender = user, message = message )
        data.save()



    async def chat_history(self):
        try:
            from App.models import Auction_Chats

            history = await sync_to_async(
                list
            )(Auction_Chats.objects.select_related("sender").order_by("DateTime"))

            history_data = [
                {
                    "sender": n.sender.username,
                    "message": n.message,
                    "datetime": n.DateTime.isoformat(),
                }
                for n in history
            ]

            await self.send(
                text_data=json.dumps({"type": "history", "data": history_data})
            )

        except Exception as e:
            await self.send(
                text_data=json.dumps(
                    {"type": "error", "message": f"Failed to load chat history: {str(e)}"}
                )
            )

    async def send_message(self, event):
        message = event["message"]
        sender = event["sender"]

        await self.send(
            text_data=json.dumps({"message": message, "sender": sender})
        )

    async def disconnect(self, close_code):
        try:
            await self.channel_layer.group_discard(
                self.group_room_name,
                self.channel_name,
            )
        except Exception as e:
            print(f"Error during disconnect: {str(e)}")





class AuctionConsumer(AsyncWebsocketConsumer):


    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["product_id"]
        self.group_room_name = sanitize_group_name(f"bid_by_{self.room_name}")

        try:
            await self.channel_layer.group_add(
                self.group_room_name,
                self.channel_name,
            )
            await self.accept()
        except Exception as e:
            await self.close(code=4001)





    async def receive(self, text_data):

        from App.models import BidModel , Auction
        from django.contrib.auth.models import User

        data = json.loads(text_data)

        if data.get("type") == "auc_history":
                
                auc = await sync_to_async(lambda: Auction.objects.filter(is_active=True).first())()


                max_bid_record = await sync_to_async(
                    lambda: BidModel.objects.filter(auction=auc).order_by("-bid_amount").first()
                )()


                if max_bid_record:
                    response_data = {
                        "type": "auc_history",
                        "max_bid": float(max_bid_record.bid_amount),
                        "user": await sync_to_async(lambda: max_bid_record.user.username)(),
                        "timestamp": max_bid_record.bid_time.isoformat()
                        if max_bid_record.bid_time
                        else None,
                    }
                else:
                    response_data = {
                        "type": "auc_history",
                        "max_bid": None,
                        "user": None,
                        "timestamp": None,
                    }

                await self.send(text_data=json.dumps(response_data))

        

        else:


            bid = data.get("bid")
            user_id = data.get("user")
            a_Id = data.get("auctionId")

            a_item = await sync_to_async(Auction.objects.get)(pk = a_Id)
            user = await sync_to_async(User.objects.get)(pk = user_id)




            
            await self.add_bid(bid , user , a_item)
            
            await self.channel_layer.group_send(
                    self.group_room_name,
                    {
                        "type": "show_bid",
                        "bid": bid,
                        "user": user_id,
                    },
                )




    async def show_bid(self, event):

        bid = event["bid"]
        user = event["user"]

        await self.send(
            text_data=json.dumps({"type": "bid", "bid": bid, "user": user})

        )




    @database_sync_to_async
    def add_bid(self , bid , user , a_item):

        from App.models import BidModel

        data = BidModel.objects.create( auction = a_item , user = user , bid_amount = bid )
        data.save()








    

    async def disconnect(self, close_code):
        try:
            await self.channel_layer.group_discard(
                self.group_room_name,
                self.channel_name,
            )
        except Exception as e:
            print(f"Error during disconnect: {str(e)}")
