import Header from "./Header";
import NowPlaying from "./NowPlaying";
import { LayoutContainer } from "./styled/Layout.js";
import useWindowDimensions from "utils/useWindowDimensions";
import useMobileDetect from "utils/useMobileDetect";
import MobileHeader from "./mobile/MobileHeader";
import { useState } from "react";
import SideNav from "./SideNav";
import SpotifyLogin from "./SpotifyLogin";
import { SpotifyLoginWrapper } from "./styled/Home";
import NowPlayingPlaceholder from "./placeholders/NowPlayingPlaceholder";
import { FlexContainer } from "./styled/Containers";
import { useUser } from "@auth0/nextjs-auth0";
import ClientLayout from "./clients/ClientLayout";
import app from "config/app";

const Layout = props => {
  let { isMobile } = useMobileDetect();
  let { width } = useWindowDimensions();

  const { CURRENT_CLIENT } = app;

  const [showNav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!showNav);
  };

  const renderHeader = client => {
    switch (client) {
      case "coppa": {
        return (
          <>
            <h1 style={{ margin: "0 0 5px" }}>Welcome to Coppa Coffee</h1>
          </>
        );
      }
      case "hazy-haus": {
        return (
          <>
            <h1 style={{ margin: "0 0 5px" }}>Welcome to Hazy Haus</h1>
          </>
        );
      }
      default:
        break;
    }
  };

  const { user } = useUser();
  if (user) return <ClientLayout {...props} />;

  return (
    <LayoutContainer>
      {width <= 667 || isMobile() ? (
        <MobileHeader onNavToggle={toggleNav} />
      ) : (
        <Header onNavToggle={toggleNav} />
      )}
      <FlexContainer
        padding="30px"
        justify="center"
        align="center"
        width="100%"
      >
        {props.playing.track ? (
          <NowPlaying
            session={props.session}
            track={props.playing.track}
            user={props.playing.user}
            position={props.playing.position}
          />
        ) : (
          <NowPlayingPlaceholder />
        )}
      </FlexContainer>
      {!props.session.user && (
        <SpotifyLoginWrapper
          justify="center"
          align="center"
          width="100%"
          mWrap="wrap"
          direction="column"
        >
          {renderHeader(CURRENT_CLIENT)}
          <h2 style={{ margin: "0 0 15px" }}>
            Connect to <span className="spotify">Spotify</span> to unlock the
            following features:
          </h2>
          <ul>
            <li>Queue & Play your favorite songs</li>
            <li>
              Discover the song that's currently playing, add to your library.
            </li>
            <li>Explore your Spotify music collections</li>
            <li>
              On sign in, your music preferences may impact the current mood
              station
            </li>
          </ul>
          <SpotifyLogin></SpotifyLogin>
        </SpotifyLoginWrapper>
      )}
      {props.session.user && <div>{props.children}</div>}
      {showNav && <SideNav onNavToggle={toggleNav} />}
    </LayoutContainer>
  );
};

export default Layout;
