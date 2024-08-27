import { FlexContainer, Block } from "../styled/Containers";
import styled from "styled-components";
import { DarkButton, IconButton } from "../styled/Buttons";
import { connect } from "react-redux";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import { fetchQueue } from "actions/queueActions";
import { useEffect } from "react";
import Devices from "../Devices";
import {
  fetchAvailableDevices,
  transferPlaybackToDevice
} from "actions/devicesActions";

const ClientControlsHub = styled(FlexContainer)`
  background-color: transparent;
  color: #0f083c;
  min-height: 250px;
  height: auto;
  position: relative;
  width: 100%;
  padding: 0 10px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  p {
    margin: 0 0 15px;
  }

  ${DarkButton} {
    margin: 10px 0;
  }
`;
const PlaybackControls = styled(FlexContainer)`
  border-bottom: 1px solid #8780b3;
  ${IconButton} {
    margin: 0 8px;
  }
`;

const ClientControls = ({
  playing,
  session,
  users,
  spotify_user,
  fetchMyQueue,
  moodstreamDeviceId,
  transferPlaybackToDevice,
  playerState
}) => {
  const { player, isInitializing } = playing;

  useEffect(() => {
    fetchMyQueue();
  }, [spotify_user]);

  const togglePlayback = function() {
    if (moodstreamDeviceId) transferPlaybackToDevice(moodstreamDeviceId);
  };

  return (
    <ClientControlsHub
      justify="flex-start"
      align="flex-start"
      direction="column"
    >
      {isInitializing && (
        <div className="fa-3x">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      )}
      <Devices users={users} session={session} />
    </ClientControlsHub>
  );
};

const mapStateToProps = state => ({
  queue: state.queue,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchMyQueue: () => dispatch(fetchQueue()),
  transferPlaybackToDevice: deviceId =>
    dispatch(transferPlaybackToDevice(deviceId)),
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPageAuthRequired(ClientControls));
