import { combineReducers } from "redux";

import queueReducer from "./queueReducer";
import sessionReducer from "./sessionReducer";
import playbackReducer from "./playbackReducer";
import libraryReducer from "./libraryReducer";
import devicesReducer, * as fromDevices from "./devicesReducer";
import usersReducer from "./usersReducer";
import searchReducer from "./searchReducer";
import recommendationReducer from "./recommendationReducer";
// import sonosReducer from "./sonosReducer";

export const reducers = () =>
  combineReducers({
    queue: queueReducer,
    playback: playbackReducer,
    session: sessionReducer,
    users: usersReducer,
    search: searchReducer,
    // sonos: sonosReducer,
    devices: devicesReducer,
    library: libraryReducer,
    recommendations: recommendationReducer
  });

export const getDevices = state => fromDevices.getDevices(state.devices);

export const getIsFetchingDevices = state =>
  fromDevices.getIsFetching(state.devices);
