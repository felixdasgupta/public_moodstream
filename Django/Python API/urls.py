from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter
from moodstream.views import TagMoodViewSet

router = DefaultRouter()
router.register(r'tagmood', TagMoodViewSet, basename='tagmood')
urlpatterns = router.urls
