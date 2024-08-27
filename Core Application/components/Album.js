import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import { queueTrack, queueRemoveTrack } from "../actions/queueActions";
import { FlexContainer, Block } from "./styled/Containers";
import { DarkButton } from "./styled/Buttons";

import { Cover, Name, Artist, TracklistHero } from "./styled/Library";

import { useFetchAlbumTracks } from "../helpers/libraryHooks";
import { albumSongItem } from "./LibraryItems";
import { FollowActions } from "./UserActions";

import Link from "next/link";
import { useAddToQueue } from "helpers/queueHooks";

const Album = props => {
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

  const { isFetching, album } = useFetchAlbumTracks(props.item, props.session);

  return (
    album && (
      <FlexContainer width="100%" direction="column" margin="30px 0 30px 0">
        <Link href="/moodstream/library">
          <DarkButton icon={true}>
            <i className="fas fa-chevron-left"></i>
            Back to Library
          </DarkButton>
        </Link>
        <TracklistHero
          width="100%"
          direction="row"
          margin="30px 0 15px 0"
          mMargin="30px auto 0"
        >
          <Cover url={album.images[0] ? album.images[0].url : ""} />
          <Block>
            <Name>{album.name}</Name>
            <Block>
              {album.artists.map((a, ind) => {
                return (
                  <Link
                    key={`${album.name}-${a.name}-${new Date()}-${ind}`}
                    href={{
                      pathname: "/moodstream/artists/[artist]",
                      query: { artist: a.id }
                    }}
                  >
                    <Artist>
                      {a.name}
                      {ind < album.artists.length - 1 && ", "}
                    </Artist>
                  </Link>
                );
              })}
            </Block>
            <FollowActions
              session={props.session}
              item={props.item}
              type={"albums"}
            ></FollowActions>
          </Block>
          <p className="tag">
            Album - <b> {album.release_date} </b>
          </p>
        </TracklistHero>
        <FlexContainer
          width="100%"
          direction="column"
          margin="0 0 30px 0"
          mPadding="30px 0 30px 0"
        >
          {!isFetching &&
            album.tracks &&
            album.tracks.items.map((track, ind) => {
              const imageUrl = album.images[0] ? album.images[0].url : "";
              return albumSongItem(
                track,
                ind,
                imageUrl,
                queueArray,
                queueAction,
                removeTrack
              );
            })}
          {isFetching && (
            <div className="fa-3x">
              <i className="fas fa-spinner fa-pulse"></i>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Album);
