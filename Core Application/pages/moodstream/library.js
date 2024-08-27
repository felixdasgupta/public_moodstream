import React, { useEffect } from "react";
import Layout from "components/MyLayout.js";
import { fetchQueue } from "actions/queueActions";
import { fetchUsers } from "actions/usersActions";
import { fetchPlayingContext } from "actions/playbackActions";
import {
  fetchPlaylists,
  fetchArtists,
  fetchAlbums,
  fetchSongs
  // fetchTaggedSongs
} from "actions/libraryActions";
import { connect } from "react-redux";
import { wrapper } from "store/store";

import Library from "components/Library";

import { Block, FlexContainer } from "components/styled/Containers.js";
import Link from "next/link";
import { IconButton } from "components/styled/Buttons";
import { useUser } from "@auth0/nextjs-auth0";

const LibraryView = props => {
  useEffect(() => {
    if (props.session.user !== null) props.fetchAllContent();
  }, [props.session.user]);

  const { user } = useUser();

  return (
    <Layout playing={props.playing} session={props.session}>
      <FlexContainer
        justify="space-between"
        padding="0 40px"
        width="100vw"
        mWrap="wrap"
        margin="20px 0 0"
        mPadding="0 0 0 0"
        mMargin="10px 0"
      >
        <Link href={user ? "/clients/room" : "/moodstream"}>
          <IconButton
            size="large"
            bgColor="#ebe8ff"
            hoverColor="#f5a6ff"
            mMargin="10px auto"
          >
            <i className="fas fa-home"></i>
          </IconButton>
        </Link>
      </FlexContainer>
      <FlexContainer
        justify="space-between"
        padding="0 40px"
        width="100vw"
        mWrap="wrap"
        mPadding="0 0 0 0"
      >
        <Block width="100%" mWidth="100%" margin="20px 0 30px">
          <Library
            queue={props.queue}
            session={props.session}
            library={props.library}
          />
        </Block>
      </FlexContainer>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchAllContent: () => {
    dispatch(fetchPlaylists());
    dispatch(fetchArtists());
    dispatch(fetchSongs());
    dispatch(fetchAlbums());
    // dispatch(fetchTaggedSongs());
  }
});

export const getServerSideProps = wrapper.getServerSideProps(store => {
  store.dispatch(fetchQueue());
  store.dispatch(fetchUsers());
  store.dispatch(fetchPlayingContext());
});

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session,
  library: state.library
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryView);
