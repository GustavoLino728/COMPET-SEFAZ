from rest_framework import serializers


class ChatMessageSerializer(serializers.Serializer):
    """Serializer for chat messages"""
    message = serializers.CharField(max_length=1000, help_text="User message to send to chatbot")
    
    class Meta:
        fields = ['message']


class ChatResponseSerializer(serializers.Serializer):
    """Serializer for chatbot responses"""
    response = serializers.CharField(help_text="Chatbot response")
    sources = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of sources used to generate the question"
    )
    confidence = serializers.CharField(help_text="Confidence level of the question")
    avg_score = serializers.FloatField(help_text="Average score of the question")
    documents_used = serializers.IntegerField(help_text="Number of documents used to generate the question")
    
    class Meta:
        fields = ['response', 'confidence']


class QuestionGenerationSerializer(serializers.Serializer):
    """Serializer for question generation requests"""
    program = serializers.CharField(max_length=100, required=True, help_text="Program for the challenge")
    track = serializers.CharField(max_length=100, required=True, help_text="Track for the challenge")
    topic = serializers.CharField(max_length=200, help_text="Topic for question generation")
    difficulty = serializers.CharField(max_length=50, required=True, help_text="Difficulty level")
    type = serializers.CharField(max_length=50, required=True, help_text="Challenge type")
    
    class Meta:
        fields = ['program', 'track', 'topic', 'difficulty', 'type']


class QuestionResponseSerializer(serializers.Serializer):
    """Serializer for generated question responses"""
    topic = serializers.CharField(help_text="Question topic")
    question = serializers.CharField(help_text="Generated question text")
    options = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of multiple choice options"
    )
    answer = serializers.CharField(help_text="Correct answer option")
    explanation = serializers.CharField(help_text="Explanation for the correct answer")
    difficulty = serializers.CharField(help_text="Question difficulty level")
    sources = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of sources used to generate the question"
    )
    confidence = serializers.CharField(help_text="Confidence level of the question")
    avg_score = serializers.FloatField(help_text="Average score of the question")
    documents_used = serializers.IntegerField(help_text="Number of documents used to generate the question")
    
    class Meta:
        fields = ['topic', 'question', 'options', 'answer', 'explanation', 'difficulty', 'sources', 'confidence', 'avg_score', 'documents_used'] 