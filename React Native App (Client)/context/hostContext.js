import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useLoginContext } from "./loginContext"
import { useSpotifyContext } from "./spotifyContext"

export const HostContext = createContext({
  userProfile: null,
  recentlyPlayed: [],
  usersPlaylists: [],
  topArtists: [],
  topSongs: [],
  devices: [],
  hostQueue: [],
  getUserQueue: () => null,
})

const HostContextWrapper = ({ children }) => {
  const [userProfile, setUserProfile] = useState()
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [usersPlaylists, setUsersPlaylists] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [topSongs, setTopSongs] = useState([])
  const [devices, setDevices] = useState([])
  const [hostQueue, setHostQueue] = useState([])
  const { spotifyAuth, accessToken } = useLoginContext()
  const { spotifyApi } = useSpotifyContext()

  const getProfile = async () => {
    try {
      const response = await spotifyApi.get(`/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUserProfile(response?.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getRecentlyPlayedSongs = async () => {
    try {
      const response = await spotifyApi.get(`/me/player/recently-played`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(Object.keys(response?.data?.items[0].track))
      setRecentlyPlayed(response?.data?.items)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getUserQueue = async () => {
    try {
      const response = await spotifyApi.get(`/me/player/queue`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setHostQueue(response?.data?.queue)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getTopItems = async (type = "artists", term = "short_term") => {
    try {
      const response = await spotifyApi.get(`/me/top/${type}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (type === "artists") {
        setTopArtists(response?.data?.items)
      } else {
        setTopSongs(response?.data?.items)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const myPlaylists = async () => {
    try {
      const response = await spotifyApi.get(`/me/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUsersPlaylists(response?.data?.items)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchDevices = async () => {
    try {
      const response = await spotifyApi.get(`/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setDevices(response?.data?.devices)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (spotifyAuth) {
      getProfile()
      getRecentlyPlayedSongs()
      fetchDevices()
      getUserQueue()
      getTopItems()
      getTopItems("tracks")
      myPlaylists()
    }
  }, [spotifyAuth])

  const hostValue = useMemo(
    () => ({
      userProfile,
      recentlyPlayed,
      topArtists,
      topSongs,
      usersPlaylists,
      devices,
      hostQueue,
      getUserQueue,
    }),
    [
      userProfile,
      recentlyPlayed,
      devices,
      hostQueue,
      topArtists,
      topSongs,
      usersPlaylists,
    ]
  )
  return (
    <HostContext.Provider value={hostValue}>{children}</HostContext.Provider>
  )
}

export const useHostContext = () => useContext(HostContext)

export default HostContextWrapper
