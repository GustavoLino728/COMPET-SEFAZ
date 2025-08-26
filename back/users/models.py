from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True)
    linkedin_url = models.URLField(blank=True, null=True)
    interest_area = models.CharField(max_length=100, blank=True, null=True)
    field_of_work = models.CharField(max_length=100, blank=True, null=True)
    is_auditor = models.BooleanField(default=False)

    def __str__(self):
        return self.username
