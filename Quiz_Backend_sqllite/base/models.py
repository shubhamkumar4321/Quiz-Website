from django.db import models
from django.contrib.auth.models import AbstractUser
import random

class User(AbstractUser):
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(unique=True)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Group(models.Model):
    PRIVACY_CHOICES = [
        ('public', 'Public'),
        ('private', 'Private')
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    privacy_setting = models.CharField(max_length=10, choices=PRIVACY_CHOICES, default='public')
    members = models.ManyToManyField(User, related_name='groups_joined',null=True, blank=True)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_of_groups',null=True, blank=True)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    start_datetime = models.DateTimeField()
    close_datetime = models.DateTimeField()
    password = models.CharField(max_length=255, blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='quizzes')

    def __str__(self):
        return self.title
    




class Question(models.Model):
    QUESTION_TYPE_CHOICES = [
        ('text', 'Text'),
        ('multi_choice', 'Multiple Choice')
    ]

    question = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES, default='multi_choice')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    marks = models.PositiveIntegerField(default=5)  

    def __str__(self):
        return self.question[:25]

    def get_answer(self):
        answer_objs = Answer.objects.filter(question=self).order_by('?')
        random.shuffle(answer_objs)

        data = []
        for answer_obj in answer_objs:
            data.append({
                'answer': answer_obj.answer,
                'is_correct': answer_obj.is_correct
            })
        return data

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer

class Response(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='responses')

class GroupMembership(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"{self.user.username} - {self.group.name} ({self.status})"
