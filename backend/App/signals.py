from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils.timezone import now  # Import timezone-aware `now`
from .models import *
from .tasks import activate_auction


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:  
        User_Profile.objects.create(user=instance)


@receiver(post_save, sender=Auction_Scheduling)
def schedule_auction(sender, instance, created, **kwargs):
    if created:
        # Calculate countdown using timezone-aware `now`
        countdown = (instance.start_time - now()).total_seconds()

        if countdown > 0:
            # Schedule the Celery task to run at start_time
            activate_auction.apply_async((instance.id,), countdown=countdown)
