from pyexpat import model
from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    date_created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        abstract = True


class BaseMusicModel(BaseModel):
    uri = models.CharField(max_length=128)
    agg_mood = models.ForeignKey(
        'Mood', null=True, on_delete=models.SET_NULL)
    agg_mood_confidence_score = models.FloatField(default=0)


class Genre(BaseModel):
    name = models.CharField(max_length=128)
    agg_mood = models.ForeignKey(
        'Mood', null=True, on_delete=models.SET_NULL)
    agg_mood_confidence_score = models.FloatField(default=0)

    def __str__(self):
        return self.name


class TopTerm(models.TextChoices):
    short = "short"
    medium = "medium"
    long_ = "long"


class TopTrackStanding(BaseModel):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    song = models.ForeignKey('Song', on_delete=models.CASCADE)
    top_term = models.CharField(
        max_length=6, choices=TopTerm.choices, default=TopTerm.long_, null=True)
    top_pos = models.IntegerField(default=0)


class Artist(BaseMusicModel):
    name = models.CharField(max_length=128)
    genre = models.ManyToManyField('Genre')
    top_term = models.CharField(
        max_length=6, choices=TopTerm.choices, default=TopTerm.long_, null=True)
    top_pos = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Song(BaseMusicModel):
    name = models.CharField(max_length=128)
    popularity = models.IntegerField(default=0)
    preview_url = models.URLField(max_length=128, null=True)
    explicit = models.BooleanField(default=False)
    artist = models.ManyToManyField('Artist')
    album = models.ForeignKey('Album', null=True, on_delete=models.CASCADE)
    duration = models.FloatField(default=0)
    audio_features = models.ForeignKey('AudioFeatures', related_name='song_features',
                                       null=True, on_delete=models.SET_NULL)
    audio_track_analysis = models.ForeignKey('AudioTrackAnalysis', related_name='song_analysis',
                                             null=True, on_delete=models.SET_NULL)

    def __str__(self):
        artists = [str(artist) for artist in self.artist.all()]
        return self.name + ", album:" + str(self.album) + ", artists" + str(artists) + \
            ", audio_features:" + str(self.audio_features) + ", audio_track_analysis:" + \
            str(self.audio_track_analysis)


class Playlist(BaseMusicModel):
    name = models.CharField(max_length=128)
    songs = models.ManyToManyField(Song)

    def __str__(self):
        return f"Playlist [NAME: {self.name}]\n" \
               f"         [SONGS: {self.songs}]"


class Client(BaseModel):
    name = models.CharField(max_length=32, default='')

    def __str__(self):
        return f"Client [NAME: {self.name}]"


class ClientPlaylist(Playlist):
    client = models.ForeignKey('Client', on_delete=models.CASCADE)

    def __str__(self):
        return f"ClientPlaylist [CLIENT: {self.client.name}, PLAYLIST NAME: {self.name}, PLAYLIST URI: {self.uri}]\n" \
               f"               [SONGS: {self.songs}]"


class Album(Playlist):
    release_date = models.DateField(default=timezone.now, null=True)
    image_url = models.URLField(max_length=128, null=True)


class Mood(BaseModel):
    rage = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    ego = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    fear = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    bliss = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    peace = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    love = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    lust = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    life = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])
    death = models.FloatField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(3)])

    def __str__(self):
        return "rage:" + str(self.rage) + ", ego:" + str(self.ego) + ", fear:" + str(self.fear) + \
            ", bliss:" + str(self.bliss) + ", peace:" + str(self.peace) + ", love:" + str(self.love) + \
            ", lust:" + str(self.lust) + ", life:" + \
            str(self.life) + ", death:" + str(self.death)


