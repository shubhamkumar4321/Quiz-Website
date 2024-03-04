from django.contrib import admin
from .models import User, Group, Quiz, Question, Answer, Response, GroupMembership

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]

class QuizInline(admin.TabularInline):
    model = Quiz
    extra = 1

class GroupAdmin(admin.ModelAdmin):
    inlines = [QuizInline]

# Register models with their respective admin classes
admin.site.register(User)
admin.site.register(Group, GroupAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(Response)
admin.site.register(GroupMembership)
