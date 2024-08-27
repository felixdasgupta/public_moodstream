import { YStack, ScrollView } from "tamagui"
import { useSearchContext } from "../../context/searchContext"
import HorizontalFeed from "../spotify/HorizontalFeed"

const SearchResults = () => {
  const { results } = useSearchContext()

  return (
    <ScrollView>
      <YStack margin='$4' marginBottom='$0'>
        {results?.tracks?.items?.length > 0 && (
          <HorizontalFeed tracks={results?.tracks?.items} title='Tracks' />
        )}
        {results?.playlists?.items?.length > 0 && (
          <HorizontalFeed
            tracks={results?.playlists?.items}
            title='Playlists'
          />
        )}
        {results?.artists?.items?.length > 0 && (
          <HorizontalFeed
            type='artists'
            tracks={results?.artists?.items}
            title='Artists'
          />
        )}
        {results?.albums?.items?.length > 0 && (
          <HorizontalFeed tracks={results?.albums?.items} title='Albums' />
        )}
      </YStack>
    </ScrollView>
  )
}

export default SearchResults
