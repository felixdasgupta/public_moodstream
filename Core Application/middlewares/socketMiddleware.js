import {
  VOTE_UP,
  LOGIN_SUCCESS,
  QUEUE_REMOVE_TRACK,
  QUEUE_TRACK
} from "../constants/ActionTypes";
import { updateUsers } from "../actions/usersActions";
import { updateQueue, queueEnded } from "../actions/queueActions";
import { playTrack, updateNowPlaying } from "../actions/playbackActions";
import Config from "../config/app";
import { queueTrack } from "../actions/queueActions";
import { nextRecommendation } from "../actions/recommendationActions";

import io from "socket.io-client";

var socket = null;

const getIdFromTrackString = (trackString = "") => {
  let matches = trackString.match(/^https:\/\/open\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^https:\/\/play\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^spotify:track:(.*)/);
  if (matches) {
    return matches[1];
  }

  return null;
};

export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket) {
      switch (action.type) {
        case QUEUE_TRACK: {
          let trackId = getIdFromTrackString(action.id);
          if (trackId === null) {
            trackId = action.id;
          }
          socket.emit("queue track", trackId);
          break;
        }
        case QUEUE_REMOVE_TRACK: {
          socket.emit("remove track", action.id);
          break;
        }
        case LOGIN_SUCCESS:
          const user = store.getState().session.user;
          socket.emit("user login", user);
          break;
        case VOTE_UP:
          socket.emit("vote up", action.id);
          break;
        default:
          break;
      }
    }

    return result;
  };
}

const socketWare = store => {
  const {
    session: { client }
  } = store.getState();

  socket = io.connect(Config.HOST);

  socket.on("update queue", data => {
    store.dispatch(updateQueue(data));
  });

  socket.on("queue ended", () => {
    console.log("Queue ENDED");
    const {
      recommendations: { moodTracks }
    } = store.getState();
    if (moodTracks.length > 0) {
      store.dispatch(nextRecommendation());
    } else {
      store.dispatch(queueEnded());
    }
  });

  socket.on("play track", (track, user, position) => {
    store.dispatch(playTrack(track, user, position));
  });

  socket.on("update users", data => {
    store.dispatch(updateUsers(data));
  });

  socket.on("update now playing", (track, user, position) => {
    store.dispatch(updateNowPlaying(track, user, position));
  });

  socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`);
  });
};

export default socketWare;
