import { useState, useEffect } from "react";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const useRecommendationsAutocomplete = ({ session }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [genres, setGenres] = useState(null);

  const href = `${SPOTIFY_API_BASE}/recommendations/available-genre-seeds`;
  useEffect(() => {
    setIsFetching(true);
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
          setGenres(r.genres);
          setIsFetching(false);
        }
      });

    return () => {
      setIsFetching(false);
      setGenres(null);
    };
  }, []);

  return {
    isFetching,
    genres
  };
};

export const useRecommendationsTracklist = ({
  genres: [],
  artists: [],
  tracks: [],
  popularity,
  energy,
  valence
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [tracklist, setTracklist] = useState([]);

  const queryString = new URLSearchParams({
    seed_artists: artists,
    seed_tracks: tracks,
    seed_genres: genres,
    market: "US",
    target_popularity: popularity,
    target_energy: energy,
    target_valence: valence,
    limit: 100
  }).toString();

  const href = `${SPOTIFY_API_BASE}/recommendations?${queryString}`;
  useEffect(() => {
    setIsFetching(true);
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
          setTracklist(r);
        }
      });

    return () => {
      setIsFetching(false);
      setTracklist([]);
    };
  }, []);

  return {
    isFetching,
    tracklist
  };
};
