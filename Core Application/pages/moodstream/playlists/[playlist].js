import React from "react";
import Layout from "components/MyLayout.js";
import { fetchQueue } from "actions/queueActions";
import { fetchUsers } from "actions/usersActions";
import { fetchPlayingContext } from "actions/playbackActions";
import { connect } from "react-redux";
import { wrapper } from "store/store";

import Playlist from "components/Playlist";

import { Block, FlexContainer } from "components/styled/Containers.js";
import Link from "next/link";
import { IconButton } from "components/styled/Buttons";

import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

const PlaylistView = props => {
  const { query } = useRouter();
  const { playlist } = query;

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
          {playlist && (
            <Playlist
              queue={props.queue}
              session={props.session}
              item={playlist}
            />
          )}
        </Block>
      </FlexContainer>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  store.dispatch(fetchQueue());
  store.dispatch(fetchUsers());
  store.dispatch(fetchPlayingContext());
});

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

export default connect(mapStateToProps, null)(PlaylistView);
