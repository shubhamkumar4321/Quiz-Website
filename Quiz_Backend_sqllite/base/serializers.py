# serializers.py
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from .models import User,Question,Answer,Group

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

# class LogoutSerializer(serializers.Serializer):
#     refresh = serializers.CharField()

#     def validate(self, attrs):
#         self.refresh_token = attrs['refresh']
#         return attrs

#     def save(self, **kwargs):
#         try:
#             refresh_token = RefreshToken(self.refresh_token)
#             # Blacklist the refresh token
#             refresh_token.blacklist()
            
#             # Also blacklist all related access tokens
#             outstanding_tokens = OutstandingToken.objects.filter(token=refresh_token)
#             for token in outstanding_tokens:
#                 token.blacklist()

#         except TokenError:
#             raise serializers.ValidationError('Invalid refresh token')
    

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
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


    from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'password', 'group']
