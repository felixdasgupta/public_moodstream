import { FlexContainer, Block } from "./styled/Containers";
import {
  Cover,
  Name,
  DateAdded,
  Artist,
  ArtistCover,
  ArtistBand,
  SongRow,
  ActionsBlock,
  ArtistBlock,
  ExplicitTag,
  AlbumWrapper,
  MoodGemBlock
} from "./styled/Library";
import { IconButton } from "./styled/Buttons";
import { includes } from "lodash";
import Moment from "react-moment";
import Link from "next/link";
import { GemBlock } from "./styled/Mood";
import { moodGem } from "helpers/moodGemHooks";

const playlistItem = (item, num) => (
  <FlexContainer
    width="auto"
    direction="column"
    margin="0 0 30px 0"
    mMargin="15px auto"
    mAlign="center"
    key={`${item.name}-${new Date()}-${num}`}
    mDirection="row"
  >
    <Link
      href={{
        pathname: "/moodstream/playlists/[playlist]",
        query: { playlist: item.id }
      }}
    >
      <Cover url={item.images[0] ? item.images[0].url : ""} />
    </Link>
    <Name>{item.name}</Name>
  </FlexContainer>
);

const albumItem = ({ added_at, album }, num) => (
  <AlbumWrapper
    width="auto"
    direction="column"
    margin="0 0 30px 0"
    mMargin="15px auto"
    mAlign="center"
    mDirection="row"
    key={`${album.name}-${new Date()}-${num}`}
  >
    <Link
      href={{
        pathname: "/moodstream/albums/[album]",
        query: { album: album.id }
      }}
    >
      <Cover url={album.images[0] ? album.images[0].url : ""}>
        {album.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover>
    </Link>
    <Block>
      <Name>{album.name}</Name>
      <ArtistBlock>
        {album.artists.map((a, ind) => (
          <Link
            href={{
              pathname: "/moodstream/artists/[artist]",
              query: { artist: a.id }
            }}
            key={`${album.name}-${a.name}-${new Date()}-${ind}`}
          >
            <Artist>
              {a.name}
              {ind < album.artists.length - 1 && ", "}
            </Artist>
          </Link>
        ))}
      </ArtistBlock>
      <DateAdded>
        <i className="fas fa-clock" aria-hidden="true"></i>
        <Moment fromNow>{added_at}</Moment>
      </DateAdded>
    </Block>
  </AlbumWrapper>
);

const simpleAlbumItem = (album, num) => (
  <AlbumWrapper
    width="auto"
    direction="column"
    margin="0 0 30px 0"
    mMargin="15px auto"
    mAlign="center"
    mDirection="row"
    key={`${album.name}-${new Date()}-${num}`}
  >
    <Link
      href={{
        pathname: "/moodstream/albums/[album]",
        query: { album: album.id }
      }}
    >
      <Cover url={album.images[0] ? album.images[0].url : ""}>
        {album.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover>
    </Link>
    <Block>
      <Name>{album.name}</Name>
      <ArtistBlock>
        {album.artists.map((a, ind) => (
          <Link
            href={{
              pathname: "/moodstream/artists/[artist]",
              query: { artist: a.id }
            }}
            key={`${album.name}-${a.name}-${new Date()}-${ind}`}
          >
            <Artist>
              {a.name}
              {ind < album.artists.length - 1 && ", "}
            </Artist>
          </Link>
        ))}
      </ArtistBlock>
    </Block>
  </AlbumWrapper>
);

const taggedSongsItem = (
  { song, mood, date_created },
  num,
  queueArray,
  queueTrack,
  removeTrack
) => {
  return (
    <SongRow key={`${song.name}-${new Date()}-${num}`}>
      <ActionsBlock>
        {includes(queueArray, song.id) ? (
          <IconButton
            borderColor="#bd10e0"
            textColor="#bd10e0"
            bgColor="#ebe8ff"
            onClick={() => removeTrack(song.id)}
          >
            <i className="fas fa-minus" aria-hidden="true"></i>
          </IconButton>
        ) : (
          <IconButton onClick={() => queueTrack(song.id)}>
            <i className="fas fa-plus" aria-hidden="true"></i>
          </IconButton>
        )}
      </ActionsBlock>
      {/* <Cover url={song.album.images[0] ? song.album.images[0].url : ""}>
        {song.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover> */}
      <Block>
        <Name>{song.name}</Name>
        {/* <ArtistBlock>
          {song.artists.map((a, ind) => (
            <Link
              href={{
                pathname: "/moodstream/artists/[artist]",
                query: { artist: a.id }
              }}
              key={`${song.name}-${a.name}-${new Date()}-${ind}`}
            >
              <Artist>
                {a.name}
                {ind < song.artists.length - 1 && ", "}
              </Artist>
            </Link>
          ))}
        </ArtistBlock> */}
        <MoodGemBlock>
          {Object.keys(mood).map(gem => {
            if (mood[gem]) {
              return (
                <GemBlock key={gem}>{moodGem(gem.toLowerCase())}</GemBlock>
              );
            }
          })}
        </MoodGemBlock>
      </Block>
      <DateAdded>
        <i className="fas fa-clock" aria-hidden="true"></i>
        <Moment fromNow>{date_created}</Moment>
      </DateAdded>
    </SongRow>
  );
};

const songItem = ({ added_at, track }, num, queueArray, add, remove) => {
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
              <Artist>
                {a.name}
                {ind < track.artists.length - 1 && ", "}
              </Artist>
            </Link>
          ))}
        </ArtistBlock>
      </Block>
      <DateAdded>
        <i className="fas fa-clock" aria-hidden="true"></i>
        <Moment fromNow>{added_at}</Moment>
      </DateAdded>
    </SongRow>
  );
};

const artistItem = (item, num) => (
  <FlexContainer
    width="auto"
    direction="column"
    margin="0 0 30px 0"
    mMargin="15px auto"
    mAlign="center"
    key={`${item.name}-${new Date()}-${num}`}
  >
    <Link
      href={{
        pathname: "/moodstream/artists/[artist]",
        query: { artist: item.id }
      }}
    >
      <ArtistCover url={item.images[0] ? item.images[0].url : ""}>
        <ArtistBand>
          <Artist>{item.name}</Artist>
        </ArtistBand>
      </ArtistCover>
    </Link>
  </FlexContainer>
);

const albumSongItem = (track, num, albumImage, queueArray, add, remove) => {
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
      <Cover url={albumImage || ""}>
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
              <Artist>
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

const playlistSongItem = (track, num, queueArray, add, remove) => {
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
              <Artist>
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

export {
  playlistItem,
  albumItem,
  taggedSongsItem,
  songItem,
  artistItem,
  albumSongItem,
  simpleAlbumItem,
  playlistSongItem
};
