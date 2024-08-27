import fetch from "isomorphic-unfetch";
import * as types from "../constants/ActionTypes";
const Config = require("../config/app");

// PLAYBACK CONTROLS
export const playTrack = (track, user, position) => ({
  type: types.PLAY_TRACK,
  track,
  user,
  position
});
export const nextTrack = () => ({
  type: types.NEXT_TRACK
});

export const updateNowPlaying = (track, user, position) => ({
  type: types.UPDATE_NOW_PLAYING,
  track,
  user,
  position
});
export const playTrackSuccess = (track, user, position) => ({
  type: types.PLAY_TRACK_SUCCESS,
  track,
  user,
  position
});

// MUTE CONTEXT
export const mutePlayback = () => ({ type: types.MUTE_PLAYBACK });
export const unmutePlayback = () => ({ type: types.UNMUTE_PLAYBACK });

// FETCHING PLAYING CONTEXT STATIC
export const fetchPlayingContextSuccess = playingContext => ({
  type: types.FETCH_PLAYING_CONTEXT_SUCCESS,
  playingContext
});

export const fetchPlayingContext = () => dispatch =>
  fetch(`${Config.HOST}/api/now-playing`)
    .then(res => res.json())
    .then(res => dispatch(fetchPlayingContextSuccess(res)));

// PLAYER SETUP

export const setPlayer = (volume, name) => ({
  type: types.SET_PLAYER,
  volume,
  name
});

export const setPlayerSuccess = function(player) {
  return {
    type: types.SET_PLAYER_SUCCESS,
    player
  };
};
