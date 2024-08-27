import fetch from "isomorphic-unfetch";

import {
  FETCH_AVAILABLE_DEVICES,
  TRANSFER_PLAYBACK_TO_DEVICE,
  SET_DEVICE_REPEAT
} from "../constants/ActionTypes";
import {
  fetchAvailableDevices,
  fetchAvailableDevicesSuccess,
  fetchAvailableDevicesError,
  transferPlaybackToDeviceSuccess,
  transferPlaybackToDeviceError
} from "../actions/devicesActions";
import { playTrack } from "actions/playbackActions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const deviceWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case FETCH_AVAILABLE_DEVICES: {
      fetch(`${SPOTIFY_API_BASE}/me/player/devices`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            store.dispatch(fetchAvailableDevicesError(r.error));
          } else {
            store.dispatch(fetchAvailableDevicesSuccess(r.devices));
          }
        });
      break;
    }
    case TRANSFER_PLAYBACK_TO_DEVICE: {
      fetch(`${SPOTIFY_API_BASE}/me/player`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        },
        body: JSON.stringify({
          device_ids: [action.deviceId],
          play: true
        })
      }).then(r => {
        if (r.error) {
          store.dispatch(transferPlaybackToDeviceError(r.error));
        } else {
          store.dispatch(transferPlaybackToDeviceSuccess());
          store.dispatch(fetchAvailableDevices());
          const {
            track,
            user,
            position,
            startTime
          } = store.getState().playback;
          const currentPosition = Date.now() - startTime + position;
          if (track) store.dispatch(playTrack(track, user, currentPosition));
        }
      });
      break;
    }
    case SET_DEVICE_REPEAT: {
      fetch(
        `${SPOTIFY_API_BASE}/me/player/repeat?device_id=${action.deviceId}&state=${action.state}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`
          }
        }
      );
    }
    default:
      break;
  }

  return result;
};

export default deviceWare;
