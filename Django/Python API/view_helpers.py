import json
import os

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from moodstream.models import Song, Album, TopTrackStanding, Mood, TagMood, User, Playlist, Client, ClientPlaylist
from .spotify_api import get_artists, get_genre, get_song, get_song_info, get_album,\
    get_audio_features, get_audio_track_analysis, get_mood, get_playlist_track_ids

spotify_token = os.environ['spotify_token']
spotify_secret = os.environ['spotify_secret']

client_credentials_manager = SpotifyClientCredentials(
    client_id=spotify_token, client_secret=spotify_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


def populate_song_data(track_uri, song):
    song_info = get_song_info(track_uri)
    song.name = song_info['name']
    song.popularity = song_info['popularity']
    album = get_album(track_uri)
    song.album = album
    artists = get_artists(track_uri)
    for artist in artists:
        song.artist.add(artist)
    # audio_features = get_audio_features(track_uri)
    # song.audio_features = audio_features
    # audio_features.song = song
    # audio_features.save()
    # audio_track_analysis = get_audio_track_analysis(track_uri)
    # song.audio_track_analysis = audio_track_analysis
    # audio_track_analysis.song = song
    # audio_track_analysis.save()
    song.save()


def process_tag_mood(request_body):
    request_dict = json.loads(request_body)
    user, _ = User.objects.get_or_create(spotify_id=request_dict['user_id'])
    track_uri = request_dict['song_id']
    song, song_created = Song.objects.get_or_create(uri=track_uri)
    mood = get_mood(json.dumps(request_dict['mood']))
    # TODO - ensure this only returns one
    tagged_mood = TagMood.objects.get_or_create(
        song=song, mood=mood, user=user)

    if ("top_term" in request_dict) & ("top_pos" in request_dict):
        TopTrackStanding.objects.update_or_create(user=user, song=song,
                                                  top_term=request_dict['top_term'], top_pos=request_dict['top_pos'])
    if song_created:
        populate_song_data(track_uri=track_uri, song=song)
    return tagged_mood[0]


def process_playlist(request_data):
    client, _ = Client.objects.get_or_create(name=request_data['client'])
    # playlist, _ = Playlist.objects.get_or_create(uri=request_data['playlist_id'], name=request_data['playlist_name'])

    track_ids = get_playlist_track_ids(request_data['playlist_id'])

    for t in track_ids:
        song, song_created = Song.objects.get_or_create(uri=t)
        if song_created:
            populate_song_data(track_uri=t, song=song)
    client_playlist, _ = ClientPlaylist.objects.get_or_create(
        client=client,
        uri=request_data['playlist_id'],
        name=request_data['playlist_name'],
        songs=Song.objects.filter(id__in=track_ids)
    )
    return client_playlist
