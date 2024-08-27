import axios from "axios"
import { useLoginContext } from "./loginContext"

import { createContext, useEffect, useMemo, useContext } from "react"
import { SPOTIFY_URL } from "../constants/spotify"

const SpotifyContext = createContext({
  currentTrack: null,
  setCurrentTrack: () => null,
})

const SpotifyContextWrapper = ({ children }) => {
  const { spotifyAuth, accessToken } = useLoginContext()

  const spotifyApi = axios.create({
    baseURL: SPOTIFY_URL,
    timeout: 3000,
  })

  const refreshToken = () => {
    // gets new access token
  }

  spotifyApi.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status == 403) {
        refreshToken()
      }
    }
  )

  useEffect(() => {
    if (spotifyAuth) {
      spotifyApi.interceptors.request.use(
        config => {
          config.headers["Authorization"] = `Bearer ${accessToken}`
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }, [spotifyAuth])

  const spotifyValue = useMemo(
    () => ({
      spotifyApi,
    }),
    [spotifyApi, spotifyApi?.interceptors?.request]
  )
  return (
    <SpotifyContext.Provider value={spotifyValue}>
      {children}
    </SpotifyContext.Provider>
  )
}

export const useSpotifyContext = () => useContext(SpotifyContext)

export default SpotifyContextWrapper
