import { YStack, ScrollView } from "tamagui"
import HorizontalFeed from "./HorizontalFeed"
import { useHostContext } from "../../context/hostContext"

const MainFeed = () => {
  const { recentlyPlayed, topSongs, topArtists, usersPlaylists } =
    useHostContext()

  return (
    <ScrollView>
      <YStack margin='$4' marginBottom='$0'>
        {!!recentlyPlayed && recentlyPlayed.length > 0 && (
          <HorizontalFeed tracks={recentlyPlayed} title='Recently Played' />
        )}
        {!!topArtists && topArtists.length > 0 && (
          <HorizontalFeed
            type='artists'
            tracks={topArtists}
            title='Top Artists'
          />
        )}
        {!!topSongs && topSongs.length > 0 && (
          <HorizontalFeed tracks={topSongs} title='Top Songs' />
        )}
        {!!usersPlaylists && usersPlaylists.length > 0 && (
          <HorizontalFeed tracks={usersPlaylists} title='My Playlists' />
        )}
      </YStack>
    </ScrollView>
  )
}

export default MainFeed
