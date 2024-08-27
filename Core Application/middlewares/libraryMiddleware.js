import fetch from "isomorphic-unfetch";

import {
  FETCH_TAGGED_LIBRARY,
  FETCH_PLAYLISTS,
  FETCH_SONGS,
  FETCH_ALBUMS,
  FETCH_ARTISTS,
  SAVE_TAGGED_SONG
} from "../constants/ActionTypes";
import {
  fetchPlaylistsSuccess,
  fetchPlaylistsError,
  fetchSongsSuccess,
  fetchSongsError,
  fetchAlbumsSuccess,
  fetchAlbumsError,
  fetchArtistsSuccess,
  fetchArtistsError,
  saveTaggedSongSuccess,
  fetchTaggedSongsError,
  fetchTaggedSongsSuccess
} from "../actions/libraryActions";

import { uniqBy } from "lodash";
import moodApi from "services/moodApi";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const libraryWare = store => next => action => {
  const result = next(action);

  const saveToPlaylist = (song_uri, playlist_uri) => {
    const URL = `${SPOTIFY_API_BASE}/playlists/${playlist_uri}/tracks`;
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.getState().session.access_token}`
      },
      body: JSON.stringify({
        uris: [song_uri],
        position: 0
      })
    })
      .then(r => r.json())
      .then(r => {
        if (r.error) {
          console.error(r.error);
        } else {
          store.dispatch(saveTaggedSongSuccess(playlist_uri));
        }
      });
  };

  switch (action.type) {
    case FETCH_TAGGED_LIBRARY: {
      moodApi
        .get(
          `/ms_api/getTaggedSongs?user_id=${store.getState().session.user.id}`
        )
        .then(r => {
          if (r.error) {
            store.dispatch(fetchTaggedSongsError(r.error));
          } else {
            store.dispatch(
              fetchTaggedSongsSuccess(r.data.results, r.data.next)
            );
          }
        })
        .catch(function(error) {
          console.error("Tracks were not fetched properly", error);
        });
      break;
    }
    case FETCH_PLAYLISTS: {
      let URL = action.url || `${SPOTIFY_API_BASE}/me/playlists?limit=50`;
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            store.dispatch(fetchPlaylistsError(r.error));
          } else {
            const {
              library: { playlists }
            } = store.getState();

            let items =
              playlists.length > 0 ? [...playlists, ...r.items] : r.items;
            items = uniqBy(items, "id");
            store.dispatch(fetchPlaylistsSuccess(items, r.next));
          }
        });
      break;
    }
    case FETCH_ALBUMS: {
      let URL = action.url || `${SPOTIFY_API_BASE}/me/albums?limit=50`;
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            store.dispatch(fetchAlbumsError(r.error));
          } else {
            const {
              library: { albums }
            } = store.getState();

            let items = albums.length > 0 ? [...albums, ...r.items] : r.items;
            items = uniqBy(items, ({ album }) => album.id);

            store.dispatch(fetchAlbumsSuccess(items, r.next));
          }
        });
      break;
    }
    case FETCH_SONGS: {
      let URL = action.url || `${SPOTIFY_API_BASE}/me/tracks?limit=50`;
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            store.dispatch(fetchSongsError(r.error));
          } else {
            const {
              library: { songs }
            } = store.getState();

            let items = songs.length > 0 ? [...songs, ...r.items] : r.items;
            items = uniqBy(items, ({ track }) => track.id);

            store.dispatch(fetchSongsSuccess(items, r.next));
          }
        });
      break;
    }
    case FETCH_ARTISTS: {
      let URL =
        action.url || `${SPOTIFY_API_BASE}/me/following?type=artist&limit=50`;
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            store.dispatch(fetchArtistsError(r.error));
          } else {
            const {
              library: { artists }
            } = store.getState();

            let items =
              artists.length > 0
                ? [...artists, ...r.artists.items]
                : r.artists.items;
            items = uniqBy(items, "id");

            store.dispatch(fetchArtistsSuccess(items, r.artists.next));
          }
        });
      break;
    }
    case SAVE_TAGGED_SONG: {
      const {
        library: { moodstream_playlist_uri },
        session
      } = store.getState();

      let playlist_uri = moodstream_playlist_uri;

      if (playlist_uri === "") {
        const URL = `${SPOTIFY_API_BASE}/users/${session.user.id}/playlists`;
        fetch(URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`
          },
          body: JSON.stringify({
            name: `Animo's Moodstream | Tagged @Caffe Valencia`,
            description: `Thank you for testing Animo's Moodstream @Caffe Valencia in Williamsburg! Come back soon.`
          })
        })
          .then(r => r.json())
          .then(r => {
            saveToPlaylist(action.song_uri, r.id);
          });
      } else {
        saveToPlaylist(action.song_uri, playlist_uri);
      }
      break;
    }
    default:
      break;
  }

  return result;
};

export default libraryWare;
