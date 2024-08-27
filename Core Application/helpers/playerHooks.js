import { playTrack } from "actions/playbackActions";
import { useState, useEffect } from "react";

export const useSpotifyPlayer = (
  transferPlaybackToDevice,
  fetchAvailableDevices,
  player
) => {
  const [playerState, setPlayerState] = useState({
    error: "",
    errorType: "",
    isActive: false,
    isPlaying: false,
    progressMs: 0,
    volume: 0
  });

  const [moodstreamDeviceId, setMoodstreamDeviceId] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!player || !player.isLoaded) return;
    player.addListener("ready", handlePlayerStatus);
    player.addListener("not_ready", handlePlayerStatus);
    player.addListener("player_state_changed", handlePlayerStateChanges);
    player.addListener("initialization_error", error =>
      handlePlayerErrors("initialization_error", error.message)
    );
    player.addListener("authentication_error", error =>
      handlePlayerErrors("authentication_error", error.message)
    );
    player.addListener("account_error", error =>
      handlePlayerErrors("account_error", error.message)
    );
    player.addListener("playback_error", error =>
      handlePlayerErrors("playback_error", error.message)
    );

    player.connect();
  }, [player]);

  const handlePlayerStatus = async ({ device_id }) => {
    fetchAvailableDevices();
    transferPlaybackToDevice(device_id);
    setMoodstreamDeviceId(device_id);
    setStatus(!!device_id);
  };

  const handlePlayerErrors = async (type, message) => {
    console.error(message, type);
    const isPlaybackError = type === "playback_error";
    const isInitializationError = type === "initialization_error";
    let nextStatus = status;

    if (player && !isPlaybackError) {
      await player.disconnect();
    }

    if (isInitializationError) {
      nextStatus = false;
    }

    if (!isInitializationError && !isPlaybackError) {
      nextStatus = false;
    }
    setStatus(nextStatus);
  };

  const handlePlayerStateChanges = async state => {
    try {
      /* istanbul ignore else */
      if (state) {
        const {
          paused,
          position,
          track_window: {
            current_track: { album, artists, duration_ms, id, name, uri },
            next_tracks,
            previous_tracks
          }
        } = state;

        const isPlaying = !paused;
        const volume = await player.getVolume();
        const track = {
          artists,
          durationMs: duration_ms,
          id,
          image: setAlbumImage(album),
          name,
          uri
        };
        let trackState;

        if (position === 0) {
          trackState = {
            nextTracks: next_tracks,
            position: 0,
            previousTracks: previous_tracks,
            track
          };
        }

        setPlayerState({
          error: "",
          errorType: "",
          isActive: true,
          isPlaying,
          progressMs: position,
          volume: volume,
          ...trackState
        });
      } else {
        setPlayerState({
          isActive: false,
          isPlaying: false,
          nextTracks: [],
          position: 0,
          previousTracks: [],
          track: {
            artists: "",
            durationMs: 0,
            id: "",
            image: "",
            name: "",
            uri: ""
          }
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  function setAlbumImage(album) {
    const width = Math.min(...album.images.map(d => d.width));
    const thumb = album.images.find(d => d.width === width);
    return thumb.url;
  }

  return {
    playerState,
    moodstreamDeviceId,
    status
  };
};
