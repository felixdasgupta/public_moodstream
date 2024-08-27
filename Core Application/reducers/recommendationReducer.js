import {
  FETCH_MOOD_TRACKS,
  FETCH_MOOD_TRACKS_SUCCESS,
  FETCH_PLAYLIST_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_SUCCESS,
  UPDATE_HEAD_RECOMMENDATION
} from "../constants/ActionTypes";

const initialState = {
  moodTracks: [],
  isFetching: false,
  genres: [],
  moods: [],
  tracks: [],
  artists: [],
  popularity: [],
  playlists: [],
  currentHead: 0
};

const recommendationReducer = (state, action) => {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return {
        ...state,
        isFetching: true
      };
    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        moodTracks: action.moodTracks,
        genres: action.genres,
        moods: action.moods,
        currentHead: action.currentHead,
        isFetching: false
      };
    case FETCH_MOOD_TRACKS_SUCCESS:
      return {
        ...state,
        moodTracks: action.moodTracks,
        genres: action.genres,
        moods: action.moods,
        isFetching: false
      };
    case FETCH_MOOD_TRACKS:
      return {
        ...state,
        genres: action.genres,
        moods: action.moods,
        popularity: action.popularity,
        tracks: action.tracks,
        artists: action.artists,
        isFetching: true
      };
    case FETCH_MOOD_TRACKS_SUCCESS:
      return {
        ...state,
        moodTracks: action.moodTracks,
        genres: action.genres,
        moods: action.moods,
        isFetching: false
      };
    case FETCH_PLAYLIST_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        moodTracks: action.moodTracks,
        moods: ["Chill", "Happiness"],
        genres: [],
        isFetching: false
      };
    case UPDATE_HEAD_RECOMMENDATION:
      return {
        ...state,
        currentHead: action.currentHead
      };
    default:
      return state ? state : initialState;
  }
};

export default recommendationReducer;
