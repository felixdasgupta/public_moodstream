import React, { useState } from "react";
import Layout from "components/MyLayout.js";
import { fetchQueue } from "actions/queueActions";
import { fetchUsers } from "actions/usersActions";
import { fetchPlayingContext } from "actions/playbackActions";
import { connect } from "react-redux";
import { wrapper } from "store/store";
import { moodGem } from "helpers/moodGemHooks";
import { GemBlock, GemDetails } from "components/styled/Mood";
import { Block, FlexContainer } from "@/components/styled/Containers";
import { moodGemDictionary } from "constants/utils";
import Accordian from "@/components/general/Accordian";

const MoodGems = props => {
  return (
    <Layout playing={props.playing} session={props.session}>
      <FlexContainer
        width="100%"
        direction="column"
        padding="0 32px"
        mPadding="0 16px 32px"
      >
        <h1>Get to know your Mood</h1>
        <h4>What are Mood Gems?</h4>
        <p>
          Mood gems are the building blocks of each song. They determine how and
          what you feel while listening to a song. Some songs make you smile and
          dance, others help you get in a focused flow. Moods are unique to you
          and your experience with music. Animo will harness these moods to
          build a fully personalized listening experience that works just for
          you.
        </p>
      </FlexContainer>
      <FlexContainer
        width="100%"
        direction="column"
        padding="0 32px"
        margin="16px 0 32px"
        mMargin="16px 0 32px"
      >
        {moodGemDictionary.map(({ description, name, tags }) => (
          <Accordian description={description} key={`${name}-accordian`}>
            <FlexContainer align="center">
              <GemBlock>{moodGem(name)}</GemBlock>
              <GemDetails>
                <h2>{name}</h2>
                <p>
                  {tags.map((tag, ind) =>
                    ind < tags.length - 1 ? `${tag}, ` : `${tag}`
                  )}
                </p>
              </GemDetails>
            </FlexContainer>
          </Accordian>
        ))}
      </FlexContainer>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  store.dispatch(fetchUsers());
  store.dispatch(fetchPlayingContext());
  store.dispatch(fetchQueue());
});

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchMyQueue: () => dispatch(fetchQueue()),
  fetchMyUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(MoodGems);
