# Generated by Django 2.1.3 on 2018-12-05 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysiteapp', '0002_auto_20181202_1547'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardWord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=200)),
                ('translate', models.CharField(max_length=200)),
            ],
        ),
    ]