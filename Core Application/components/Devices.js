import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { DarkButton, Button } from "./styled/Buttons";

import { DeviceWrapper, DeviceIcon, DeviceActions } from "./styled/Devices";

import {
  fetchAvailableDevices,
  setRepeat,
  transferPlaybackToDevice
} from "../actions/devicesActions";
import { setPlayer } from "actions/playbackActions";
import { getIsFetchingDevices } from "../reducers";
import { getDevices } from "../reducers";
import { Block, FlexContainer } from "./styled/Containers";
import { useUser } from "@auth0/nextjs-auth0";
import { wrapper } from "store/store";
import { useRouter } from "next/router";

const Devices = ({
  devices,
  isFetching,
  fetchAvailableDevices,
  transferPlaybackToDevice,
  users,
  session,
  playing: { player, track, startTime },
  configurePlayer
}) => {
  const [userFetched, setUserFetched] = useState(false);
  const [currentTab, setCurrentTab] = useState("spotify");
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAvailableDevices();
  }, [session, users]);

  useEffect(() => {
    if (devices.length > 0 && user) {
      const activeDevice = devices.find(item => item.is_active);
      if (activeDevice) dispatch(setRepeat("off", activeDevice?.id));
    }
  }, [devices, user]);

  const setupSpotifyPlayer = () => {
    if (!window.Spotify || !window.onSpotifyWebPlaybackSDKReady) return;
    configurePlayer();
  };

  const deviceTypeIcon = type => {
    switch (type) {
      case "Smartphone":
        return <i className="fas fa-mobile"></i>;
      case "Computer":
        return <i className="fas fa-desktop"></i>;
      default:
        return <i className="fas fa-drum-steelpan"></i>;
    }
  };

  const myDeviceList = type => {
    switch (type) {
      case "spotify": {
        if (devices.length === 0)
          return (
            <p>
              Oh no! The list of devices is empty, no devices were found. Open
              Spotify first on any of your personal devices.
            </p>
          );
        else if (devices.length > 0)
          return (
            <>
              {devices.map((device, num) => (
                <FlexContainer key={device.id}>
                  <Block>
                    {device.is_active ? (
                      <Button bgColor="#CCCAE6" icon={true} noClick={true}>
                        <i className="fas fa-check"></i>
                        Active
                      </Button>
                    ) : (
                      <DarkButton
                        icon={true}
                        onClick={() => {
                          transferPlaybackToDevice(device.id);
                          fetchAvailableDevices();
                        }}
                      >
                        <i className="fas fa-play-circle"></i>
                        Transfer
                      </DarkButton>
                    )}
                  </Block>
                  <DeviceIcon>
                    <span>{device.name}</span>
                    {deviceTypeIcon(device.type)}
                  </DeviceIcon>
                </FlexContainer>
              ))}
            </>
          );
        break;
      }
      default: {
        return (
          <p>Oh no! The list of devices is empty, no devices were found.</p>
        );
      }
    }
  };

  return (
    <FlexContainer direction="column" align="flex-end" margin="0">
      <DeviceWrapper direction="column">
        {myDeviceList(currentTab)}
      </DeviceWrapper>
      <DeviceActions justify="space-between" margin="10px 0 0">
        {/* {player === null && currentTab === "spotify" && (
              <Button
                icon={true}
                disabled={isFetching}
                onClick={() => {
                  setupSpotifyPlayer();
                }}
                btnType="client"
              >
                <i className="fab fa-spotify"></i>
                Create Spotify Player
              </Button>
            )} */}
        <Button
          icon={true}
          disabled={isFetching}
          onClick={() => {
            router.reload(window.location.pathname);
          }}
          btnType="client"
        >
          <i className="fab fa-spotify"></i>
          Refresh Stream
        </Button>
      </DeviceActions>
    </FlexContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  store.dispatch(fetchAvailableDevices());
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId =>
    dispatch(transferPlaybackToDevice(deviceId)),
  configurePlayer: () => dispatch(setPlayer(0.8, `animo-moodstream`))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state),
  playing: state.playback
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
