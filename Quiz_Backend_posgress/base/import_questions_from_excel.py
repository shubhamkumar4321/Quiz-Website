from django.contrib.auth.decorators import user_passes_test
import openpyxl
from .models import Quiz, Question, Answer

def user_is_admin_of_group(user, quiz_id):
    try:
        quiz = Quiz.objects.get(id=quiz_id)
        return user.is_superuser or user.groups.filter(id=quiz.group.id, is_admin=True).exists()
    except Quiz.DoesNotExist:
        return False

@user_passes_test(lambda u: user_is_admin_of_group(u, quiz_id))
def import_questions_from_excel(file_path, quiz_id):
    workbook = openpyxl.load_workbook(file_path)
    worksheet = workbook.active

    for row in worksheet.iter_rows(values_only=True):
        question_text = row[0]
        options = row[1:5]
        correct_index = row[5]

        # Create the question
        question = Question.objects.create(question=question_text, quiz_id=quiz_id)

        # Create answers
        for index, option in enumerate(options):
            is_correct = True if index == correct_index else False
            Answer.objects.create(question=question, answer=option, is_correct=is_correct)

# Example usage
excel_file_path = 'path_to_your_excel_file.xlsx'
quiz_id = 1  # Provide the ID of the quiz you want to add questions and answers to
import_questions_from_excel(excel_file_path, quiz_id)
