import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Theme, YStack, H6 } from "tamagui";
import { useHostContext } from "../context/hostContext";
import { MediaPlayer } from "../components/spotify/MediaPlayer";
import { useLoginContext } from "../context/loginContext";
import Login from "../components/login/Login";
import QueueItem from "../components/spotify/QueueItem";
import { FlatList, SafeAreaView } from "react-native";
import { usePlayerContext } from "../context/playerContext";

const ControlScreen = () => {
	const { spotifyAuth } = useLoginContext();
	const { hostQueue } = useHostContext();
	const { currentTrack, nextSong, prevSong } = usePlayerContext();

	if (!spotifyAuth) {
		return (
			<YStack height='70%' margin='$12' justifyContent='center' alignItems='center'>
				<H6 margin='$4'>Please login to Spotify!</H6>
				<Login />
			</YStack>
		);
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack margin='$4' marginBottom='$0'>
				<Theme name={"purple"}>
					<MediaPlayer
						image={currentTrack?.item?.album.images}
						track={currentTrack?.item?.name}
						artist={currentTrack?.item?.artists.map(({ name }, index) => `${index > 0 ? ", " : ""}${name}`)}
						elevation='$2'
						pointerEvents='auto'
						alt='2'
						ffPress={nextSong}
						rrPress={prevSong}
					/>
				</Theme>
			</YStack>
			<H6 marginHorizontal='$6' marginBottom='$2'>
				Queue
			</H6>
			{!!hostQueue && (
				<FlatList
					data={hostQueue}
					keyExtractor={() => nanoid()}
					renderItem={({ item: { name, album, artists } }) => (
						<QueueItem name={name} artists={artists} image={album?.images} />
					)}
					contentContainerStyle={{ paddingBottom: 200 }}
				/>
			)}
		</SafeAreaView>
	);
};

export default ControlScreen;
