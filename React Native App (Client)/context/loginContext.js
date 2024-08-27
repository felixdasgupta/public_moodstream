import { createContext, useState, useMemo, useContext } from "react"
// import { useMMKVString } from "react-native-mmkv"

const LoginContext = createContext({
  spotifyAuth: false,
  accessToken: "",
  refreshDate: "",
  setSpotifyAuth: () => null,
  setAccessToken: () => null,
  setRefreshDate: () => null,
})

const LoginContextWrapper = ({ children }) => {
  const [spotifyAuth, setSpotifyAuth] = useState(false)
  const [accessToken, setAccessToken] = useState("") //useMMKVString("spotify.accessToken")
  const [refreshDate, setRefreshDate] = useState("") //useMMKVString("spotify.refreshDate")

  const loginValue = useMemo(
    () => ({
      spotifyAuth,
      accessToken,
      refreshDate,
      setAccessToken,
      setRefreshDate,
      setSpotifyAuth,
    }),
    [spotifyAuth, accessToken, refreshDate]
  )
  return (
    <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext)

export default LoginContextWrapper
