import "react-native-get-random-values"
import { nanoid } from "nanoid"
import { Circle, H6, Image, Square, XStack, YStack } from "tamagui"
import Colors from "../../constants/colors"
import { FlatList } from "react-native"

const extractImage = ({ images, album, track }) => {
  let imageUrl = null
  if (images) {
    imageUrl = images[0].url
  } else if (album?.images) {
    imageUrl = album?.images[0].url
  } else if (track?.album.images) {
    imageUrl = track?.album.images[0].url
  } else {
    return <></>
  }

  return <Image source={{ uri: imageUrl, width: 90, height: 90 }} />
}

export const BlockItem = ({ type, track }) => {
  if (type == "tracks") {
    return (
      <Square
        backgroundColor={Colors.light}
        size='$8'
        marginHorizontal='$2'
        marginVertical='$2'
        overflow='hidden'
      >
        {extractImage(track)}
      </Square>
    )
  } else {
    return (
      <Circle
        backgroundColor={Colors.light}
        size='$8'
        marginHorizontal='$2'
        marginVertical='$2'
        overflow='hidden'
      >
        {extractImage(track)}
      </Circle>
    )
  }
}

const HorizontalFeed = ({ tracks, title, type = "tracks" }) => {
  return (
    <YStack marginTop='$4' marginHorizontal='$2'>
      <H6 marginHorizontal='$2' marginVertical='$2'>
        {title}
      </H6>
      <XStack>
        <FlatList
          horizontal
          data={tracks}
          renderItem={({ item }) => <BlockItem track={item} type={type} />}
          keyExtractor={() => nanoid()}
        />
      </XStack>
    </YStack>
  )
}

export default HorizontalFeed
