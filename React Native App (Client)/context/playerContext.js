import { createContext, useState, useMemo, useContext, useEffect } from "react"
import { useLoginContext } from "./loginContext"
import { useSpotifyContext } from "./spotifyContext"

const PlayerContext = createContext({
  currentTrack: null,
  playback: null,
  queue: [],
  setCurrentTrack: () => null,
  pausePlayback: () => null,
  startPlayback: () => null,
  nextSong: () => null,
  prevSong: () => null,
  fetchCurrentlyPlayingDetails: () => null,
})

const PlayerContextWrapper = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [playback, setPlayback] = useState(null)
  const { spotifyAuth, accessToken } = useLoginContext()
  const { spotifyApi } = useSpotifyContext()

  const fetchCurrentlyPlayingDetails = async () => {
    try {
      const response = await spotifyApi.get(`/me/player/currently-playing`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setCurrentTrack(response?.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchPlayback = async () => {
    try {
      const response = await spotifyApi.get(`/me/player`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response?.data.is_playing) {
        fetchCurrentlyPlayingDetails()
      }
      setPlayback(response?.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const pausePlayback = async () => {
    try {
      await spotifyApi.put(
        `/me/player/pause?device_id=${playback?.device?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      fetchPlayback()
    } catch (err) {
      console.log(err.message)
    }
  }

  const startPlayback = async () => {
    try {
      await spotifyApi.put(
        `/me/player/play?device_id=${playback?.device?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      fetchPlayback()
    } catch (err) {
      console.log(err.message)
    }
  }

  const nextSong = async () => {
    try {
      await spotifyApi.post(
        `/me/player/next?device_id=${playback?.device?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      fetchPlayback()
    } catch (err) {
      console.log(err.message)
    }
  }

  const prevSong = async () => {
    try {
      await spotifyApi.post(
        `/me/player/previous?device_id=${playback?.device?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      fetchPlayback()
    } catch (err) {
      console.log(err.message)
    }
  }

  const setRepeat = async (state = "off") => {
    try {
      await spotifyApi.put(
        `/me/player/repeat?state=${state}&device_id=${playback?.device?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      fetchPlayback()
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (spotifyAuth) {
      fetchPlayback()
      fetchCurrentlyPlayingDetails()
    }
  }, [spotifyAuth])

  useEffect(() => {
    if (
      spotifyAuth &&
      playback?.device?.id &&
      playback?.repeat_state !== "off"
    ) {
      setRepeat("off")
    }
  }, [spotifyAuth, playback])

  const playerValue = useMemo(
    () => ({
      currentTrack,
      playback,
      setCurrentTrack,
      pausePlayback,
      startPlayback,
      nextSong,
      prevSong,
      fetchCurrentlyPlayingDetails,
    }),
    [currentTrack, playback]
  )
  return (
    <PlayerContext.Provider value={playerValue}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => useContext(PlayerContext)

export default PlayerContextWrapper
