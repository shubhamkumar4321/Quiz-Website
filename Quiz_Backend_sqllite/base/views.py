# views.py
import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User,Question,Answer,Group,Quiz
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, LoginSerializer, LogoutSerializer,QuestionSerializer,AnswerSerializer,GroupSerializer,QuizSerializer
from django.contrib.auth import authenticate







class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):

    def post(self, request):
        permission_classes = [IsAuthenticated]  # Require authentication for this view

        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            try:
                refresh_token = serializer.validated_data['refresh']
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({'message': 'Logout successful'}, status=status.HTTP_205_RESET_CONTENT)
            except Exception as e:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class GroupListView(APIView):
    # permission_classes = [IsAuthenticated]  

    def get(self, request):
        groups = Group.objects.all()
        serialized_groups = GroupSerializer(groups, many=True).data
        return Response(serialized_groups)
    
    def post(self, request):

        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            #  admin of the group to the current user
            serializer.validated_data['admin'] = request.user
            
            # add the current user as a member
            group = serializer.save()
            group.members.add(request.user)
            group.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class GroupDetailView(APIView):
    def get(self, request, id):
        try:
            group = Group.objects.get(id=id)
            serialized_group = GroupSerializer(group).data
            return Response(serialized_group)
        except Group.DoesNotExist:
            return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, id):
        try:
            group = Group.objects.get(id=id)
            serializer = GroupSerializer(group, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Group.DoesNotExist:
            return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request,id):
        try:
            group = Group.objects.get(id=id)
            group.delete()
            return Response({"message": "Group deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Group.DoesNotExist:
            return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)

class QuestionListView(APIView):
    def get(self,request):
        questions = list(Question.objects.all())
        random.shuffle(questions)  

        serialized_questions = QuestionSerializer(questions, many=True).data
        return Response(serialized_questions)
    
class QuizListView(APIView):
    def get(self, request):
        quizzes = Quiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

class QuizDetailView(APIView):
    def get(self, request, id):
        try:
            quiz = Quiz.objects.get(id=id)
            serializer = QuizSerializer(quiz)
            return Response(serializer.data)
        except Quiz.DoesNotExist:
            return Response({"message": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)
    
class GroupQuestionView(APIView):
    # def get(self, request, group_id, quiz_id):
    def get(self, request, quiz_id):

        # questions = Question.objects.filter(quiz__group_id=group_id, quiz_id=quiz_id)
        questions = Question.objects.filter(quiz_id=quiz_id)

        # Serialize the questions and their answers
        serialized_questions = QuestionSerializer(questions, many=True).data
        return Response(serialized_questions)
    








class QuizCreateView(APIView):
    def post(self, request, group_id):
        # Ensure that the user is an admin of the group
        if not request.user.admin_of_groups.filter(id=group_id).exists():
            return Response({"message": "You are not authorized to create a quiz for this group"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(id=group_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionCreateView(APIView):
    def post(self, request, quiz_id):
        quiz = Quiz.objects.get(id=quiz_id)
        # Ensure that the user is an admin of the group that the quiz belongs to
        if not request.user.admin_of_groups.filter(id=quiz.group.id).exists():
            return Response({"message": "You are not authorized to add questions to this quiz"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(id=quiz_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnswerCreateView(APIView):
    def post(self, request, question_id):
        question = Question.objects.get(id=question_id)
        # Ensure that the user is an admin of the group that the quiz belongs to
        if not request.user.admin_of_groups.filter(id=question.quiz.group.id).exists():
            return Response({"message": "You are not authorized to add answers to this question"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(id=question_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)