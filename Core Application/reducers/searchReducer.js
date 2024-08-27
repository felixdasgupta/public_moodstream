import {
  SEARCH_TRACKS,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_RESET,
  SEARCH_SPOTIFY,
  SEARCH_SPOTIFY_SUCCESS,
  SEARCH_SPOTIFY_RESET
} from "../constants/ActionTypes";

const initialState = {};

const searchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_TRACKS:
      return {
        query: action.query,
        options: action.options
      };
    case SEARCH_TRACKS_SUCCESS:
      if (state.query === action.query) {
        return {
          query: action.query,
          options: action.options,
          results: action.results
        };
      } else {
        return state;
      }
    case SEARCH_TRACKS_RESET:
      return initialState;

    case SEARCH_SPOTIFY:
      return {
        query: action.query,
        options: action.options
      };
    case SEARCH_SPOTIFY_SUCCESS:
      if (state.query === action.query) {
        return {
          query: action.query,
          options: action.options,
          results: action.results
        };
      } else {
        return state;
      }
    case SEARCH_SPOTIFY_RESET:
      return initialState;

    default:
      return state ? state : initialState;
  }
};

export default searchReducer;
