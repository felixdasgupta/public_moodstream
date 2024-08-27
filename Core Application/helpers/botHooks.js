import * as Config from "../config/app";

export const generateRecommendations = (session, tracks) => {
  const allTracks = tracks.map(d => d.track.id);
  if (allTracks.length === 0) return null;

  try {
    fetch(`${Config.HOST}/api/generate-recommendations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tracks: allTracks
      })
    })
      .then(res => res.json())
      .then(r => {
        if (!r) return;
        if (r.error) {
          console.error(r.error);
        } else {
          return r;
        }
      });
  } catch (err) {
    console.error("Recommendations Failed", err);
    return null;
  }
};
