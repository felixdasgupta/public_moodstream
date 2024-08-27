import fetch from "isomorphic-unfetch";

import { SEARCH_SPOTIFY, SEARCH_TRACKS } from "../constants/ActionTypes";
import { searchTracksSuccess } from "../actions/searchActions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const searchSpotify = (query, params) => (dispatch, getState) => {
  let shouldAddWildcard = false;
  if (query.length > 1) {
    const words = query.split(" ");
    const lastWord = words[words.length - 1];
    if (
      /^[a-z0-9\s]+$/i.test(lastWord) &&
      query.lastIndexOf("*") !== query.length - 1
    ) {
      shouldAddWildcard = true;
    }
  }

  const wildcardQuery = `${query}${shouldAddWildcard ? "*" : ""}`; // Trick to improve search results

  const queryString = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return fetch(
    `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(
      wildcardQuery
    )}&${queryString}`,
    {
      headers: {
        Authorization: "Bearer " + getState().session.access_token
      }
    }
  )
    .then(res => res.json())
    .then(res => {
      dispatch(searchTracksSuccess(query, res));
    });
};

const searchWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case SEARCH_TRACKS: {
      return store.dispatch(
        searchSpotify(action.query, {
          type: "track",
          ...action.options
        })
      );
      break;
    }
    case SEARCH_SPOTIFY: {
      return store.dispatch(searchSpotify(action.query, action.options));
      break;
    }
    default:
      break;
  }
  return result;
};

export default searchWare;
