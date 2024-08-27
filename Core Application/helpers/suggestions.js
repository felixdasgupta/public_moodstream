import { useState, useEffect } from "react";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const useFetchFeaturedPlaylists = (session, recommendations) => {
  const [isFetching, setIsFetching] = useState(false);
  const [playlistObj, setPlaylistsObj] = useState(null);

  const href = type =>
    `${SPOTIFY_API_BASE}/browse/categories/${type}/playlists`;

  useEffect(() => {
    let searchType =
      recommendations.genres.length > 0 ? recommendations.genres[0] : "chill";
    setIsFetching(true);
    fetch(href(searchType), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
      .then(r => r.json())
      .then(r => {
        if (r.error) {
          console.error(r.error);
        } else {
          setPlaylistsObj(r);
          setIsFetching(false);
        }
      });

    return () => {
      setIsFetching(false);
      setPlaylistsObj(null);
    };
  }, [recommendations]);

  return {
    isFetching,
    playlistObj
  };
};

export const useFetchTop = (session, type = "tracks", term = "short_term") => {
  const [isFetchingTop, setIsFetchingTop] = useState(false);
  const [topObj, setTopObj] = useState(null);

  const href = `${SPOTIFY_API_BASE}/me/top/${type}?limit=50&time_range=${term}`;

  useEffect(() => {
    setIsFetchingTop(true);
    fetch(href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })
      .then(r => r.json())
      .then(r => {
        if (r.error) {
          console.error(r.error);
        } else {
          setTopObj(r);
          setIsFetchingTop(false);
        }
      });

    return () => {
      setIsFetchingTop(false);
      setTopObj(null);
    };
  }, []);

  return {
    isFetchingTop,
    topObj
  };
};
