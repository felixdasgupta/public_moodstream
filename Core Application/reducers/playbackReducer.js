import {
  FETCH_PLAYING_CONTEXT_SUCCESS,
  PLAY_TRACK_SUCCESS,
  QUEUE_ENDED,
  MUTE_PLAYBACK,
  UNMUTE_PLAYBACK,
  UPDATE_NOW_PLAYING,
  SET_PLAYER,
  SET_PLAYER_SUCCESS
} from "../constants/ActionTypes";

const initialState = {
  muted: false,
  player: null,
  playerState: {
    error: "",
    errorType: "",
    isActive: false,
    isPlaying: false,
    progressMs: 0,
    volume: 0
  },
  track: null,
  user: null,
  position: 0,
  isInitializing: false
};

const playbackReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PLAYING_CONTEXT_SUCCESS:
      return {
        ...state,
        track: action.playingContext.track,
        user: action.playingContext.user,
        position: 0
      };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date()
      };
    case UPDATE_NOW_PLAYING:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date()
      };
    case QUEUE_ENDED: {
      return initialState;
    }
    case MUTE_PLAYBACK:
      return { ...state, muted: true };
    case UNMUTE_PLAYBACK:
      return { ...state, muted: false };
    case SET_PLAYER:
      return {
        ...state,
        isInitializing: true
      };
    case SET_PLAYER_SUCCESS:
      return {
        ...state,
        player: action.player,
        isInitializing: false
      };
    default:
      return state ? state : initialState;
  }
};

export default playbackReducer;