class MoodTracks(BaseMusicModel):
    songs = models.ManyToManyField(Song)
    mood = models.ForeignKey('Mood', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TagMood(BaseModel):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    song = models.ForeignKey('Song', on_delete=models.CASCADE)
    mood = models.ForeignKey('Mood', on_delete=models.CASCADE)

    def __str__(self):
        return "USER:" + str(self.user) + ", SONG:" + str(self.song) + ", MOOD:" + str(self.mood)


class AudioFeatures(BaseModel):
    song = models.ForeignKey('Song', on_delete=models.CASCADE, null=True)
    key = models.IntegerField(default=0)
    mode = models.IntegerField(default=0)
    time_signature = models.IntegerField(default=0)
    acousticness = models.FloatField(default=0)
    danceability = models.FloatField(default=0)
    energy = models.FloatField(default=0)
    instrumentalness = models.FloatField(default=0)
    liveness = models.FloatField(default=0)
    loudness = models.FloatField(default=0)
    speechiness = models.FloatField(default=0)
    valence = models.FloatField(default=0)
    tempo = models.FloatField(default=0)
    track_href = models.URLField(blank=True)
    analysis_url = models.URLField(blank=True)

    def __str__(self):
        return "key:" + str(self.key) + ", mode:" + \
            str(self.mode) + ", time_signature:" + str(self.time_signature) + \
            ", acousticness" + str(self.acousticness) + ", danceability:" + \
            str(self.danceability) + ", energy:" + str(self.energy) + \
            ", instrumentalness:" + str(self.instrumentalness) + ", liveness:" + \
            str(self.liveness) + ", loudness:" + str(self.loudness) + ", speechiness:" + \
            str(self.speechiness) + ", valence:" + str(self.valence) + \
            ", tempo:" + str(self.tempo)
# don't worry about bars, beats, sessions, segments, tatums
# TODO - figure out how to calculate BPM - new field
# TODO figure out about start, confidence and duration


class AudioTrackAnalysis(BaseModel):
    song = models.ForeignKey('Song', on_delete=models.CASCADE, null=True)
    start = models.FloatField(default=0)
    confidence = models.FloatField(default=0)
    loudness = models.FloatField(default=0)
    tempo = models.FloatField(default=0)
    tempo_confidence = models.FloatField(default=0)
    key = models.IntegerField(default=0)
    key_confidence = models.FloatField(default=0)
    mode = models.IntegerField(default=0)
    mode_confidence = models.FloatField(default=0)
    time_signature = models.IntegerField(default=0)
    time_signature_confidence = models.FloatField(default=0)

    def __str__(self):
        return "key:" + str(self.key) + ", key_confidence:" + \
            str(self.key_confidence) + ", time_signature:" + str(self.time_signature) + \
            ", time_signature" + str(self.time_signature) + ", time_signature_confidence:" + \
            str(self.time_signature_confidence) + ", mode:" + str(self.mode) + \
            ", mode_confidence:" + str(self.mode_confidence) + \
            ", tempo:" + str(self.tempo) + \
            ", tempo_confidence:" + str(self.tempo_confidence)


class UserTraits(BaseModel):
    openness = models.FloatField(null=True, blank=True)
    conscientiousness = models.FloatField(null=True, blank=True)
    extraversion = models.FloatField(null=True, blank=True)
    agreeableness = models.FloatField(null=True, blank=True)
    neuroticism = models.FloatField(null=True, blank=True)

    def __str__(self):
        return "openness:" + str(self.openness) + ", conscientiousness:" + str(self.conscientiousness) + \
            ", extraversion:" + str(self.extraversion) + ", agreeableness:" + str(self.agreeableness) + \
            ", neuroticism:" + str(self.neuroticism)


class Location(BaseModel):
    # TODO update countries to enums
    city = models.CharField(max_length=32)

    class State(models.TextChoices):
        Alabama = "AL"
        Alaska = "AK"
        Arizona = "AZ"
        Arkansas = "AR"
        California = "CA"
        Colorado = "CO"
        Connecticut = "CT"
        Delaware = "DE"
        Florida = "FL"
        Georgia = "GA"
        Hawaii = "HI"
        Idaho = "ID"
        Illinois = "IL"
        Indiana = "IN"
        Iowa = "IA"
        Kansas = "KS"
        Kentucky = "KY"
        Louisiana = "LA"
        Maine = "ME"
        Maryland = "MD"
        Massachusetts = "MA"
        Michigan = "MI"
        Minnesota = "MN"
        Mississippi = "MS"
        Missouri = "MO"
        Montana = "MT"
        Nebraska = "NE"
        Nevada = "NV"
        New_Hampshire = "NH"
        New_Jersey = "NJ"
        New_Mexico = "NM"
        New_York = "NY"
        North_Carolina = "NC"
        North_Dakota = "ND"
        Ohio = "OH"
        Oklahoma = "OK"
        Oregon = "OR"
        Pennsylvania = "PA"
        Rhode_Island = "RI"
        South_Carolina = "SC"
        South_Dakota = "SD"
        Tennessee = "TN"
        Texas = "TX"
        Utah = "UT"
        Vermont = "VT"
        Virginia = "VA"
        Washington = "WA"
        Washington_DC = "DC"
        West_Virginia = "WV"
        Wisconsin = "WI"
        Wyoming = "WY"
        _ = ""

    state = models.CharField(
        max_length=2, choices=State.choices, default=State._)
    country = models.CharField(max_length=128)

    def __str__(self):
        return self.country + ", " + self.state + ", " + self.city


class User(BaseModel):
    class GenderChoices(models.TextChoices):
        MAN = 'Man', _('Man')
        WOMAN = 'Woman', _('Woman')
        NONBINARY = 'Non-binary', _('Non-binary')

    name = models.CharField(max_length=32, null=True, blank=True)
    email = models.EmailField(max_length=256, null=True, blank=True)
    spotify_id = models.CharField(max_length=64)
    user_traits = models.ForeignKey(
        UserTraits, null=True, on_delete=models.SET_NULL)
    location = models.ForeignKey(
        Location, null=True, on_delete=models.SET_NULL)
    gender = models.CharField(
        choices=GenderChoices.choices,
        max_length=15,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.spotify_id


class AdminFields(models.Model):
    Artist = models.BooleanField(default=True)
    Album = models.BooleanField(default=True)
    Audio_Features = models.BooleanField(default=True)
    Audio_Analysis = models.BooleanField(default=True)
    Mood = models.BooleanField(default=True)


class Event(BaseModel):
    name = models.CharField(max_length=32, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    location = models.ForeignKey(
        Location, null=True, on_delete=models.SET_NULL)
    attendees = models.ManyToManyField(User)
    event_date = models.DateTimeField()
    venue = models.CharField(
        max_length=120, default="Caffe Valencia", blank=True)
    event_over = models.BooleanField(null=True)

    def __str__(self):
        return self.name


class Match(models.Model):
    match = models.ForeignKey(User, on_delete=models.CASCADE)
    similar_artists = models.ManyToManyField(Artist)
    similar_songs = models.ManyToManyField(Song)


class MatchProfile(BaseModel):
    class SeekingChoices(models.TextChoices):
        MAN = 'Man', _('Man')
        WOMAN = 'Woman', _('Woman')
        NONBINARY = 'Non-binary People', _('Non-binary people')
        EVERYONE = 'Everyone', _('Everyone')

    primary_user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    matches = models.ManyToManyField(Match)
    seeking = models.CharField(
        choices=SeekingChoices.choices,
        max_length=20,
        null=True,
        blank=True
    )
