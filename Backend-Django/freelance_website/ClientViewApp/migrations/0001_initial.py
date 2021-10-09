# Generated by Django 3.2.5 on 2021-09-15 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApprovedJobModel',
            fields=[
                ('JobId', models.AutoField(primary_key=True, serialize=False)),
                ('Headline', models.TextField()),
                ('Description', models.TextField()),
                ('Skills', models.TextField()),
                ('AdditionalRequirements', models.TextField()),
                ('CategoryName', models.TextField()),
                ('Removed', models.IntegerField()),
                ('Username', models.TextField()),
                ('Name', models.TextField()),
                ('Email', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FreelancerModel',
            fields=[
                ('FreelancerId', models.AutoField(primary_key=True, serialize=False)),
                ('Username', models.TextField()),
                ('Name', models.TextField()),
                ('City', models.TextField()),
                ('Country', models.TextField()),
                ('EducationalInstitution', models.TextField()),
                ('EducationalQualifications', models.TextField()),
                ('Employment', models.TextField()),
                ('CompanyName', models.TextField()),
                ('Skills', models.TextField()),
                ('CategoryName', models.TextField()),
                ('Email', models.TextField()),
                ('AdditionalContactDetails', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='PostedJobModel',
            fields=[
                ('JobId', models.AutoField(primary_key=True, serialize=False)),
                ('Headline', models.TextField()),
                ('Description', models.TextField()),
                ('Skills', models.TextField()),
                ('AdditionalRequirements', models.TextField()),
                ('CategoryName', models.TextField()),
                ('Removed', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ViewMyProfileModel',
            fields=[
                ('ClientId', models.AutoField(primary_key=True, serialize=False)),
                ('Username', models.TextField()),
                ('Name', models.TextField()),
                ('CompanyName', models.TextField()),
                ('Email', models.TextField()),
                ('City', models.TextField()),
                ('Country', models.TextField()),
            ],
        ),
    ]
