import { Image, Paragraph, Square, View, XStack, YStack } from "tamagui"
import Colors from "../../constants/colors"
import { Fragment } from "react"

const QueueItem = ({ name, artists, image }) => {
  return (
    <YStack marginVertical='$2' marginHorizontal='$5'>
      <XStack justifyContent='flex-start' alignItems='center'>
        <Square
          backgroundColor={!image && Colors.light}
          pos='relative'
          ov='hidden'
          br='$6'
          size='$6'
          width='100%'
          marginHorizontal='$2'
          marginVertical='$2'
        >
          {image && (
            <Image source={{ uri: image[0].url, width: 90, height: 90 }} />
          )}
        </Square>
        <View marginHorizontal='$2'>
          <Paragraph color={Colors.lightX} marginVertical='$1'>
            {name}
          </Paragraph>
          <Paragraph color={Colors.lightX} marginVertical='$1'>
            {artists.map(({ name, id }, index) => (
              <Fragment key={`artist-${name}-${id}-${index}`}>
                {index > 0 ? ", " : ""}
                {name}
              </Fragment>
            ))}
          </Paragraph>
        </View>
      </XStack>
    </YStack>
  )
}

export default QueueItem
