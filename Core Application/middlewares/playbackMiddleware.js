import fetch from "isomorphic-unfetch";

import {
  PLAY_TRACK,
  UNMUTE_PLAYBACK,
  NEXT_TRACK,
  SET_PLAYER
} from "../constants/ActionTypes";
import {
  playTrack,
  playTrackSuccess,
  setPlayerSuccess
} from "../actions/playbackActions";
import * as Config from "../config/app";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const getToken = async refreshToken => {
  const tokens = await fetch(`${Config.HOST}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      refresh_token: refreshToken
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  const res = await tokens.json();
  return res.access_token;
};

const playbackWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case PLAY_TRACK: {
      if (process.browser && store.getState().session.access_token) {
        fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`
          },
          body: JSON.stringify({
            uris: [`spotify:track:${action.track.id}`]
          })
        }).then(() => {
          if (action.position) {
            fetch(
              `${SPOTIFY_API_BASE}/me/player/seek?position_ms=${action.position}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${
                    store.getState().session.access_token
                  }`
                }
              }
            )
              .then(() => {
                store.dispatch(
                  playTrackSuccess(action.track, action.user, action.position)
                );
              })
              .catch(err => {
                console.error(err);
                store.dispatch(
                  playTrack(action.track, action.user, action.position)
                );
              });
          } else {
            store.dispatch(playTrackSuccess(action.track, action.user));
          }
        });
      }
      break;
    }
    case UNMUTE_PLAYBACK: {
      const { track, user, position, startTime } = store.getState().playback;
      const currentPosition = Date.now() - startTime + position;
      store.dispatch(playTrack(track, user, currentPosition));
      break;
    }
    case NEXT_TRACK: {
      fetch("/next-in-queue", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => {
          console.log(res, "NEXT TRACK");
        })
        .catch(function(error) {
          console.error("Queue was not updated", error);
        });
      break;
    }
    case SET_PLAYER: {
      if (
        store.getState().session.access_token &&
        window.onSpotifyWebPlaybackSDKReady &&
        window.Spotify
      ) {
        const { name, volume } = action;
        const refreshToken = store.getState().session.refresh_token;
        const player = new window.Spotify.Player({
          getOAuthToken: async callback => {
            let token = await getToken(refreshToken);
            callback(token);
          },
          name,
          volume
        });
        store.dispatch(setPlayerSuccess(player));
      }
      break;
    }
    default:
      break;
  }

  return result;
};

export default playbackWare;
