import * as types from "../constants/ActionTypes";

export const fetchPlaylists = (url = "") => ({
  type: types.FETCH_PLAYLISTS,
  url
});
export const fetchPlaylistsSuccess = (items, next) => ({
  type: types.FETCH_PLAYLISTS_SUCCESS,
  items,
  next
});
export const fetchPlaylistsError = error => ({
  type: types.FETCH_PLAYLISTS_ERROR,
  error
});
export const fetchPlaylistsReset = () => ({
  type: types.FETCH_PLAYLISTS_ERROR
});

export const fetchSongs = (url = "") => ({
  type: types.FETCH_SONGS,
  url
});
export const fetchSongsSuccess = (items, next) => ({
  type: types.FETCH_SONGS_SUCCESS,
  items,
  next
});
export const fetchSongsError = error => ({
  type: types.FETCH_SONGS_ERROR,
  error
});
export const fetchSongsReset = () => ({
  type: types.FETCH_SONGS_ERROR
});

export const fetchAlbums = (url = "") => ({
  type: types.FETCH_ALBUMS,
  url
});
export const fetchAlbumsSuccess = (items, next) => ({
  type: types.FETCH_ALBUMS_SUCCESS,
  items,
  next
});
export const fetchAlbumsError = error => ({
  type: types.FETCH_ALBUMS_ERROR,
  error
});
export const fetchAlbumsReset = () => ({
  type: types.FETCH_ALBUMS_ERROR
});

export const fetchArtists = (url = "") => ({
  type: types.FETCH_ARTISTS,
  url
});
export const fetchArtistsSuccess = (items, next) => ({
  type: types.FETCH_ARTISTS_SUCCESS,
  items,
  next
});
export const fetchArtistsError = error => ({
  type: types.FETCH_ARTISTS_ERROR,
  error
});
export const fetchArtistsReset = () => ({
  type: types.FETCH_ARTISTS_ERROR
});

export const fetchTaggedSongs = (url = "") => ({
  type: types.FETCH_TAGGED_LIBRARY,
  url
});
export const fetchTaggedSongsSuccess = (items, next) => ({
  type: types.FETCH_TAGGED_LIBRARY_SUCCESS,
  items,
  next
});
export const fetchTaggedSongsError = error => ({
  type: types.FETCH_TAGGED_LIBRARY_ERROR,
  error
});
export const fetchTaggedSongsReset = () => ({
  type: types.FETCH_TAGGED_LIBRARY_ERROR
});

export const saveTaggedSong = song_uri => ({
  type: types.SAVE_TAGGED_SONG,
  song_uri
});
export const saveTaggedSongSuccess = moodstream_playlist_uri => ({
  type: types.SAVE_TAGGED_SONG_SUCCESS,
  moodstream_playlist_uri
});
