import React, { useEffect } from "react";
import { connect } from "react-redux";

import QueueItem from "./QueueItem";
import { queueRemoveTrack } from "../actions/queueActions";
import { voteUp } from "../actions/voteActions";
import { QueueWrapper } from "./styled/Queue";
import { fetchQueue } from "actions/queueActions";
import { FlexContainer } from "./styled/Containers";

const Queue = ({
  items,
  session,
  queueRemoveTrack,
  fetchQueue,
  allowRemoval,
  styling,
  voteUp
}) => {
  useEffect(() => {
    fetchQueue();
  }, [session]);

  return (
    <FlexContainer direction="column" mPadding="0 0 0 0" style={styling}>
      {items && items.length === 0 ? (
        <p>The queue seems to be empty, add a song or refresh the queue.</p>
      ) : (
        <QueueWrapper width="100%" direction="column" margin="0 0 30px 0">
          {items.map((i, index) => (
            <QueueItem
              item={i}
              session={session}
              index={index}
              key={index}
              onRemoveItem={() => queueRemoveTrack(i.id)}
              allowRemoval={allowRemoval}
              voteUp={() => voteUp(i.id)}
            />
          ))}
        </QueueWrapper>
      )}
    </FlexContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  voteUp: id => dispatch(voteUp(id)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id)),
  fetchQueue: () => dispatch(fetchQueue)
});

const mapStateToProps = state => ({
  queue: state.queue
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
