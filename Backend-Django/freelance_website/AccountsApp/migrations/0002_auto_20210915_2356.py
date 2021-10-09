# Generated by Django 3.2.5 on 2021-09-15 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AccountsApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accounttypemodel',
            name='UserID',
        ),
        migrations.AddField(
            model_name='accounttypemodel',
            name='Username',
            field=models.TextField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]