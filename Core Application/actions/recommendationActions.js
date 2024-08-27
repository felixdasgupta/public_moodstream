import * as types from "../constants/ActionTypes";

export const fetchMoodTracks = ({
  genres,
  moods,
  popularity,
  artists,
  tracks
}) => ({
  type: types.FETCH_MOOD_TRACKS,
  genres,
  moods,
  popularity,
  artists,
  tracks
});
export const fetchMoodTracksSuccess = ({ genres, moods, moodTracks }) => ({
  type: types.FETCH_MOOD_TRACKS_SUCCESS,
  moodTracks,
  genres,
  moods
});
export const getRecommendations = () => ({
  type: types.GET_RECOMMENDATIONS
});
export const getRecommendationsSuccess = ({
  genres,
  moods,
  moodTracks,
  currentHead
}) => ({
  type: types.GET_RECOMMENDATIONS_SUCCESS,
  moodTracks,
  genres,
  moods,
  currentHead
});
export const nextRecommendation = () => ({
  type: types.NEXT_RECOMMENDATION
});
export const updateHeadRecommendation = ({ currentHead }) => ({
  type: types.UPDATE_HEAD_RECOMMENDATION,
  currentHead
});
export const fetchPlaylistRecommendationsSuccess = ({ moodTracks }) => ({
  type: types.FETCH_PLAYLIST_RECOMMENDATIONS_SUCCESS,
  moodTracks
});
