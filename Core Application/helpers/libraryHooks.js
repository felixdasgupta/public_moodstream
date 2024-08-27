import { useState, useEffect } from "react";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const useFetchAlbumTracks = (id, session) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [album, setAlbum] = useState(null);
  const [next, setNext] = useState("");

  const href = `${SPOTIFY_API_BASE}/albums/${id}`;

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
          setAlbum(r);
          setIsFetching(false);
          setNext(r.tracks.next);
        }
      });

    return () => {
      setIsFetching(false);
      setAlbum(null);
      setNext("");
    };
  }, [id]);

  const fetchMoreTracks = function() {
    if (next === null) return;
    setIsLoadingMore(true);
    fetch(next, {
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
          let updatedAlbums = album;
          updatedAlbums.tracks.items = [...album.tracks.items, ...r.items];
          setAlbum(updatedAlbums);
          setNext(r.next);
          setIsLoadingMore(false);
        }
      });
  };

  return {
    isFetching,
    album,
    next,
    isLoadingMore,
    fetchMoreTracks
  };
};

const useFetchPlaylistTracks = (id, session) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [next, setNext] = useState("");

  const href = `${SPOTIFY_API_BASE}/playlists/${id}`;

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
          setPlaylist(r);
          setIsFetching(false);
          setNext(r.tracks.next);
        }
      });

    return () => {
      setIsFetching(false);
      setPlaylist(null);
      setNext("");
    };
  }, [id]);

  const fetchMoreTracks = function() {
    if (next === null) return;
    setIsLoadingMore(true);
    fetch(next, {
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
          let updatedPlaylist = playlist;
          updatedPlaylist.tracks.items = [...playlist.tracks.items, ...r.items];
          setPlaylist(updatedPlaylist);
          setNext(r.next);
          setIsLoadingMore(false);
        }
      });
  };

  return {
    isFetching,
    playlist,
    next,
    isLoadingMore,
    fetchMoreTracks
  };
};

const useFetchArtistTracks = (id, session) => {
  // artist
  const [isFetchingArtist, setIsFetchingArtist] = useState(false);
  const [artist, setArtist] = useState(null);
  const hrefArtist = `${SPOTIFY_API_BASE}/artists/${id}`;

  useEffect(() => {
    setIsFetchingTracks(true);
    fetch(hrefArtist, {
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
          setArtist(r);
          setIsFetchingArtist(false);
        }
      });

    return () => {
      setIsFetchingArtist(false);
      setArtist(null);
    };
  }, [id]);

  // top tracks
  const [isFetchingTracks, setIsFetchingTracks] = useState(false);
  const [tracks, setTracks] = useState([]);
  const hrefTracks = `${SPOTIFY_API_BASE}/artists/${id}/top-tracks?market=US`;

  useEffect(() => {
    setIsFetchingTracks(true);
    fetch(hrefTracks, {
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
          setTracks(r.tracks);
          setIsFetchingTracks(false);
        }
      });

    return () => {
      setIsFetchingTracks(false);
      setTracks([]);
    };
  }, [id]);

  // albums
  const [isFetchingAlbums, setIsFetchingAlbums] = useState(false);
  const [isLoadingMoreAlbums, setIsLoadingMoreAlbums] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [nextAlbum, setNextAlbums] = useState("");
  const hrefAlbums = `${SPOTIFY_API_BASE}/artists/${id}/albums`;

  useEffect(() => {
    setIsFetchingAlbums(true);
    fetch(hrefAlbums, {
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
          setAlbums(r.items);
          setIsFetchingAlbums(false);
          setNextAlbums(r.next);
        }
      });

    return () => {
      setIsFetchingAlbums(false);
      setAlbums([]);
      setNextAlbums("");
    };
  }, [id]);

  const fetchMoreAlbums = function() {
    if (nextAlbum === null) return;
    setIsLoadingMoreAlbums(true);
    fetch(nextAlbum, {
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
          let updatedAlbums = albums;
          updatedAlbums = [...albums, ...r.items];
          setAlbums(updatedAlbums);
          setNextAlbums(r.next);
          setIsLoadingMoreAlbums(false);
        }
      });
  };

  // artists
  const [isFetchingRelatedArtists, setIsFetchingRelatedArtists] = useState(
    false
  );
  const [relatedArtists, setRelatedArtists] = useState([]);
  const hrefArtists = `${SPOTIFY_API_BASE}/artists/${id}/related-artists`;

  useEffect(() => {
    setIsFetchingRelatedArtists(true);
    fetch(hrefArtists, {
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
          setRelatedArtists(r.artists);
          setIsFetchingRelatedArtists(false);
        }
      });

    return () => {
      setIsFetchingRelatedArtists(false);
      setRelatedArtists([]);
    };
  }, [id]);

  return {
    artist: {
      isFetchingArtist,
      artist
    },
    topTracks: {
      isFetchingTracks,
      tracks
    },
    albums: {
      isFetchingAlbums,
      albums,
      nextAlbum,
      fetchMoreAlbums,
      isLoadingMoreAlbums
    },
    relatedArtists: {
      isFetchingRelatedArtists,
      relatedArtists
    }
  };
};

export { useFetchPlaylistTracks, useFetchArtistTracks, useFetchAlbumTracks };
