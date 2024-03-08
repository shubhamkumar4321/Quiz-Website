from django.urls import path
# from .views import RegisterView, LoginView, LogoutView,QuestionListView,GroupDetailView,GroupListView,GroupQuestionView,QuizListView,QuestionCreateView,QuizCreateView,AnswerCreateView

from .views import RegisterView, LoginView, LogoutView,QuestionListView,GroupListView,QuizinGroupQuestionView,QuizListView,QuizByGroupAPIView,GroupMembershipRequestView,GroupJoinRemoveView,import_questions_from_excel,create_group_and_import_questions,ForgotPasswordView,ResetPasswordView
urlpatterns = [
    
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('groups/', GroupListView.as_view(), name='group-list'),
    path('groups/<int:id>/', GroupListView.as_view(), name='group-list'),
    path('questions/', QuestionListView.as_view(), name='question-list'),
    path('quizzes/', QuizListView.as_view(), name='quiz-list'),
    path('quizzes/<int:id>/', QuizListView.as_view(), name='quiz-detail'),
    path('groups/<int:group_id>/join/', GroupJoinRemoveView.as_view(), name='group_join'),
    path('groups/<int:group_id>/membership-requests/', GroupMembershipRequestView.as_view(), name='group_membership_requests'),
    path('groups/<int:group_id>/membership-requests/<int:membership_id>/', GroupMembershipRequestView.as_view(), name='group_membership_request_detail'),
    path('quizzes/group/<int:group_id>/', QuizByGroupAPIView.as_view(), name='quiz_by_group'),
    path('groups/quizzes/<int:quiz_id>/', QuizinGroupQuestionView.as_view(), name='question-list'),
    path('quizzes/<int:quiz_id>/import/', import_questions_from_excel, name='import_questions_from_excel'),

    path('create-group-and-import-questions/<int:group_id>/', create_group_and_import_questions, name='create_group_and_import_questions'),



    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/<str:uidb64>/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),


    # path('groups/<int:group_id>/quizzes/<int:quiz_id>/questions/', GroupQuestionView.as_view(), name='question-list'),
    

]
