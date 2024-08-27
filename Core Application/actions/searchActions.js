import * as types from "../constants/ActionTypes";

export const searchTracks = (query, options = { limit: "10" }) => ({
  type: types.SEARCH_TRACKS,
  query,
  options
});
export const searchTracksSuccess = (query, results) => ({
  type: types.SEARCH_TRACKS_SUCCESS,
  query,
  results
});
export const searchTracksReset = () => ({ type: types.SEARCH_TRACKS_RESET });

export const searchSpotify = (query, options) => ({
  type: types.SEARCH_SPOTIFY,
  query,
  options
});
export const searchSpotifySuccess = (query, results) => ({
  type: types.SEARCH_SPOTIFY_SUCCESS,
  query,
  results
});
export const searchSpotifyReset = () => ({ type: types.SEARCH_SPOTIFY_RESET });
