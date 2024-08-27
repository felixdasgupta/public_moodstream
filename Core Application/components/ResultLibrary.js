import { playlistItem, artistItem } from "./LibraryItems";
import { FlexContainer, Block } from "./styled/Containers";
import { HorizontalSwipe } from "./styled/Library";
import {
  Cover,
  Name,
  Artist,
  ArtistBlock,
  SongRow,
  ActionsBlock,
  ExplicitTag,
  AlbumWrapper
} from "./styled/Library";
import { IconButton } from "./styled/Buttons";
import { includes } from "lodash";
import Link from "next/link";

export const searchAlbumItem = (item, num) => (
  <AlbumWrapper
    width="auto"
    direction="column"
    margin="0 0 30px 0"
    mMargin="15px auto 45px"
    key={`${item.name}-${new Date()}-${num}`}
  >
    <Link
      href={{
        pathname: "/moodstream/albums/[album]",
        query: { album: item.id }
      }}
    >
      <Cover url={item.images[0] ? item.images[0].url : ""}>
        {item.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover>
    </Link>
    <Block>
      <Name>{item.name}</Name>
      <ArtistBlock>
        {item.artists.map((a, ind) => (
          <Link
            href={{
              pathname: "/moodstream/artists/[artist]",
              query: { artist: a.id }
            }}
            key={`${item.name}-${a.name}-${new Date()}-${ind}`}
          >
            <Artist>
              {a.name}
              {ind < item.artists.length - 1 && ", "}
            </Artist>
          </Link>
        ))}
      </ArtistBlock>
    </Block>
  </AlbumWrapper>
);

export const searchSongItem = (track, num, queueArray, add, remove) => {
  return (
    <SongRow key={`${track.name}-${new Date()}-${num}`}>
      <ActionsBlock>
        {includes(queueArray, track.id) ? (
          <IconButton
            borderColor="#bd10e0"
            textColor="#bd10e0"
            bgColor="#ebe8ff"
            onClick={() => remove(track.id)}
          >
            <i className="fas fa-minus" aria-hidden="true"></i>
          </IconButton>
        ) : (
          <IconButton onClick={() => add(track.id)}>
            <i className="fas fa-plus" aria-hidden="true"></i>
          </IconButton>
        )}
      </ActionsBlock>
      <Cover url={track.album.images[0] ? track.album.images[0].url : ""}>
        {track.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover>
      <Block>
        <Name>{track.name}</Name>
        <ArtistBlock>
          {track.artists.map((a, ind) => (
            <Link
              href={{
                pathname: "/moodstream/artists/[artist]",
                query: { artist: a.id }
              }}
              key={`${track.name}-${a.name}-${new Date()}-${ind}`}
            >
              <Artist key={`${track.name}-${a.name}-${new Date()}-${ind}`}>
                {a.name}
                {ind < track.artists.length - 1 && ", "}
              </Artist>
            </Link>
          ))}
        </ArtistBlock>
      </Block>
    </SongRow>
  );
};

const ResultsLibrary = props => {
  const { albums, artists, playlists, tracks } = props.results;
  return (
    <FlexContainer direction="column" width="100%" mPadding="0 0 0 0">
      {artists && artists.items.length > 0 && (
        <>
          <h4>Artists</h4>
          <HorizontalSwipe direction="row">
            {artists.items.map((item, ind) => artistItem(item, ind))}
          </HorizontalSwipe>
        </>
      )}
      {playlists && playlists.items.length > 0 && (
        <>
          <h4>Playlists</h4>
          <HorizontalSwipe direction="row">
            {playlists.items.map((item, ind) => playlistItem(item, ind))}
          </HorizontalSwipe>
        </>
      )}
      {albums && albums.items.length > 0 && (
        <>
          <h4>Albums</h4>
          <HorizontalSwipe direction="row">
            {albums.items.map((item, ind) => searchAlbumItem(item, ind))}
          </HorizontalSwipe>
        </>
      )}
      {tracks && tracks.items.length > 0 && (
        <>
          <h4>Songs</h4>
          <FlexContainer
            direction="row"
            justify="flex-start"
            wrap="wrap"
            mPadding="0 0 0 0"
          >
            {tracks.items.map((item, ind) =>
              searchSongItem(
                item,
                ind,
                props.queue,
                props.addSong,
                props.removeSong
              )
            )}
          </FlexContainer>
        </>
      )}
    </FlexContainer>
  );
};

export default ResultsLibrary;
