from rest_framework import viewsets
from rest_framework import serializers, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserCreateSerializer, EmailTokenObtainPairSerializer

    
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['patch'], permission_classes=[IsAuthenticated], url_path='me')
    def partial_update_me(self, request):
        serializer = CustomUserPartialUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    print("=== CHEGOU NA VIEW CUSTOMIZADA ===")
    print("Dados recebidos:", request.data)
    serializer = CustomUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(CustomUserSerializer(user).data, status=status.HTTP_201_CREATED)
    print("Erros:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)