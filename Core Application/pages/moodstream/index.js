import React, { useEffect, useState } from "react";
import Layout from "components/MyLayout.js";
import { fetchQueue } from "actions/queueActions";
import { fetchUsers } from "actions/usersActions";
import { fetchPlayingContext } from "actions/playbackActions";
import Queue from "components/Queue";
import AddToQueue from "components/AddToQueue";
import { FlexContainer } from "components/styled/Containers.js";
import { DarkButton } from "components/styled/Buttons";
import { TabContainer, TabBody, TabHeader, Tab } from "components/styled/Tabs";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "store/store";
import { saveTaggedSong } from "actions/libraryActions";
import { getRecommendations } from "actions/recommendationActions";
import { MoodSelected } from "@/components/MoodSelected";
import Suggestions from "@/components/Suggestions";

const Main = props => {
  const [currentTab, setCurrentTab] = useState("queue");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayingContext());
    dispatch(fetchQueue());
    dispatch(getRecommendations());
  }, []);

  const tabSelection = tab => {
    switch (tab) {
      case "queue": {
        return (
          <>
            {props.session.user !== null && (
              <FlexContainer
                margin="16px 0"
                mMargin="16px 0"
                justify="flex-end"
                mJustify="flex-end"
                align="flex-end"
                mAlign="flex-end"
                mPadding="0 0 0 0"
              >
                <Link href="/moodstream/library">
                  <DarkButton margin="0 0 16px 0" icon={true}>
                    <i className="fab fa-spotify"></i>
                    Access My Library
                  </DarkButton>
                </Link>
              </FlexContainer>
            )}
            {props.session.user !== null && <AddToQueue />}
            <Queue
              items={props.queue}
              session={props.session}
              allowRemoval={false}
            />
            <hr />
          </>
        );
      }
      case "suggestions": {
        return <Suggestions session={props.session} queue={props.queue} />;
      }
      default: {
        return "";
      }
    }
  };

  return (
    <Layout playing={props.playing} session={props.session}>
      <MoodSelected recommendations={props.recommendations} />
      {props.session.user !== null && (
        <FlexContainer
          justify="space-between"
          padding="0 40px"
          mPadding="0 16px 32px"
          width="100vw"
          mWrap="wrap"
        >
          <TabContainer>
            <TabHeader>
              <Tab
                onClick={() => setCurrentTab("queue")}
                active={currentTab === "queue"}
              >
                <h3>Queue</h3>
              </Tab>
              {props.session.user !== null && (
                <Tab
                  onClick={() => setCurrentTab("suggestions")}
                  active={currentTab === "suggestions"}
                >
                  <h3>Suggestions</h3>
                </Tab>
              )}
            </TabHeader>

            <TabBody>{tabSelection(currentTab)}</TabBody>
          </TabContainer>
        </FlexContainer>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  store.dispatch(fetchUsers());
  store.dispatch(fetchPlayingContext());
  store.dispatch(fetchQueue());
  store.dispatch(getRecommendations());
});

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session,
  recommendations: state.recommendations
});

const mapDispatchToProps = dispatch => ({
  fetchMyQueue: () => dispatch(fetchQueue()),
  fetchMyUsers: () => dispatch(fetchUsers()),
  getRoomMood: () => dispatch(getRecommendations()),
  saveSong: song_uri => dispatch(saveTaggedSong(song_uri))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
