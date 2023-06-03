from django.urls import path
from .views import *

urlpatterns = [
    path("items/", ItemManagerView.as_view()),
    path("items/<int:item_id>/", TodoItemView.as_view()),
    path("items/<int:item_id>/status/", StatusItemView.as_view()),
    path("register/", RegisterView.as_view()),
    path("refresh/", RefreshTokenView.as_view()),
    path("login/", LoginView.as_view()),
    path("user/", UserView.as_view()),
    path("logout/", LogoutView.as_view()),
]