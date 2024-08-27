import { createContext, useState, useMemo, useContext } from "react"
import { useSpotifyContext } from "./spotifyContext"
import { useHostContext } from "./hostContext"

const SearchContext = createContext({
  isSearching: false,
  isLoading: false,
  results: null,
  setIsSearching: () => null,
  searchSpotify: () => null,
  searchReset: () => null,
})

const SearchContextWrapper = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(false)

  const { accessToken } = useHostContext()
  const { spotifyApi } = useSpotifyContext()

  const searchReset = () => {
    setResults(null)
    setIsLoading(false)
    setIsSearching(false)
  }

  const searchSpotify = async (
    query,
    params = {
      limit: "10",
      type: "track,artist,album,playlist",
    }
  ) => {
    setIsLoading(true)
    let shouldAddWildcard = false
    if (query.length > 1) {
      const words = query.split(" ")
      const lastWord = words[words.length - 1]
      if (
        /^[a-z0-9\s]+$/i.test(lastWord) &&
        query.lastIndexOf("*") !== query.length - 1
      ) {
        shouldAddWildcard = true
      }
    }

    const wildcardQuery = `${query}${shouldAddWildcard ? "*" : ""}`

    const queryString = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      })
      .join("&")

    try {
      const response = await spotifyApi.get(
        `/search?q=${encodeURIComponent(wildcardQuery)}&${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setResults(response?.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
      setIsLoading(false)
    }
  }

  const searchValue = useMemo(
    () => ({
      isSearching,
      isLoading,
      results,
      setIsSearching,
      searchSpotify,
      searchReset,
    }),
    [isSearching, results]
  )

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)

export default SearchContextWrapper
