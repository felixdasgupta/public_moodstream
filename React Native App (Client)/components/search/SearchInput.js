import { XStack, Input, Theme, Button } from "tamagui"
import { Search } from "@tamagui/lucide-icons"
import { useSearchContext } from "../../context/searchContext"
import { useEffect, useState } from "react"
import { XCircle } from "@tamagui/lucide-icons"

const SearchInput = () => {
  const { searchSpotify, setIsSearching, searchReset } = useSearchContext()
  const [text, setText] = useState("")

  const handleChange = text => {
    setText(text)
    if (text !== "") {
      searchSpotify(text, {
        limit: "10",
        type: "track,artist,album,playlist",
      })
      setIsSearching(true)
    } else {
      setIsSearching(false)
      searchReset()
    }
  }

  const handleClear = () => {
    setText("")
    searchReset()
  }

  useEffect(() => {
    return () => searchReset()
  }, [])

  return (
    <XStack
      justifyContent='space-between'
      alignItems='center'
      margin='$6'
      marginBottom='$0'
    >
      <Search size='$1' />
      <Theme name='purple'>
        <Input
          placeholder={"Search Spotify"}
          value={text}
          onChangeText={handleChange}
          flex={1}
          marginLeft='$3'
          size='$4'
          borderWidth={2}
        />
        {text && (
          <Button onPress={handleClear} size='$3' circular marginLeft='$1'>
            <XCircle size='$2' />
          </Button>
        )}
      </Theme>
    </XStack>
  )
}

export default SearchInput
