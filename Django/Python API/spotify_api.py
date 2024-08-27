import spotipy
import os
from collections import defaultdict
import json
from spotipy.oauth2 import SpotifyClientCredentials
import sys
from moodstream.models import *

spotify_token = os.environ['spotify_token']
spotify_secret = os.environ['spotify_secret']

client_credentials_manager = SpotifyClientCredentials(
    client_id=spotify_token, client_secret=spotify_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


def get_song_info(track_uri):
    return sp.track(track_uri)

# creates a song object without any of the foreign keys


def get_song(track_uri):
    song_info = get_song_info(track_uri)
    song, _ = Song.objects.get_or_create(name=song_info['name'], uri=song_info['uri'],
                                         preview_url=song_info['preview_url'], duration=song_info['duration_ms'],
                                         explicit=song_info['explicit'])
    song.save()
    return song


def get_album(track_uri):
    album_uri = sp.track(track_uri)['album']['uri']
    album_info = sp.album(album_uri)
    # TODO re-add release data and parse date correctly
    album, _ = Album.objects.get_or_create(name=album_info['name'], uri=album_info['uri'],
                                           image_url=album_info['images'][0]['url'])
    return album


def get_artists(track_uri):
    artists = sp.track(track_uri)['artists']
    artist_list = []
    for artist in artists:
        artist_id = artist['uri']
        artist_info = sp.artist(artist_id)
        genres = artist_info['genres']
        artist, _ = Artist.objects.get_or_create(name=artist_info['name'],
                                                 uri=artist_info['uri'])
        for genre in genres:
            artist.genre.add(get_genre(genre))
        artist_list.append(artist)
    return artist_list


def get_genre(genre_name):
    genre, _ = Genre.objects.get_or_create(name=genre_name)
    return genre


def get_audio_features(track_uri):
    # TODO ensure that there isn't more than one element in this list
    audio_features = sp.audio_features(track_uri)[0]
    return AudioFeatures.objects.create(key=audio_features['key'], mode=audio_features['mode'],
                                        time_signature=audio_features['time_signature'], acousticness=audio_features['acousticness'],
                                        danceability=audio_features['danceability'], energy=audio_features['energy'],
                                        instrumentalness=audio_features['instrumentalness'], liveness=audio_features['liveness'],
                                        loudness=audio_features['loudness'], speechiness=audio_features['speechiness'],
                                        valence=audio_features['valence'], tempo=audio_features[
                                            'tempo'], track_href=audio_features['track_href'],
                                        analysis_url=audio_features['analysis_url'])


def get_audio_track_analysis(track_uri):
    audio_track_analysis = sp.audio_analysis(track_uri)
    track = audio_track_analysis['track']
    analysis = AudioTrackAnalysis.objects.create(
        loudness=track['loudness'], tempo=track['tempo'],
        tempo_confidence=track['tempo_confidence'], key=track['key'],
        key_confidence=track['key_confidence'], mode=track['mode'],
        mode_confidence=track['mode_confidence'], time_signature=track['time_signature'],
        time_signature_confidence=track['time_signature_confidence'])
    return analysis


def get_mood(mood_json):
    mood_dict = json.loads(mood_json)
    mood_dict = defaultdict(int, mood_dict)
    mood, _ = Mood.objects.get_or_create(rage=mood_dict['rage'], ego=mood_dict['ego'],
                                         fear=mood_dict['fear'], bliss=mood_dict['bliss'], peace=mood_dict['peace'],
                                         love=mood_dict['love'], lust=mood_dict['lust'], life=mood_dict['life'],
                                         death=mood_dict['death'])
    return mood


def get_tagged_songs(user_id):
    user = User.objects.get(spotify_id=user_id)
    tagged_songs = TagMood.objects.filter(user=user)
    return tagged_songs

# not bein used for now - maybe later if we want more precise audio analysis (would need to update model)


def get_audio_sections_analysis(track_uri):
    audio_track_analysis = sp.audio_analysis(track_uri)
    audio_track_analysis_sections = audio_track_analysis['sections']
    audio_track_analysis_list = []
    for section in audio_track_analysis_sections:
        analysis = AudioTrackAnalysis.objects.create(start=section['start'], duration=section['duration'],
                                                     confidence=section['confidence'], loudness=section[
                                                         'loudness'], tempo=section['tempo'],
                                                     tempo_confidence=section['tempo_confidence'], key=section['key'],
                                                     key_confidence=section['key_confidence'], mode=section['mode'],
                                                     mode_confidence=section['mode_confidence'], time_signature=section['time_signature'],
                                                     time_signature_confidence=section['time_signature_confidence'])
        audio_track_analysis_list.append(analysis)
    return audio_track_analysis_list


def get_client_playlists(client_name):
    client = Client.objects.get(name=client_name)
    client_playlists = ClientPlaylist.objects.filter(client=client)
    return client_playlists


def get_playlist_track_ids(playlist_ids):
    if type(playlist_ids) is str:
        playlist_ids = [playlist_ids]
    track_ids = []
    for p in playlist_ids:
        playlist = sp.playlist(p)
        for s in playlist['tracks']['items']:
            track_id = s['track']['id']
            track_ids.append(track_id)
    return track_ids
