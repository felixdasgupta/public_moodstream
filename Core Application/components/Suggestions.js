import { queueRemoveTrack, queueTrack } from "actions/queueActions";
import { useAddToQueue } from "helpers/queueHooks";
import { useFetchTop } from "helpers/suggestions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { artistItem } from "./LibraryItems";
import { searchSongItem } from "./ResultLibrary";
import { FlexContainer } from "./styled/Containers";
import { HorizontalSwipe } from "./styled/Library";

const Suggestions = ({ session, queueTrack, queueRemoveTrack, queue }) => {
  const [queueArray, setQueueArray] = useState([]);

  const topSongs = useFetchTop(session);
  const topArtists = useFetchTop(session, "artists");

  const { QueueModal, queueAction, showAddQueueModal } = useAddToQueue(
    queueTrack
  );

  const removeTrack = id => {
    const track = find(queue, o => o.track.id === id);
    if (track) {
      queueRemoveTrack(track.id);
    }
  };

  useEffect(() => {
    const array = queue.map(o => o.track.id);
    setQueueArray(array);
    return () => {
      setQueueArray([]);
    };
  }, [queue]);

  if (!session.user) return <></>;
  return (
    <FlexContainer direction="column" padding="0" mPadding="0">
      <FlexContainer padding="0" mPadding="0" direction="column">
        {!topArtists.isFetching &&
          topArtists.topObj &&
          topArtists.topObj?.items.length > 0 && (
            <>
              <h4>Artists</h4>
              <HorizontalSwipe direction="row">
                {topArtists.topObj?.items.map((item, ind) =>
                  artistItem(item, ind)
                )}
              </HorizontalSwipe>
            </>
          )}
        {topArtists.isFetching && (
          <div className="fa-3x">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        )}
      </FlexContainer>
      <FlexContainer direction="column" padding="0" mPadding="0">
        {!topSongs.isFetchingTop &&
          topSongs.topObj &&
          topSongs.topObj.items.length > 0 && (
            <>
              <h4>Songs</h4>
              <FlexContainer
                direction="row"
                justify="flex-start"
                wrap="wrap"
                padding="0"
                mPadding="0"
              >
                {topSongs.topObj.items.map((item, ind) =>
                  searchSongItem(
                    item,
                    ind,
                    queueArray,
                    queueAction,
                    removeTrack
                  )
                )}
              </FlexContainer>
            </>
          )}
        {topSongs.isFetchingTop && (
          <div className="fa-3x">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        )}
      </FlexContainer>
      {showAddQueueModal && <QueueModal />}
    </FlexContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id))
});

export default connect(null, mapDispatchToProps)(Suggestions);
