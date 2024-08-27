import fetch from "isomorphic-unfetch";

import { LOAD, LOGIN, REFRESH } from "../constants/ActionTypes";
import {
  loginSuccess,
  updateCurrentUser,
  updateTokenSuccess
} from "../actions/sessionActions";

import * as Config from "../config/app";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const getCurrentUser = () => (dispatch, getState) =>
  fetch(`${SPOTIFY_API_BASE}/me`, {
    headers: {
      Authorization: "Bearer " + getState().session.access_token
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(updateCurrentUser(res));
    });

const updateToken = () => (dispatch, getState) => {
  return fetch(`${Config.HOST}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      refresh_token: getState().session.refresh_token
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(res => {
      dispatch(updateTokenSuccess(res.access_token));
    });
};

// todo: set a timer, both client-side and server-side

const sessionWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case REFRESH: {
      const { session } = store.getState();
      const refreshToken = session.refresh_token;
      if (refreshToken) {
        console.log("refreshing using refresh token");
        store.dispatch(updateToken()).then(() => {
          store.dispatch(loginSuccess());
        });
      }
      break;
    }
    case LOAD: {
      const { session } = store.getState();
      const expiresIn = session.expires_in;
      const needsToUpdate =
        !expiresIn || expiresIn - Date.now() < 10 * 60 * 1000;
      if (needsToUpdate) {
        console.log("sessionMiddleware > needs to update access token");
        const refreshToken = session.refresh_token;
        if (refreshToken) {
          console.log("sessionMiddleware > using refresh token");
          store
            .dispatch(updateToken())
            .then(() => {
              return store.dispatch(getCurrentUser());
            })
            .then(() => {
              store.dispatch(loginSuccess());
            });
        }
      } else {
        console.log("sessionMiddleware > no need to update access token");
        store.dispatch(getCurrentUser()).then(() => {
          store.dispatch(loginSuccess());
        });
      }
      break;
    }
    case LOGIN: {
      const getLoginURL = scopes => {
        return `${Config.HOST}/auth/login?scope=${encodeURIComponent(
          scopes.join(" ")
        )}`;
      };

      const width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;

      const messageFn = event => {
        try {
          const hash = JSON.parse(event.data);
          if (hash.type === "access_token") {
            window.removeEventListener("message", messageFn, false);
            const accessToken = hash.access_token;
            const expiresIn = hash.expires_in;
            if (accessToken === "") {
              // todo: implement login error
            } else {
              const refreshToken = hash.refresh_token;
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("expiresIn", Date.now() + expiresIn * 1000);
              store.dispatch(updateTokenSuccess(accessToken));
              store
                .dispatch(getCurrentUser())
                .then(() => store.dispatch(loginSuccess()));
            }
          }
        } catch (e) {
          // do nothing
          console.error(e);
        }
      };
      window.addEventListener("message", messageFn, false);

      const url = getLoginURL([
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "streaming",
        "user-read-email",
        "user-read-private"
      ]);
      window.open(url, "Spotify", "_blank");

      break;
    }
    default:
      break;
  }
  return result;
};

export default sessionWare;
