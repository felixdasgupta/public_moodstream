import { useState, useEffect } from "react";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export const useFollowAction = (id, session, typeFollow = "artists") => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFetchingFollow, setIsFetchingFollow] = useState(false);
  let hrefIsFollowing,
    hrefFollow = "";

  switch (typeFollow) {
    case "artists":
      hrefIsFollowing = `${SPOTIFY_API_BASE}/me/following/contains?type=artist&ids=${id.toString()}`;
      hrefFollow = `${SPOTIFY_API_BASE}/me/following?type=artist`;
      break;
    case "playlists":
      hrefIsFollowing = `${SPOTIFY_API_BASE}/playlists/${id}/followers/contains?type=artist&ids=${session.user.id.toString()}`;
      hrefFollow = `${SPOTIFY_API_BASE}/playlists/${id}/followers`;
      break;
    case "albums":
      hrefIsFollowing = `${SPOTIFY_API_BASE}/me/albums/contains?ids=${id.toString()}`;
      hrefFollow = `${SPOTIFY_API_BASE}/me/albums`;
      break;
    case "tracks":
      hrefIsFollowing = `${SPOTIFY_API_BASE}/me/tracks/contains?ids=${id.toString()}`;
      hrefFollow = `${SPOTIFY_API_BASE}/me/tracks`;
      break;
    default:
      break;
  }

  useEffect(() => {
    setIsFetchingFollow(true);
    fetch(hrefIsFollowing, {
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
          setIsFollowing(r[0]);
          setIsFetchingFollow(false);
        }
      });

    return () => {
      setIsFollowing(false);
    };
  }, [id]);

  const followAction = id => {
    const method = isFollowing ? "DELETE" : "PUT";
    setIsFetchingFollow(true);
    fetch(hrefFollow, {
      method: method,
      body: JSON.stringify({
        ids: [id]
      }),
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    }).then(r => {
      if (r.error) {
        console.error(r.error);
      } else {
        setIsFollowing(!isFollowing);
        setIsFetchingFollow(false);
      }
    });
  };

  return {
    isFollowing,
    isFetchingFollow,
    followAction
  };
};
