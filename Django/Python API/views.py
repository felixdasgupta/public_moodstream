import json
from django.http import HttpResponseRedirect
from moodstream.models import TagMood, TagMood, User, AdminFields
from django.shortcuts import get_object_or_404, render, redirect
from moodstream.serializers import TagMoodSerializer, TagMoodResponseSerializer, MoodTracksSerializer, \
    PlaylistSerializer, SongSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes
from rest_framework.pagination import PageNumberPagination
from django.core.serializers import serialize
from .view_helpers import process_tag_mood, process_playlist
from django.http import Http404
from .spotify_api import get_tagged_songs, get_client_playlists, get_playlist_track_ids
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .algo import *


class TagMoodViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = TagMood.objects.all()
        serializer = TagMoodSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = TagMood.objects.all()
        tag_mood = get_object_or_404(queryset, pk=pk)
        serializer = TagMoodSerializer(tag_mood)
        return Response(serializer.data)

    def tag_mood(self, request, pk=None):
        request_dict = json.loads(request.body)
        user = User.objects.find(request_dict['user_id'])
        tag_moods = TagMood.objects.filter(user=user)
        serializer = TagMoodSerializer(tag_moods)
        return Response(serializer.data)


def change_admin_fields(request):
    request_dict = request.POST.dict()
    request_dict.pop('csrfmiddlewaretoken', None)
    values_dict = {'Artist'        : False, 'Album': False, 'Audio_Analysis': False,
                   "Audio_Features": False, "Mood": False}
    for key in request_dict.keys():
        if request_dict[key] == 'on':
            values_dict[key] = True
    AdminFields.objects.get_or_create(pk=1)
    AdminFields.objects.filter(pk=1).update(Artist=values_dict['Artist'], Album=values_dict['Album'],
                                            Audio_Analysis=values_dict['Audio_Analysis'],
                                            Audio_Features=values_dict['Audio_Features'],
                                            Mood=values_dict['Mood'])
    return HttpResponseRedirect('/admin/mood/tagmood/')


class StandardResultsSetPagination(PageNumberPagination):
    # can change
    page_size = 100


# TODO?  Ensure that new tagged mood for song overwrites old one


class TagMoodPost(viewsets.ViewSet):
    @swagger_auto_schema(description='create an association between a user, mood and  song',
                         request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             properties={
                                 'user_id': openapi.Schema(type=openapi.TYPE_STRING, default="1"),
                                 'mood'   : openapi.Schema(type=openapi.TYPE_OBJECT,
                                                           properties={
                                                               "rage": openapi.Schema(type=openapi.TYPE_INTEGER,
                                                                                      default=1),
                                                           }
                                                           ),
                                 'song_id': openapi.Schema(type=openapi.TYPE_STRING,
                                                           default="spotify:track:6wDviYDtmSDZ0S6TVMM9Vc"),
                             },
                         ), responses={200: "success"})
    def create(self, request):
        data = json.dumps(request.data)
        try:
            tagged_mood = process_tag_mood(data)
        # can be value error - TODO clarify errors
        except:
            return Response("error with mood data")
        process_tag_mood(data)
        serializer = TagMoodSerializer(tagged_mood)
        return Response(serializer.data)


json_param = openapi.Parameter('params', in_=openapi.IN_QUERY,
                               description='a mood object', type=openapi.TYPE_STRING,
                               default='{"user_id":1}')


class getTaggedSongs(viewsets.GenericViewSet):
    @swagger_auto_schema(operation_description="Get songs user had tagged with a mood",
                         operation_id='TagMoodPost', manual_parameters=[json_param],
                         responses={200: "success"})
    def list(self, request):
        pagination = StandardResultsSetPagination()
        data = json.loads(request.query_params.dict()['params'])
        try:
            songs = get_tagged_songs(data['user_id']).order_by('id')
        except:
            return Response("error with mood data")
        serialized_tagged_moods = TagMoodResponseSerializer(songs, many=True)
        # TODO figure out other way of adding artist to song
        for x in range(0, len(serialized_tagged_moods.data)):
            serialized_tagged_moods.data[x]['artist'] = \
                serialized_tagged_moods.data[x]['song']['artist']
            serialized_tagged_moods.data[x].pop('song', None)
        pages = pagination.paginate_queryset(songs, request)
        serialze = TagMoodSerializer(pages, many=True)
        return pagination.get_paginated_response(serialze.data)


mood_tracks_json_param = openapi.Parameter('params', in_=openapi.IN_QUERY,
                                           description='request moodTracks object', type=openapi.TYPE_STRING,
                                           default='{"genres": ["hip-hop"], "moods":["Aggressive", "Confidence"],'
                                                   '"popularity": "50"}')


