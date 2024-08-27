import { FastForward, Pause, Rewind } from "@tamagui/lucide-icons";
import React, { memo, useMemo } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
	Button,
	Card,
	CardProps,
	Image,
	Paragraph,
	Separator,
	SizableText,
	Square,
	Theme,
	ThemeName,
	XStack,
	YStack,
	YStackProps,
} from "tamagui";

export const MediaPlayer = memo(
	(
		props: YStackProps & {
			alt?: number | null;
			onHoverSection?: (name: string) => void;
			playPress?: () => void;
			ffPress?: () => void;
			rrPress?: () => void;
			pointerEventsControls?: any;
			image?: any | null;
			artist?: string | null;
			track?: string | null;
		}
	) => {
		const {
			theme,
			alt,
			image,
			artist,
			track,
			onHoverSection,
			pointerEvents,
			pointerEventsControls,
			playPress,
			ffPress,
			rrPress,
			...cardProps
		} = props;
		const tint = !alt ? null : (`alt${alt}` as ThemeName);

		return (
			<YStack display='flex' alignItems='stretch' contain='strict' minWidth={330} minHeight={222}>
				<Theme name={tint}>
					<YStack
						overflow='visible'
						borderWidth={1}
						borderColor='$borderColor'
						backgroundColor='$color1'
						br='$7'
						pointerEvents={pointerEvents}
						p={0}
						ai='stretch'
						mb={40}
						{...cardProps}
					>
						<XStack ai='center' p='$4' space='$5' overflow='hidden'>
							<Square backgroundColor={!image && Colors.light} pos='relative' ov='hidden' br='$6' size='$8'>
								{image && <Image source={{ uri: image[0].url, width: 90, height: 90 }} />}
							</Square>

							<YStack als='center' y={-3} miw={165} jc='center'>
								<Paragraph fontWeight='700'>{track}</Paragraph>
								<Paragraph color='$color11' size='$3'>
									{artist}
								</Paragraph>
							</YStack>
						</XStack>

						<Separator mb={-1} />

						<XStack
							zi={1000}
							w='100%'
							px='$6'
							py='$4'
							bc='$backgroundHover'
							bbrr={17}
							bblr={17}
							ai='center'
							space='$5'
							jc='center'
							pointerEvents={pointerEvents}
						>
							<Rewind size={20} onPress={rrPress} />
							<Button
								bordered
								hoverStyle={{
									elevation: "$6",
									scale: 1.025,
								}}
								my='$-7'
								icon={Pause}
								size='$8'
								circular
								elevation='$2'
								accessibilityLabel='Pause'
								pointerEvents={pointerEventsControls}
								onPress={playPress}
							/>
							<FastForward onPress={ffPress} size={20} />
						</XStack>
					</YStack>
				</Theme>
			</YStack>
		);
	}
);
