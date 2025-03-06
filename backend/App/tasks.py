from celery import shared_task
from datetime import datetime
from .models import Auction_Scheduling, Auction
from django.utils.timezone import now  # Use timezone-aware now

@shared_task
def activate_auction(auction_id):
    try:
        # Fetch the scheduled auction
        item = Auction_Scheduling.objects.get(id=auction_id)

        # Transfer the entry to the Auction model
        Auction.objects.create(
            item_name=item.item_name,
            description=item.description,
            image=item.image,
            base_price=item.base_price,
            start_time=item.start_time,
            end_time=item.end_time,
            created_by=item.created_by,
            is_active=True,
        )

        # Delete the entry from Auction_Scheduling
        item.delete()
        print(f"Auction {auction_id} activated and moved to Auction model.")

    except Auction_Scheduling.DoesNotExist:
        print(f"Scheduled auction {auction_id} does not exist.")








@shared_task
def deactivate_auction(auction_id):
    try:
    
        auction = Auction.objects.get(is_active = True)

        if now() >= auction.end_time:
            auction.is_active = False
            auction.save()
            print(f"Auction {auction_id} deactivated.")

    except Auction.DoesNotExist:
        print(f"Auction {auction_id} does not exist.")
