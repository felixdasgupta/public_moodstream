import { YStack, H6 } from "tamagui"
import Login from "../components/login/Login"
import { useLoginContext } from "../context/loginContext"
import { useHostContext } from "../context/hostContext"
import { SafeAreaView } from "react-native"
import { useEffect } from "react"
import { usePlayerContext } from "../context/playerContext"
import { useSearchContext } from "../context/searchContext"
import MainFeed from "../components/spotify/MainFeed"
import SearchInput from "../components/search/SearchInput"
import SearchResults from "../components/search/SearchResults"

const LibraryScreen = () => {
  const { spotifyAuth } = useLoginContext()
  const { fetchCurrentlyPlayingDetails } = usePlayerContext()
  const { isSearching } = useSearchContext()
  const { getUserQueue } = useHostContext()

  useEffect(() => {
    if (spotifyAuth) {
      fetchCurrentlyPlayingDetails()
      getUserQueue()
    }
  }, [])

  if (!spotifyAuth) {
    return (
      <YStack
        height='70%'
        margin='$12'
        justifyContent='center'
        alignItems='center'
      >
        <H6 margin='$4'>Please login to Spotify!</H6>
        <Login />
      </YStack>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchInput />
      {isSearching && <SearchResults />}
      {!isSearching && <MainFeed />}
    </SafeAreaView>
  )
}

export default LibraryScreen
