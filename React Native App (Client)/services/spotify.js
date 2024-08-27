import axios from "axios";

class Spotify {
	constructor({
		accessToken = "",
		spotifyAuth = false,
		refreshDate = "",
		userId = "",
		spotifyUrl = `https://api.spotify.com/v1`,
	}) {
		this.accessToken = accessToken;
		this.spotifyAuth = spotifyAuth;
		this.refreshDate = refreshDate;
		this.userId = userId;
		this.spotifyUrl = spotifyUrl;
	}

	setTokens({ accessToken, refreshDate }) {
		this.spotifyAuth = true;
		this.accessToken = accessToken;
		this.refreshDate = refreshDate;
	}

	setUser({ userProfile }) {
		this.userId = userProfile.id;
	}

	async checkAuthorization() {
		// TODO: properly configure so auth token refreshes
		if (this.refreshDate === new Date.now() && false) {
			this.spotifyApi.setRefreshToken(tokens.refreshToken);
			try {
				const data = await this.spotifyApi.refreshAccessToken();
				this.spotifyApi.setAccessToken(data.body.access_token);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
		if (this.spotifyAuth && this.accessToken) {
			return true;
		} else {
			return false;
		}
	}

	async getUserPlaylists() {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios(`${this.spotifyUrl}/users/${this.userId}/playlists`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.items.map((item) => ({
				title: item.name,
				uri: item.uri,
				artist: null,
				album: null,
				albumArtURI: item.images[0].url,
			}));
			const result = {
				total: `${data.body.total}`,
				returned: `${items.length}`,
				items,
			};
			return result;
		} catch (error) {
			throw error;
		}
	}

	async getUserAlbums() {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios(`${this.spotifyUrl}/me/albums`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.items.map((item) => ({
				title: item.album.name,
				uri: item.album.uri,
				artist: item.album.artists[0].name,
				artistURI: item.album.artists[0].uri.split(":").slice(-1)[0],
				album: null,
				albumArtURI: item.album.images[0].url,
			}));
			const result = {
				total: `${data.body.total}`,
				returned: `${items.length}`,
				items,
			};
			return result;
		} catch (error) {
			throw error;
		}
	}

	async getUserSongs() {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios.get(`${this.spotifyUrl}/me/tracks`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.items.map((item) => ({
				title: item.track.name,
				uri: item.track.uri,
				artist: item.track.album.artists[0].name,
				artistURI: item.track.album.artists[0].uri.split(":").slice(-1)[0],
				albumURI: item.track.album.uri.split(":").slice(-1)[0],
				album: item.track.album.name,
				albumArtURI: item.track.album.images[0].url,
			}));
			return {
				total: `${data.body.total}`,
				returned: `${items.length}`,
				items,
			};
		} catch (error) {
			throw error;
		}
	}

	async getPlaylist(id) {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios.get(`${this.spotifyUrl}/playlists/${id}`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.tracks.items.map((item) => ({
				title: item.track.name,
				uri: item.track.uri,
				artist: item.track.artists[0].name,
				artistURI: item.track.artists[0].uri.split(":").slice(-1)[0],
				album: item.track.album.name,
				albumURI: item.track.album.uri.split(":").slice(-1)[0],
				albumArtURI: item.track.album.images[0].url,
			}));
			return {
				total: `${data.body.total}`,
				returned: `${items.length}`,
				items,
				uri: data.body.uri,
				name: data.body.name,
				albumArtURI: data.body.images[0].url,
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getAlbum(id) {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios.get(`${this.spotifyUrl}/albums/${id}`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.tracks.items.map((item) => ({
				title: item.name,
				uri: item.uri,
			}));
			return {
				total: `${data.body.total}`,
				returned: `${items.length}`,
				items,
				uri: data.body.uri,
				name: data.body.name,
				artist: data.body.artists[0].name,
				artistURI: data.body.artists[0].uri.split(":").slice(-1)[0],
				albumArtURI: data.body.images[0].url,
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getArtistAlbums(id) {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios.get(`${this.spotifyUrl}/artists/${id}/albums`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			const items = data.body.items.map((item) => ({
				title: item.name,
				uri: item.uri,
				albumArtURI: item.images[0].url,
			}));
			return {
				total: String(data.body.total),
				returned: String(items.length),
				items,
				uri: data.body.items[0].artists[0].uri,
				name: data.body.items[0].artists[0].name,
			};
		} catch (error) {
			throw error;
		}
	}

	async getTopItems(type = "artists", term = "short_term") {
		if (!this.checkAuthorization()) return;
		try {
			const response = await axios.get(`${this.spotifyUrl}/me/top/${type}?term=${term}`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			});
			const data = await response.json();
			console.log(data, "Artists");
			return {
				total: String(data.body.total),
				returned: String(items.length),
				items: data.body.items,
			};
		} catch (err) {
			console.log(err.message);
		}
	}
}

export default Spotify;
