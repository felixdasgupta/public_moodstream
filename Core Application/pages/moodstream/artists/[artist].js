import React from "react";
import Layout from "components/MyLayout.js";
import { connect } from "react-redux";
import { wrapper } from "store/store";
import { fetchQueue } from "actions/queueActions";
import { fetchUsers } from "actions/usersActions";
import { fetchPlayingContext } from "actions/playbackActions";

import Artist from "components/Artist";

import { Block, FlexContainer } from "components/styled/Containers.js";
import Link from "next/link";
import { IconButton } from "components/styled/Buttons";

import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

const ArtistView = props => {
  const { query } = useRouter();
  const { artist } = query;

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
        {artist && (
          <Artist queue={props.queue} session={props.session} item={artist} />
        )}
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

export default connect(mapStateToProps, null)(ArtistView);
