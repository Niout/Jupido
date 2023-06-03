from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import *
from .models import *
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from django.middleware import csrf
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Create your views here.

class BaseView(APIView):
    permission_classes = [IsAuthenticated]

class RefreshTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            return Response({"access": access_token, "refresh": refresh_token})
        except:
            return Response({"error": "Invalid token"}, status=401)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_serializer = UserSerializer(user)
        res = Response(user_serializer.data)
        refresh = RefreshToken.for_user(user)
        res.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
            value = str(refresh.access_token),
            expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        res.set_cookie(
            key = "refresh_token",
            value = str(refresh),
            expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        csrf.get_token(request)
        return res



class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=False):
            if "password" in serializer.errors:
                return Response({"message": serializer.errors["password"][0]}, status=400)
            return Response(serializer.errors, status=400)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = Response(serializer.data)
        res.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
            value = str(refresh.access_token),
            expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        res.set_cookie(
            key = "refresh_token",
            value = str(refresh),
            expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        csrf.get_token(request)

        print(res.cookies)
        return res
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        token = RefreshToken.for_user(request.user)
        token.blacklist()
        res =  Response({
            "api": "Boriz API",
            "message": "Logged out",
        }, status=200)
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        return res
    
class UserView(BaseView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class TodoItemView(BaseView):
    def get(self, request, item_id):
        item = TodoItem.objects.filter(id=item_id).first()
        if item is None:
            raise NotFound({
                "message": "This item does not exist",
                "details": "The item you are looking for does not exist"
            })
        
        serializer = TodoItemSerializer(item)
        return Response(serializer.data)
    
    def put(self, request, item_id):
        item = TodoItem.objects.filter(id=item_id).first()
        if item is None:
            raise NotFound({
                "message": "This item does not exist",
                "details": "The item you are looking for does not exist"
            })
        
        request.data["done"] = item.done

        serializer = TodoItemSerializer(item, data=request.data, partial=True)
        if not serializer.is_valid(raise_exception=False):
            return Response(serializer.errors)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request, item_id):
        item = TodoItem.objects.filter(id=item_id).first()
        if item is None:
            raise NotFound({
                "message": "This item does not exist",
                "details": "The item you are looking for does not exist"
            })
        
        item.delete()
        return Response({
            "message": "This item has been deleted"
        })
    
class StatusItemView(BaseView):
    def post(self, request,item_id):
        item = TodoItem.objects.filter(id=item_id).first()
        if item is None:
            raise NotFound({
                "message": "This item does not exist",
                "details": "The item you are looking for does not exist"
            })
        
        if "done" not in request.data or request.data["done"] is None or type(request.data["done"]) != bool:
            raise ValidationError({
                "message": "The done field is required and must be a boolean",
                "details": "Verify that the done field is present and is a boolean"
            })

        item.done = request.data["done"]
        item.save()
        serializer = TodoItemSerializer(item)
        return Response({
                "message": "This item has been updated",
                "data": serializer.data
            })

class ItemManagerView(BaseView):
    def get(self, request):
        items = TodoItem.objects.filter(user=request.user)
        serializer = TodoItemSerializer(items, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TodoItemSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=False):
            return Response(serializer.errors)
        serializer.save(user=request.user)
        return Response(serializer.data)