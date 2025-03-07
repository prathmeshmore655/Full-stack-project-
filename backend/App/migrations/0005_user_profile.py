# Generated by Django 5.1.3 on 2024-11-17 11:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0004_featured_products'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='User_Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField(default=None, max_length=100)),
                ('mobile', models.CharField(default=None, max_length=12)),
                ('profile_image', models.FileField(upload_to='profiles/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
