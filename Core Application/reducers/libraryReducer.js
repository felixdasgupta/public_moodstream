import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_SONGS,
  FETCH_SONGS_SUCCESS,
  FETCH_SONGS_ERROR,
  FETCH_ALBUMS,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_ERROR,
  FETCH_ARTISTS,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_ERROR,
  FETCH_TAGGED_LIBRARY_SUCCESS,
  FETCH_TAGGED_LIBRARY_ERROR,
  SAVE_TAGGED_SONG,
  SAVE_TAGGED_SONG_SUCCESS
} from "../constants/ActionTypes";

const initialState = {
  isFetchingPlaylists: false,
  isFetchingArtists: false,
  isFetchingAlbums: false,
  isFetchingSongs: false,
  isFetchingTagged: false,
  tagged: [],
  playlists: [],
  albums: [],
  artists: [],
  songs: [],
  nextTagged: "",
  nextPlaylist: "",
  nextArtist: "",
  nextAlbum: "",
  nextSong: "",
  moodstream_playlist_uri: "",
  song_uri: ""
};

const libraryReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        isFetchingPlaylists: true
      };
    case FETCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isFetchingPlaylists: false,
        playlists: action.items,
        nextPlaylist: action.next
      };
    case FETCH_PLAYLISTS_ERROR:
      return {
        ...state,
        isFetchingPlaylists: false,
        playlists: [],
        nextPlaylist: ""
      };
    case FETCH_SONGS:
      return {
        ...state,
        isFetchingSongs: true
      };
    case FETCH_SONGS_SUCCESS:
      return {
        ...state,
        isFetchingSongs: false,
        songs: action.items,
        nextSong: action.next
      };
    case FETCH_SONGS_ERROR:
      return {
        ...state,
        isFetchingSongs: false,
        songs: [],
        nextSong: ""
      };
    case FETCH_ALBUMS:
      return {
        ...state,
        isFetchingAlbums: true
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetchingAlbums: false,
        albums: action.items,
        nextAlbum: action.next
      };
    case FETCH_ALBUMS_ERROR:
      return {
        ...state,
        isFetchingAlbums: false,
        albums: [],
        nextAlbum: ""
      };
    case FETCH_ARTISTS:
      return {
        ...state,
        isFetchingArtists: true
      };
    case FETCH_ARTISTS_SUCCESS:
      return {
        ...state,
        isFetchingArtists: false,
        artists: action.items,
        nextArtist: action.next
      };
    case FETCH_ARTISTS_ERROR:
      return {
        ...state,
        isFetchingArtists: false,
        artists: [],
        nextArtist: ""
      };
    case FETCH_TAGGED_LIBRARY_SUCCESS:
      return {
        ...state,
        isFetchingTagged: false,
        tagged: action.items,
        nextTagged: action.next
      };
    case FETCH_TAGGED_LIBRARY_ERROR:
      return {
        ...state,
        isFetchingTagged: false,
        tagged: [],
        nextTagged: ""
      };
    case SAVE_TAGGED_SONG:
      return {
        ...state,
        song_uri: action.song_uri
      };
    case SAVE_TAGGED_SONG_SUCCESS:
      return {
        ...state,
        moodstream_playlist_uri: action.moodstream_playlist_uri
      };
    default:
      return state ? state : initialState;
  }
};

export default libraryReducer;
