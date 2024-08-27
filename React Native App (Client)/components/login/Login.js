import React, { useEffect } from "react"
import * as WebBrowser from "expo-web-browser"
import { ResponseType, useAuthRequest } from "expo-auth-session"
import { Button } from "tamagui"
import { useNavigation } from "@react-navigation/native"
import { Activity } from "@tamagui/lucide-icons"
import Colors from "../../constants/colors"
import { useLoginContext } from "../../context/loginContext"

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

export default function Login() {
  const { setSpotifyAuth, setRefreshDate, setAccessToken, setRefreshToken } =
    useLoginContext()
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "6477f972eb004228a9272d2b1ef98709",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "user-read-playback-state",
        "user-modify-playback-state",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.4.52:8081/--/",
    },
    discovery
  )

  const navigation = useNavigation()

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token, expires_in } = response.params
      if (access_token) {
        const expirationDate = new Date(expires_in).getTime()
        setAccessToken(access_token)
        setRefreshDate(expirationDate.toString())
        setSpotifyAuth(true)
        navigation.navigate("Control")
      }
    }
  }, [response])

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync()
      }}
      iconAfter={Activity}
      size='$3'
      theme='active'
      backgroundColor={Colors.palette.green[4]}
    >
      Sign In with spotify
    </Button>
  )
}
