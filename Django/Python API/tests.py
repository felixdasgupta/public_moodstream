from django.test import TestCase
from django.test import Client
import os
import json
import http.client

from .models import Song, Album, Artist, User, Mood
from .spotify_api import get_song, get_song_info, sp,\
    get_album, get_artists, get_mood
import pdb

song_data = sp.search(q='track:abc artist: Jackson 5', type='track')
track_uri = song_data['tracks']['items'][0]['uri']


def get_auth0Token():
    payload = {'client_id': os.environ['AUTH0_CLIENT_ID'],
               'client_secret': os.environ['AUTH0_CLIENT_SECRET'],
               'audience': "localhost/api", 'grant_type': "client_credentials"}
    conn = http.client.HTTPSConnection("dev-jc553k0m.us.auth0.com")
    headers = {'content-type': "application/json"}
    conn.request("POST", "/oauth/token", json.dumps(payload), headers)
    res = conn.getresponse()
    data = res.read()
    print("Bearer Token", data)
    return json.loads(data.decode('utf-8'))


class UserTagMoodTestCase(TestCase):
    def setUp(self):
        User.objects.get_or_create(
            name="Robin", email="robin@robin.com", spotify_id="fake_id")
        Mood.objects.get_or_create(rage=1)
        song_info = get_song_info(track_uri)

    def test_song_popularity(self):
        user = User.objects.get(name="Robin")
        conn = http.client.HTTPConnection("localhost", port=3000)
        data = get_auth0Token()
        headers = {'authorization': "Bearer " +
                   data['access_token'], 'content-type': "application/json"}
        popularity_data = {'user_id': user.spotify_id, "song_id": track_uri, "mood": {
            "rage": 1}, "top_term": "long", "top_pos": 4}
        conn.request("POST", "/api/tagMood",
                     json.dumps(popularity_data), headers=headers)
        res = conn.getresponse()
        data = res.read()
        json_response = json.loads(data.decode('utf-8'))
        # TODO - ensure TopTrackStanding model created or updated
        # pdb.set_trace()
        #self.assertEqual(json_response['message'],"successfully tagged mood")

    def test_tag(self):
        user = User.objects.get(name="Robin")
        mood = Mood.objects.get(rage=1)
        conn = http.client.HTTPConnection("localhost", port=3000)
        data = get_auth0Token()
        headers = {'authorization': "Bearer " +
                   data['access_token'], 'content-type': "application/json"}
        tag_data = {'user_id': user.spotify_id,
                    "song_id": track_uri, "mood": {"rage": 1}}
        conn.request("POST", "/api/tagMood",
                     json.dumps(tag_data), headers=headers)
        res = conn.getresponse()
        data = res.read()
        json_response = json.loads(data.decode('utf-8'))
        #self.assertEqual(json_response['message'],"successfully tagged mood")

        mood_songs_data = {'user_id': user.spotify_id}
        # %7B%22user_id%22%3A1%7D
        conn.request(
            "GET", "/api/getTaggedSongs?params=%7B%22user_id%22%3A1%7D", headers=headers)
        res = conn.getresponse()
        data = res.read()
        json_response = json.loads(data.decode('utf-8'))
        # TODO - add assertion to check songs are correctly retrieved

    def test_without_auth0(self):
        user = User.objects.get(name="Robin")
        mood = Mood.objects.get(rage=1)
        conn = http.client.HTTPConnection("localhost", port=3000)
        tag_data = {'user_id': user.spotify_id,
                    "song_id": track_uri, "mood": {"rage": 1}}
        conn.request("POST", "/api/tagMood", json.dumps(tag_data))
        res = conn.getresponse()
        data = res.read()
        json_response = json.loads(data.decode('utf-8'))
        self.assertEqual(
            json_response, {'detail': 'Authentication credentials were not provided.'})
        mood_songs_data = {'user_id': user.spotify_id, "mood": {"rage": 1}}
        conn.request("GET", "/api/getTaggedSongs", json.dumps(mood_songs_data))
        res = conn.getresponse()
        data = res.read()
        json_response = json.loads(data.decode('utf-8'))


class GetModelsFromAPITestCase(TestCase):
    def test_spotify_requests(self):
        song_info = get_song_info(track_uri)
        song_model = get_song(track_uri)
        self.assertEqual(type(song_model), Song)
        album_model = get_album(track_uri)
        self.assertEqual(type(album_model), Album)
        artist_model = get_artists(track_uri)[0]
        self.assertEqual(type(artist_model), Artist)
        mood_json = '{"rage":"2"}'
        mood = get_mood(mood_json)
        self.assertEqual(type(mood), Mood)
