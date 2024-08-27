import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import { queueTrack, queueRemoveTrack } from "../actions/queueActions";
import { FlexContainer, Block } from "./styled/Containers";
import { DarkButton } from "./styled/Buttons";
import { Cover, Name, Artist, TracklistHero } from "./styled/Library";

import { useFetchPlaylistTracks } from "../helpers/libraryHooks";
import { playlistSongItem } from "./LibraryItems";
import { FollowActions } from "./UserActions";

import Link from "next/link";
import { useAddToQueue } from "helpers/queueHooks";

const Tracklist = props => {
  const [queueArray, setQueueArray] = useState([]);

  const { QueueModal, queueAction, showAddQueueModal } = useAddToQueue(
    props.queueTrack
  );

  const removeTrack = id => {
    const track = find(props.queue, o => o.track.id === id);
    if (track) {
      props.queueRemoveTrack(track.id);
    }
  };

  useEffect(() => {
    const array = props.queue.map(o => o.track.id);
    setQueueArray(array);
    return () => {
      setQueueArray([]);
    };
  }, [props.queue]);

  const {
    isFetching,
    playlist,
    next,
    fetchMoreTracks,
    isLoadingMore
  } = useFetchPlaylistTracks(props.item, props.session);

  return (
    playlist && (
      <FlexContainer width="100%" direction="column" margin="0 0 30px 0">
        <Link href="/moodstream/library">
          <DarkButton icon={true}>
            <i className="fas fa-chevron-left"></i>
            Return
          </DarkButton>
        </Link>
        <TracklistHero
          width="100%"
          direction="row"
          margin="30px 0 15px 0"
          mMargin="30px auto 0"
        >
          <Cover url={playlist.images[0] ? playlist.images[0].url : ""} />
          <Block>
            <Name>{playlist.name}</Name>
            <Artist type="user">
              <i className="fab fa-spotify"></i>{" "}
              {playlist.owner.display_name || `user ${playlist.owner.id}`}
            </Artist>
            <p dangerouslySetInnerHTML={{ __html: playlist.description }} />
            <FollowActions
              session={props.session}
              item={props.item}
              type={"playlists"}
            ></FollowActions>
          </Block>
          <p className="tag">
            Playlist -
            {playlist.followers.total > 0 && (
              <>
                {" "}
                <i className="fas fa-users"></i> {playlist.followers.total} |{" "}
              </>
            )}
            <b>{`${playlist.tracks.total} Tracks`}</b>
          </p>
        </TracklistHero>
        <FlexContainer
          width="100%"
          direction="column"
          margin="0 0 30px 0"
          mPadding="30px 0 30px 0"
        >
          {!isFetching &&
            playlist.tracks &&
            playlist.tracks.items.map(({ track }, ind) =>
              playlistSongItem(track, ind, queueArray, queueAction, removeTrack)
            )}
          {(isFetching || isLoadingMore) && (
            <div className="fa-3x">
              <i className="fas fa-spinner fa-pulse"></i>
            </div>
          )}
          {!isLoadingMore && next && (
            <DarkButton
              style={{ textTransform: "capitalize" }}
              onClick={() => fetchMoreTracks()}
              margin="30px auto"
              mMargin="30px auto"
            >
              Load More Songs
            </DarkButton>
          )}
        </FlexContainer>
        {showAddQueueModal && <QueueModal />}
      </FlexContainer>
    )
  );
};

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id))
});

const mapStateToProps = state => ({
  search: state.search,
  library: state.library
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
