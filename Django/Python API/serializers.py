from rest_framework import serializers
from moodstream.models import Artist, Album, Song, Mood, TagMood, User, Genre, MoodTracks, Client, Playlist


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'uri']
        depth = 1


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        # can remove extra fields id, date created if necessary
        fields = "__all__"


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class SongArtistSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ['artist']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class MoodTracksSerializer(serializers.ModelSerializer):
    song = SongSerializer(many=True, read_only=True)
    mood = MoodSerializer(many=True, read_only=True)

    class Meta:
        model = MoodTracks
        fields = ['song', 'mood']


class TagMoodResponseSerializer(serializers.ModelSerializer):
    mood = MoodSerializer(read_only=True)
    song_name = serializers.ReadOnlyField(source='song.name')
    image_url = serializers.ReadOnlyField(source='song.album.image_url')
    duration = serializers.ReadOnlyField(source='song.duration')
    popularity = serializers.ReadOnlyField(source='song.popularity')
    song = SongArtistSerializer(read_only=True)

    class Meta:
        model = TagMood
        fields = ["song_name", "mood", "image_url",
                  "duration", "popularity", "song"]


class TagMoodSerializer(serializers.ModelSerializer):
    mood = MoodSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    song = SongSerializer(read_only=True)

    class Meta:
        model = TagMood
        fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']


class ArtistSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ['name', 'uri', 'genre']
        # do something for genre manytomany


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['name', 'uri']


class SongSerializer(serializers.ModelSerializer):
    album_image_url = serializers.Field(source='song.album.image_url')
    artist = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Song
        fields = ['name', 'duration', 'popularity',
                  'artist', 'album_image_url']


class PlaylistSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['name', 'uri', 'songs']
