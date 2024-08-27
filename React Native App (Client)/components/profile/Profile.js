import { Avatar, H6, Heading, View, XStack } from "tamagui"

const Profile = ({ userProfile }) => {
  return (
    <XStack justifyContent='flex-end' alignItems='center'>
      {userProfile && (
        <>
          <H6>{userProfile.display_name}</H6>
          <Avatar circular size='$3' marginLeft='$2'>
            <Avatar.Image src={userProfile.images[0].url} />
            <Avatar.Fallback bc='red' />
          </Avatar>
        </>
      )}
    </XStack>
  )
}

export default Profile
