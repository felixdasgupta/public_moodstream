import {
  NowPlayingWrapper,
  NowPlayingDetails,
  NowPlayingDetailsWrapper,
  AlbumArt
} from "components/styled/NowPlaying";

import {
  UserProfileWrapper,
  UserImageContainer
} from "components/styled/Profile";

const NowPlayingPlaceholder = props => {
  return (
    <NowPlayingWrapper>
      <NowPlayingDetailsWrapper>
        <AlbumArt blank></AlbumArt>
        <NowPlayingDetails>
          <UserProfileWrapper>
            <UserImageContainer mini>
              <img
                src={"/static/user-icon.png"}
                alt="placeholder-person"
                title="placeholder-person"
              />
            </UserImageContainer>
          </UserProfileWrapper>
        </NowPlayingDetails>
      </NowPlayingDetailsWrapper>
    </NowPlayingWrapper>
  );
};

export default NowPlayingPlaceholder;
