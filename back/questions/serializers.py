from rest_framework import serializers
from .models import Question, Option, Source, ProblemQuestion, DiscursiveQuestion, MultipleChoiceQuestion, Challenge


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text', 'is_correct', 'created_at']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = [
            'id', 'question_text', 'topic', 'explanation', 
            'created_at', 'updated_at', 'is_active', 
            'confidence_score', 'avg_similarity_score', 'difficulty',
            'options'
        ]


class QuestionCreateSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    
    class Meta:
        model = Question
        fields = [
            'question_text', 'topic', 'explanation', 
            'is_active', 'confidence_score', 'avg_similarity_score', 
            'difficulty', 'options'
        ]
    
    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        
        return question


class QuestionUpdateSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    
    class Meta:
        model = Question
        fields = [
            'question_text', 'topic', 'explanation', 
            'is_active', 'confidence_score', 'avg_similarity_score', 
            'difficulty', 'options'
        ]
    
    def update(self, instance, validated_data):
        options_data = validated_data.pop('options', [])
        
        # Update the question
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update the options
        if options_data:
            # Delete old options
            instance.options.all().delete()
            
            # Create new options
            for option_data in options_data:
                Option.objects.create(question=instance, **option_data)
        
        return instance

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'

class ProblemQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemQuestion
        fields = '__all__'

class DiscursiveQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscursiveQuestion
        fields = '__all__'

class MultipleChoiceQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    problem_questions = ProblemQuestionSerializer(many=True, read_only=True)
    discursive_questions = DiscursiveQuestionSerializer(many=True, read_only=True)
    multiple_choice_questions = MultipleChoiceQuestionSerializer(many=True, read_only=True)
    sources = SourceSerializer(many=True, read_only=True)
    track_name = serializers.CharField(source='track.name', read_only=True)
    program_name = serializers.CharField(source='track.program.name', read_only=True)


    class Meta:
        model = Challenge
        fields = (
            'id', 'title', 'difficulty', 'status', 
            'track', 'track_name', 'program_name', 'sources',
            'problem_questions', 'discursive_questions', 'multiple_choice_questions'
        )
        read_only_fields = ('track',)

class ChallengeUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['status']