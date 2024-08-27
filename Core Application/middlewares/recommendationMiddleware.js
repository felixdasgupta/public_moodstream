import fetch from "isomorphic-unfetch";

import {
  FETCH_MOOD_TRACKS,
  FETCH_MOOD_TRACKS_SUCCESS,
  FETCH_PLAYLIST_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS,
  NEXT_RECOMMENDATION,
  STREAM_SAFETY
} from "../constants/ActionTypes";
import {
  fetchMoodTracksSuccess,
  getRecommendationsSuccess,
  updateHeadRecommendation
} from "../actions/recommendationActions";
import { queueTrack } from "../actions/queueActions";
import moodApi from "services/moodApi";
import { shuffle } from "lodash";
import { SPOTIFY_API_BASE } from "constants/utils";

const formatDataFrame = dataFrame => {
  const keys = Object.keys(dataFrame);
  const allValues = Object.values(dataFrame);
  const arrayOfSongs = [];

  for (const [index, values] of Object.entries(allValues)) {
    const term = keys[index];
    values.forEach((data, ind) => {
      if (!arrayOfSongs[ind]) {
        arrayOfSongs[ind] = {};
      }
      arrayOfSongs[ind][term] = data;
    });
  }

  return shuffle(arrayOfSongs);
};

const recommendationWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case GET_RECOMMENDATIONS: {
      return fetch("/api/mood-recommendations", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => res.json())
        .then(res => {
          store.dispatch(
            getRecommendationsSuccess({
              moodTracks: res.tracks,
              genres: res.genres,
              moods: res.moods,
              currentHead: res.currentHead
            })
          );
          return res;
        })
        .catch(err => {
          console.error(err);
        });
    }
    case NEXT_RECOMMENDATION: {
      fetch("/api/next-recommendation", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => res.json())
        .then(res => {
          store.dispatch(queueTrack(res.track.uri.split("spotify:track:")[1]));
          store.dispatch(
            updateHeadRecommendation({
              currentHead: res.currentHead
            })
          );
          return;
        })
        .catch(err => {
          console.error(err);
          return null;
        });
      break;
    }
    case FETCH_MOOD_TRACKS: {
      moodApi
        .post("/ms_api/moodTracks", {
          genres: action.genres,
          moods: action.moods,
          popularity: action.popularity,
          artists: action.artists,
          tracks: action.tracks
        })
        .then(r => {
          if (r.error) {
            console.error("Tracks were not fetched properly", r.error);
          } else {
            const formattedData = formatDataFrame(r.data);
            store.dispatch(
              queueTrack(formattedData[0].uri.split("spotify:track:")[1])
            );
            store.dispatch(
              fetchMoodTracksSuccess({
                moodTracks: formattedData,
                genres: action.genres,
                moods: action.moods
              })
            );
          }
        })
        .catch(function(error) {
          console.error("Tracks were not fetched properly", error);
        });
      break;
    }
    case FETCH_MOOD_TRACKS_SUCCESS: {
      return fetch("/api/set-recommendations", {
        method: "POST",
        body: JSON.stringify({
          moodTracks: action.moodTracks,
          genres: action.genres,
          moods: action.moods
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => res.json())
        .then(res => {
          return {
            moodTracks: action.moodTracks,
            genres: action.genres,
            moods: action.moods
          };
        })
        .catch(function(error) {
          console.error("Tracks were not fetched properly", error);
        });
    }
    case FETCH_PLAYLIST_RECOMMENDATIONS_SUCCESS: {
      return fetch("/api/set-recommendations", {
        method: "POST",
        body: JSON.stringify({
          moodTracks: action.moodTracks,
          genres: [],
          moods: ["Chill", "Happiness"]
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => res.json())
        .then(res => {
          store.dispatch(
            queueTrack(action.moodTracks[0].uri.split("spotify:track:")[1])
          );
          return {
            moodTracks: action.moodTracks,
            genres: [],
            moods: ["Chill", "Happiness"]
          };
        })
        .catch(function(error) {
          console.error("Tracks were not fetched properly", error);
        });
    }
    default:
      break;
  }

  return result;
};

export default recommendationWare;
