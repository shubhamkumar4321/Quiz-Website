from django.urls import path
from .views import RegisterView, LoginView, LogoutView,QuestionListView,GroupListView,GroupDetailView,GroupQuestionView,QuizListView,QuizDetailView,QuestionCreateView,QuizCreateView,AnswerCreateView
urlpatterns = [
    
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('groups/', GroupListView.as_view(), name='group-list'),
    path('groups/<int:id>/', GroupDetailView.as_view(), name='group-detail'),
    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('quizzes/', QuizListView.as_view(), name='quiz-list'),
    path('quizzes/<int:id>/', QuizDetailView.as_view(), name='quiz-detail'),
    # path('groups/<int:group_id>/quizzes/<int:quiz_id>/questions/', GroupQuestionView.as_view(), name='question-list'),
    path('groups/quizzes/<int:quiz_id>/', GroupQuestionView.as_view(), name='question-list'),
    path('quizzes/create/<group_id>/', QuizCreateView.as_view(), name='quiz_create'),
    path('question/create/<quiz_id>/', QuestionCreateView.as_view(), name='question_create'),
    path('answer/create/<question_id>', AnswerCreateView.as_view(), name='answer_create'),



]
