class Mood {
    constructor({mood, music, location, activity}) {
        // Mood Selection
        this.rage = mood.rage || 0;
        this.ego = mood.ego || 0;
        this.fear = mood.fear || 0;
        this.bliss = mood.bliss || 0;
        this.peace = mood.peace || 0;
        this.love = mood.love || 0;
        this.lust = mood.lust || 0;
        this.life = mood.life || 0;
        this.death = mood.death || 0;

        // Marking Activity or Location Type
        this.activity = activity || '';
        this.location = location || '';

        // Selecting Music Preferences
        this.tags = music.tags || [];
        this.genres = music.genres || [];
        this.artists = music.artists || [];
        this.playlists = music.playlists || [];
        this.tracks = music.tracks || [];
        this.per_new = music.per_new || 0;
    }

    // add actions to 
    toJSON() {
        return {
            mood: {
                rage : this.rage,
                ego : this.ego,
                fear : this.fear,
                bliss : this.bliss,
                peace : this.peace,
                love : this.love,
                lust : this.lust,
                life : this.life,
                death : this.death,
            },
            location: this.location,
            activity: this.activity,
            music: {
                tags: this.tags,
                genres: this.genres,
                artists: this.artists,
                playlists: this.playlists,
                tracks: this.tracks,
                per_new: this.per_new
            }
        };
    }
}

module.exports = Mood;