class MoodTracks(viewsets.ViewSet):
    @swagger_auto_schema(description='get moodTracks based on mood, genre and popularity',
                         request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             properties={
                                 'genres'    : openapi.Schema(type=openapi.TYPE_ARRAY,
                                                              items=openapi.Items(
                                                                  type=openapi.TYPE_STRING)),
                                 'artists'   : openapi.Schema(type=openapi.TYPE_ARRAY,
                                                              items=openapi.Items(
                                                                  type=openapi.TYPE_STRING)),
                                 'tracks'    : openapi.Schema(type=openapi.TYPE_ARRAY,
                                                              items=openapi.Items(
                                                                  type=openapi.TYPE_STRING)),
                                 'moods'     : openapi.Schema(type=openapi.TYPE_ARRAY,
                                                              items=openapi.Items(
                                                                  type=openapi.TYPE_STRING)),
                                 'popularity': openapi.Schema(type=openapi.TYPE_INTEGER,
                                                              default=50),
                             },
                         ), responses={200: "success"})
    def create(self, request):
        # pagination = StandardResultsSetPagination()
        mood_data = request.data
        # print("Mood Data", mood_data["genres"])
        try:
            songs = getRecommendation(
                genres=mood_data['genres'],
                moods=mood_data['moods'],
                target_popularity=mood_data['popularity'],
                artists=mood_data['artists'],
                tracks=mood_data['tracks'])
            # print("Mood Songs", songs)
            return Response(songs)
        except:
            return Response("error with mood data")
        # serializedSongs = MoodTracksSerializer(songs, many=True)
        # pages = pagination.paginate_queryset(songs, request)
        # serialize = TagMoodSerializer(pages, many=True)


playlist_recommendations_json_param = openapi.Parameter(
    'params', in_=openapi.IN_QUERY,
    description='request playlist_ids object',
    type=openapi.TYPE_STRING,
    default='{"playlist_ids": ["2UsVj20E1WspI5FdgEuAr1"], "moods": ["Aggressive", "Confidence"]}')


class getRecommendationsFromPlaylist(viewsets.ViewSet):
    @swagger_auto_schema(
        description='Get song recommendations given an input playlist ID or set of playlist IDs.',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'playlist_ids': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    default=["2UsVj20E1WspI5FdgEuAr1"]),
                'moods': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    default=["Confidence"]),
            },
        ),
        responses={200: "success"})
    def create(self, request):
        all_track_ids = get_playlist_track_ids(playlist_ids=request.data['playlist_ids'])
        print(all_track_ids)
        try:
            songs = getRecommendation(tracks=all_track_ids, moods=request.data['moods'])
        except Exception as ex:
            return Response(f"Error with recommendation data! {ex}")

        serialized = SongSerializer(songs, many=True)
        return Response(serialized.data)


client_playlists_json_param = openapi.Parameter(
    'params',
    in_=openapi.IN_QUERY,
    description='Name of the client.',
    type=openapi.TYPE_STRING,
    default='{"client": "ned_the_client"}')


class getClientPlaylists(viewsets.GenericViewSet):
    @swagger_auto_schema(
        operation_description="Fetch all playlists that match the client name",
        operation_id='getClientPlaylists',
        manual_parameters=[client_playlists_json_param],
        responses={200: "success"})
    def list(self, request):
        pagination = StandardResultsSetPagination()
        data = json.loads(request.query_params.dict()['params'])
        playlists = get_client_playlists(data['client']).order_by('uri')
        pages = pagination.paginate_queryset(playlists, request)
        serialized = PlaylistSerializer(pages, many=True)
        return pagination.get_paginated_response(serialized.data)


class saveClientPlaylist(viewsets.ViewSet):
    @swagger_auto_schema(
        description='Create a playlist for the given client.',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'playlist_id'  : openapi.Schema(type=openapi.TYPE_STRING,
                                                default="6oBPubRKAPxBCVKH7lFxXD"),
                'playlist_name': openapi.Schema(type=openapi.TYPE_STRING, default="my_test_client_playlist"),
                'client'       : openapi.Schema(type=openapi.TYPE_STRING, default="ned_the_client")
            },
        ), responses={200: "success"})
    def create(self, request):
        try:
            client_playlist = process_playlist(request.data)
        except Exception as ex:
            return Response(f"Error processing playlist data! {ex}")
        process_playlist(request.data)
        serializer = PlaylistSerializer(client_playlist)
        return Response(serializer.data)
