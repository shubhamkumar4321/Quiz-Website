# serializers.py
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from .models import User,Question,Answer,Group,Quiz,GroupMembership

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'bio', 'avatar', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()



class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'answers','question_type', 'marks']


 

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        # fields = ['id', 'title', 'description', 'password', 'group']
        fields='__all__'

# class CreateQuizSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Quiz
#         fields = '__all__'
#         # exclude = ['group']

class CreateQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['title']  # Specify the fields you want to include

    def validate(self, data):
        # Validate that the title field is present
        if not data.get('title'):
            raise serializers.ValidationError("The title field is required.")
        return data