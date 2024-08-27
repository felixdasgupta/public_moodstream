class Bot {
  constructor(options) {
    this.image = options.image || "/static/animo.png";
    this.id = options.id || "Animo";
    this.recommendations = [];
    this.moods = [];
    this.genres = [];
    this.currentHead = 0;
  }

  addRecommendations({ moodTracks, moods, genres }) {
    if (!moodTracks || !moods)
      return {
        currentHead: this.currentHead
      };
    this.recommendations = moodTracks;
    this.moods = moods;
    this.genres = genres;
    this.currentHead = 0;
    return {
      currentHead: 0
    };
  }

  nextSong() {
    if (this.recommendations.length > 0) {
      if (this.recommendations.length - 1 === this.currentHead) {
        this.currentHead = 0;
      } else {
        this.currentHead++;
      }
      return {
        track: this.recommendations[this.currentHead],
        currentHead: this.currentHead
      };
    }
    return null;
  }

  refreshBot() {
    this.recommendations = [];
    this.moods = [];
    this.genres = [];
    this.currentHead = 0;
  }

  async generateRecommendation(items, getToken, spotifyApi) {
    if (items.length > 0) {
      await getToken();
      const res = await spotifyApi.getRecommendations({
        seed_tracks: items
      });
      // Replace with Animo's Moodstream Recommendations
      this.recommendations = res.body.tracks;

      if (this.recommendations.length > 0) {
        return this.recommendations.splice(0, 5);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getRecommendations() {
    return {
      tracks: this.recommendations,
      genres: this.genres,
      moods: this.moods,
      currentHead: this.currentHead
    };
  }

  toJSON() {
    return {
      id: this.id,
      images: [{ url: this.image }],
      type: "animo",
      socketIdArray: [] // todo: always empty, add this attribute in order to be compatible with other true users
    };
  }
}

module.exports = Bot;
