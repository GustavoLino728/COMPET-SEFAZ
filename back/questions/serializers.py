from rest_framework import serializers
from .models import Question, Option


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