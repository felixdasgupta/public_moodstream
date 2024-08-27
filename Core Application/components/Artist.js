import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import { queueTrack, queueRemoveTrack } from "../actions/queueActions";
import { FlexContainer, Block } from "./styled/Containers";
import { DarkButton } from "./styled/Buttons";

import { useFetchArtistTracks } from "../helpers/libraryHooks";

import { artistItem, simpleAlbumItem, playlistSongItem } from "./LibraryItems";

import {
  ArtistCover,
  Name,
  HorizontalSwipe,
  ArtistHero,
  Tag,
  GenreBlock
} from "./styled/Library";

import Link from "next/link";
import { FollowActions } from "./UserActions";
import { useAddToQueue } from "helpers/queueHooks";

const ArtistView = props => {
  const [queueArray, setQueueArray] = useState([]);
  const removeTrack = id => {
    const track = find(props.queue, o => o.track.id === id);
    if (track) {
      props.queueRemoveTrack(track.id);
    }
  };

  const { QueueModal, queueAction, showAddQueueModal } = useAddToQueue(
    props.queueTrack
  );

  useEffect(() => {
    const array = props.queue.map(o => o.track.id);
    setQueueArray(array);
    return () => {
      setQueueArray([]);
    };
  }, [props.queue]);

  const {
    relatedArtists,
    topTracks,
    albums,
    artist: { artist, isFetchingArtist }
  } = useFetchArtistTracks(props.item, props.session);

  return (
    artist &&
    !isFetchingArtist && (
      <FlexContainer
        width="calc(100% - 60px)"
        direction="column"
        margin="30px 0 30px 0"
        mMargin="0px auto 30px"
      >
        <Link href="/moodstream/library">
          <DarkButton icon={true}>
            <i className="fas fa-chevron-left"></i>
            Return To Library
          </DarkButton>
        </Link>
        <ArtistHero
          direction="row"
          margin="30px 0 15px 0"
          mMargin="30px auto 0"
        >
          <ArtistCover url={artist.images[0] ? artist.images[0].url : ""} />
          <Block>
            <Name>{artist.name}</Name>
            {artist.genres.length > 0 && (
              <GenreBlock>
                {artist.genres.map(genre => (
                  <Tag key={genre}>{genre}</Tag>
                ))}
              </GenreBlock>
            )}
            <FollowActions
              session={props.session}
              item={props.item}
              type={"artists"}
            ></FollowActions>
          </Block>
          <p className="tag">
            Artist - <i className="fas fa-users"></i>{" "}
            {artist.followers.total > 0 ? artist.followers.total : `< 1000`}{" "}
            fans
          </p>
        </ArtistHero>
        <FlexContainer width="100%" direction="column" margin="0 0 30px 0">
          <h4>Related Artists</h4>
          <HorizontalSwipe width="100%">
            {!relatedArtists.isFetchingRelatedArtists &&
              relatedArtists.relatedArtists &&
              relatedArtists.relatedArtists.map((item, ind) =>
                artistItem(item, ind)
              )}
            {relatedArtists.isFetchingRelatedArtists && (
              <div className="fa-3x">
                <i className="fas fa-spinner fa-pulse"></i>
              </div>
            )}
          </HorizontalSwipe>
          <h4>Top Tracks</h4>
          <Block width="100%">
            {!topTracks.isFetchingTracks &&
              topTracks.tracks &&
              topTracks.tracks.map((track, ind) =>
                playlistSongItem(
                  track,
                  ind,
                  queueArray,
                  queueAction,
                  removeTrack
                )
              )}
            {topTracks.isFetchingTracks && (
              <div className="fa-3x">
                <i className="fas fa-spinner fa-pulse"></i>
              </div>
            )}
          </Block>
          <h4>Artist Albums</h4>
          <FlexContainer
            width="100%"
            wrap="wrap"
            mMargin="0 0 0 0"
            mPadding="0 0 0 0"
          >
            {!albums.isFetchingAlbums &&
              albums.albums &&
              albums.albums.map((album, ind) => simpleAlbumItem(album, ind))}
          </FlexContainer>
          {(albums.isFetchingTracks || albums.isLoadingMoreAlbums) && (
            <div className="fa-3x">
              <i className="fas fa-spinner fa-pulse"></i>
            </div>
          )}
          {albums.nextAlbum && !albums.isLoadingMoreAlbums && (
            <DarkButton
              style={{ textTransform: "capitalize" }}
              onClick={() => albums.fetchMoreAlbums()}
              margin="30px auto"
              mMargin="30px auto"
            >
              Load More Albums
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistView);
