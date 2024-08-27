import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducers } from "../reducers";
import { createWrapper } from "next-redux-wrapper";

import sessionMiddleware from "../middlewares/sessionMiddleware";
import playbackMiddleware from "../middlewares/playbackMiddleware";
import devicesMiddleware from "../middlewares/devicesMiddleware";
import { socketMiddleware } from "../middlewares/socketMiddleware";
import loggerMiddleware from "../middlewares/loggerMiddleware";
import socketMiddlewareDefault from "../middlewares/socketMiddleware";
import searchMiddleware from "../middlewares/searchMiddleware";
import libraryMiddleware from "../middlewares/libraryMiddleware";
import recommendationMiddleware from "../middlewares/recommendationMiddleware";
import queueWare from "middlewares/queueMiddleware";

import { load } from "../actions/sessionActions";

export const initStore = (initialState = {}) => {
  const store = createStore(
    reducers(),
    initialState,
    applyMiddleware(
      thunk,
      sessionMiddleware,
      socketMiddleware,
      playbackMiddleware,
      devicesMiddleware,
      loggerMiddleware,
      searchMiddleware,
      libraryMiddleware,
      recommendationMiddleware,
      queueWare
      // sonosMiddleWare
    )
  );
  socketMiddlewareDefault(store);
  store.dispatch(load());
  return store;
};

const makeStore = () => initStore();
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production"
});
