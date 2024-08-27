const SpotifyWebApi = require("spotify-web-api-node");
const AuthConfig = require("../../config/auth");
const AppConfig = require("../../config/app");

class Spotify {
  constructor(sonosNetwork) {
    this.sonosNetwork = sonosNetwork;
    this.authScopes = [
      "user-read-private",
      "user-library-read",
      "playlist-read-private",
      "streaming"
    ];
    this.credentials = {
      clientId: AuthConfig.CLIENT_ID,
      clientSecret: AuthConfig.CLIENT_SECRET,
      redirectUri: `${AppConfig.HOST}/auth/callback`
    };
    this.spotifyApi = new SpotifyWebApi(this.credentials);
  }

  get authorizeURL() {
    return this.spotifyApi.createAuthorizeURL(this.authScopes, "");
  }

  async checkAuthorization(tokens) {
    if (this.spotifyApi.getAccessToken()) {
      return true;
    }
    if (tokens.refreshToken && tokens.refreshToken !== null) {
      this.spotifyApi.setRefreshToken(tokens.refreshToken);
      try {
        const data = await this.spotifyApi.refreshAccessToken();
        this.spotifyApi.setAccessToken(data.body.access_token);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  }

  async authorizeCode(code) {
    try {
      const data = await this.spotifyApi.authorizationCodeGrant(code);
      this.spotifyApi.setAccessToken(data.body.access_token);
      this.spotifyApi.setRefreshToken(data.body.refresh_token);
      return { refreshToken: data.body.refresh_token };
    } catch (error) {
      throw error;
    }
  }

  async getUserPlaylists() {
    try {
      const refreshData = await this.spotifyApi.refreshAccessToken();
      this.spotifyApi.setAccessToken(refreshData.body.access_token);

      const data = await this.spotifyApi.getUserPlaylists();
      const items = data.body.items.map(item => ({
        title: item.name,
        uri: item.uri,
        artist: null,
        album: null,
        albumArtURI: item.images[0].url
      }));
      const result = {
        total: String(data.body.total),
        returned: String(items.length),
        items
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserAlbums() {
    try {
      const refreshData = await this.spotifyApi.refreshAccessToken();
      this.spotifyApi.setAccessToken(refreshData.body.access_token);

      const data = await this.spotifyApi.getMySavedAlbums();
      const items = data.body.items.map(item => ({
        title: item.album.name,
        uri: item.album.uri,
        artist: item.album.artists[0].name,
        artistURI: item.album.artists[0].uri.split(":").slice(-1)[0],
        album: null,
        albumArtURI: item.album.images[0].url
      }));
      const result = {
        total: String(data.body.total),
        returned: String(items.length),
        items
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserSongs() {
    try {
      const refreshData = await this.spotifyApi.refreshAccessToken();
      this.spotifyApi.setAccessToken(refreshData.body.access_token);

      const data = await this.spotifyApi.getMySavedTracks();
      const items = data.body.items.map(item => ({
        title: item.track.name,
        uri: item.track.uri,
        artist: item.track.album.artists[0].name,
        artistURI: item.track.album.artists[0].uri.split(":").slice(-1)[0],
        albumURI: item.track.album.uri.split(":").slice(-1)[0],
        album: item.track.album.name,
        albumArtURI: item.track.album.images[0].url
      }));
      return {
        total: String(data.body.total),
        returned: String(items.length),
        items
      };
    } catch (error) {
      throw error;
    }
  }

  async getPlaylist(id) {
    try {
      const data = await this.spotifyApi.getPlaylist(id);
      const items = data.body.tracks.items.map(item => ({
        title: item.track.name,
        uri: item.track.uri,
        artist: item.track.artists[0].name,
        artistURI: item.track.artists[0].uri.split(":").slice(-1)[0],
        album: item.track.album.name,
        albumURI: item.track.album.uri.split(":").slice(-1)[0],
        albumArtURI: item.track.album.images[0].url
      }));
      return {
        total: String(data.body.tracks.total),
        returned: String(items.length),
        items,
        uri: data.body.uri,
        name: data.body.name,
        albumArtURI: data.body.images[0].url
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAlbum(id) {
    try {
      const data = await this.spotifyApi.getAlbum(id);
      const items = data.body.tracks.items.map(item => ({
        title: item.name,
        uri: item.uri
      }));
      return {
        total: String(data.body.tracks.total),
        returned: String(items.length),
        items,
        uri: data.body.uri,
        name: data.body.name,
        artist: data.body.artists[0].name,
        artistURI: data.body.artists[0].uri.split(":").slice(-1)[0],
        albumArtURI: data.body.images[0].url
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getArtistAlbums(id) {
    try {
      const data = await this.spotifyApi.getArtistAlbums(id);
      const items = data.body.items.map(item => ({
        title: item.name,
        uri: item.uri,
        albumArtURI: item.images[0].url
      }));
      return {
        total: String(data.body.total),
        returned: String(items.length),
        items,
        uri: data.body.items[0].artists[0].uri,
        name: data.body.items[0].artists[0].name
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Spotify;
