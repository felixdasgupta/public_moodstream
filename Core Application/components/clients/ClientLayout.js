import ClientHeader from "./ClientHeader";
import NowPlaying from "components/NowPlaying";
import NowPlayingPlaceholder from "components/placeholders/NowPlayingPlaceholder";
import { LayoutContainer } from "components/styled/Layout.js";
import useWindowDimensions from "utils/useWindowDimensions";
import ClientMobileHeader from "components/mobile/ClientMobileHeader";
import SpotifyLogin from "../SpotifyLogin";
import { SpotifyLoginWrapper } from "../styled/Home";
import { Block, FlexContainer } from "../styled/Containers";
import ClientControls from "./ClientControls";
import { useSpotifyPlayer } from "helpers/playerHooks";
import { useUser } from "@auth0/nextjs-auth0";
import { connect } from "react-redux";
import {
  fetchAvailableDevices,
  transferPlaybackToDevice
} from "actions/devicesActions";
import { useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

const ClientLayout = props => {
  let { width } = useWindowDimensions();

  const { user } = useUser();

  const { playerState, moodstreamDeviceId } = useSpotifyPlayer(
    props.transferPlaybackToDevice,
    props.fetchAvailableDevices,
    props.playing.player
  );

  const pixelBlock = useRef(null);

  useEffect(() => {
    var noSleep = new NoSleep();
    document.addEventListener(
      "click",
      function enableNoSleep() {
        document.removeEventListener("click", enableNoSleep, false);
        noSleep.enable();
      },
      false
    );

    return () => {
      noSleep.disable();
    };
  }, []);

  useEffect(() => {
    if (pixelBlock != null) {
      pixelBlock.current.click();
    }
  }, [pixelBlock]);

  return (
    <LayoutContainer>
      {width <= 568 ? <ClientMobileHeader /> : <ClientHeader />}
      <FlexContainer
        padding="30px"
        justify="space-between"
        align="flex-start"
        width="100%"
      >
        <Block width="65%">
          {props.playing.track ? (
            <NowPlaying
              session={props.session}
              track={props.playing.track}
              user={props.playing.user}
              position={props.playing.position}
              playerState={playerState}
            />
          ) : (
            <NowPlayingPlaceholder />
          )}
        </Block>
        <Block width="30%">
          <ClientControls
            playing={props.playing}
            session={props.session}
            user={props.playing.user}
            playerState={playerState}
            moodstreamDeviceId={moodstreamDeviceId}
          />
        </Block>
        <Block ref={pixelBlock} className="pixel"></Block>
      </FlexContainer>
      {!props.session.user && (
        <SpotifyLoginWrapper
          padding="30px"
          direction="column"
          width="100%"
          justify="center"
          align="center"
        >
          <h4>Please login in order to access all features</h4>
          <SpotifyLogin />
        </SpotifyLoginWrapper>
      )}
      {props.session.user && <div>{props.children}</div>}
    </LayoutContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  transferPlaybackToDevice: deviceId =>
    dispatch(transferPlaybackToDevice(deviceId)),
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index))
});

export default connect(null, mapDispatchToProps)(ClientLayout);
