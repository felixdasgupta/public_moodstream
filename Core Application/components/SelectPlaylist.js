import { useEffect, useState } from "react";
import { SelectMoodWrapper } from "./styled/Recommendations";
import {
  AlbumImage,
  ResultItem,
  SearchResultsInput,
  SearchResultsList,
  SongDetails,
  SongName
} from "./styled/Queue";
import { useDispatch, useSelector } from "react-redux";
import { searchSpotify, searchSpotifyReset } from "actions/searchActions";
import { Block, FlexContainer } from "./styled/Containers";
import { Button, DarkButton, IconButton } from "./styled/Buttons";
import { Cover, HorizontalSwipe, Name } from "./styled/Library";
// import TagMood from "./TagMood";
// import { useMoodTagging } from "helpers/moodGemHooks";
import {
  fetchPlaylists
  // fetchTaggedSongs
} from "actions/libraryActions";
import styled from "styled-components";
import { sampleSize, uniq } from "lodash";

const defaultGenres = [
  "chill",
  "r&b",
  "hip hop",
  "rap",
  "deep house",
  "trap",
  "edm"
];

const FavoritePlaylistWrapper = styled(FlexContainer)`
  &.range {
    border-bottom: 2px solid #8780b3;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    justify-content: flex-start;
    ${FlexContainer} {
      width: 25%;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  justify-content: center;
  align-items: center;

  ${FlexContainer} {
    padding: 14px;
    width: auto;
    align-items: center;
    justify-content: center;

    &.active {
      opacity: 1;

      ${Cover} {
        opacity: 1;
        border: 2px solid #8780b3;
        &:after {
          opacity: 0;
        }
      }
    }

    ${IconButton} {
      opacity: 1;
      position: absolute;
      left: -5px;
      top: -5px;
    }

    ${Cover} {
      width: 80px;
      height: 80px;
      margin: 0;
    }

    ${Name} {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 80px;
      margin: 5px 0 0;
    }
  }
`;

const playlistItem = (
  item,
  num,
  triggerRemove = () => {},
  triggerSelect = () => {},
  activeClass = true
) => (
  <FlexContainer
    direction="column"
    margin="0 0 15px 0"
    mMargin="15px auto 0"
    mAlign="center"
    key={`${item.name}-${new Date()}-${num}`}
    mDirection="column"
    className={activeClass && "active"}
    style={{ overflow: "visible" }}
  >
    <Cover
      onClick={() => triggerSelect(item)}
      url={item.images[0] ? item.images[0].url : ""}
    />
    <Name>{item.name}</Name>
    {triggerRemove !== null && (
      <IconButton
        onClick={() => triggerRemove(item.id)}
        borderColor="#bd10e0"
        textColor="#bd10e0"
        bgColor="#ebe8ff"
      >
        <i className="fas fa-times"></i>
      </IconButton>
    )}
  </FlexContainer>
);

const PlaylistsResultsList = ({ playlists, onSelect, focus }) => {
  return (
    <SearchResultsList>
      {playlists &&
        playlists.map((r, index) => {
          const isFocused = focus === index;
          const className = isFocused ? "focused" : "";
          return (
            <ResultItem
              key={r.id}
              className={className}
              onClick={() => onSelect(r)}
            >
              <FlexContainer justify="space-between" align="center">
                <AlbumImage>
                  <img src={r.images[0]?.url || ""} />
                </AlbumImage>
                <SongDetails>
                  <SongName>{r.name}</SongName>
                </SongDetails>
              </FlexContainer>
            </ResultItem>
          );
        })}
    </SearchResultsList>
  );
};

const SelectPlaylist = ({
  selected,
  toggleMood,
  emitPlaylists,
  topArtists,
  emitMoods
}) => {
  const [searchPlaylists, setSearchPlaylists] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState([]);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [quickSelect, setQuickSelect] = useState(defaultGenres);

  const dispatch = useDispatch();
  const {
    search,
    library: { playlists: myPlaylists }
  } = useSelector(state => state);

  // const { gemChanged, moodGems, updateGems } = useMoodTagging({
  //   happiness: true,
  //   chill: true
  // });

  useEffect(() => {
    if (topArtists?.topObj?.items) {
      setQuickSelect(prevState => {
        const allArtistNames = topArtists?.topObj?.items.map(d => d.name);
        return uniq([...prevState, ...allArtistNames]);
      });
    }
  }, [topArtists]);

  useEffect(() => {
    dispatch(fetchPlaylists());
    return () => dispatch(searchSpotifyReset());
  }, []);

  useEffect(() => {
    const { results } = search;
    if (results?.playlists) {
      const {
        playlists: { items }
      } = results;
      setSearchPlaylists(items ?? []);
    }
  }, [search.results]);

  useEffect(() => {
    activePlaylist.length > 0 && emitPlaylists(activePlaylist.map(r => r.id));
  }, [activePlaylist]);

  const handleChange = e => {
    const text = e.target.value;
    setText(text);
    if (text !== "") {
      dispatch(
        searchSpotify(text, {
          limit: "10",
          type: "playlist"
        })
      );
      setIsSearching(true);
    } else {
      setFocus(-1);
      setIsSearching(false);
      dispatch(searchSpotifyReset());
    }
  };

  const quickSelectHandler = name => {
    setText(name);
    if (name !== "") {
      dispatch(
        searchSpotify(name, {
          limit: "10",
          type: "playlist"
        })
      );
      setIsSearching(true);
    } else {
      setFocus(-1);
      setIsSearching(false);
      dispatch(searchSpotifyReset());
    }
  };

  const handleSelectElement = playlist => {
    setText("");
    activePlaylist.length < 3 &&
      !activePlaylist.find(({ id }) => id === playlist.id) &&
      setActivePlaylist([...activePlaylist, playlist]);
    searchSpotifyReset();
    setIsSearching(false);
  };

  const randomSelectGen = () => {
    if (!myPlaylists) return;
    const randPlaylists = sampleSize(myPlaylists, 3);
    setActivePlaylist(randPlaylists);
    setText("");
    searchSpotifyReset();
    setIsSearching(false);
  };

  const handleFocus = e => {
    if (e.target.value !== "") {
      dispatch(
        searchSpotify(e.target.value, {
          limit: "10",
          type: "playlist"
        })
      );
    }
  };

  const stopSearch = () => {
    setText("");
    dispatch(searchSpotifyReset());
    setFocus(-1);
    setIsSearching(false);
  };

  const toggleSelect = function() {
    toggleMood("playlist");
  };

  const removePlaylistById = id => {
    let updatePlaylist = activePlaylist.filter(playlist => playlist.id !== id);
    setActivePlaylist(updatePlaylist);
  };

  return (
    <SelectMoodWrapper
      type="playlist"
      onClick={toggleSelect}
      className={selected && "active"}
    >
      <Block
        style={{ display: "flex", justifyContent: "flex-end" }}
        margin="15px 0 30px"
        className="action"
      >
        <Button btnType="client" icon={true} onClick={randomSelectGen}>
          <i className="fas fa-random"></i>
          Random Playlist Select
        </Button>
      </Block>
      <h3>Choose 3 Playlists to Create a Station</h3>
      <FlexContainer
        direction="row"
        align="center"
        margin="40px 0 0"
        mMargin="40px 0 0"
        wrap="wrap"
      >
        <p>Quick Search Terms:</p>
        <HorizontalSwipe className="actions">
          {quickSelect.map((name, ind) => (
            <Button
              margin="0 10px 0 0"
              key={`${name}-${ind}`}
              onClick={() => quickSelectHandler(name)}
              style={{ whiteSpace: "nowrap", width: "auto", minWidth: "unset" }}
              bgColor="transparent"
              textColor="#fff"
              borderColor="#fff"
              hoverTextColor="#0f083c"
            >
              {name}
            </Button>
          ))}
        </HorizontalSwipe>
      </FlexContainer>
      <FlexContainer
        direction="row"
        align="center"
        margin="10px 0 12px"
        mMargin="10px 0 12px"
      >
        <SearchResultsInput
          className="fa"
          placeholder="&#xF002; Search Spotify"
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={activePlaylist.length > 2}
        />
        {text && (
          <Block margin="0 0 0 15px" mMargin="15px 0 0 0">
            <DarkButton icon={true} onClick={() => stopSearch()}>
              <i className="fas fa-times"></i>
              Clear Search
            </DarkButton>
          </Block>
        )}
      </FlexContainer>
      {isSearching && searchPlaylists && (
        <PlaylistsResultsList
          playlists={searchPlaylists}
          onSelect={handleSelectElement}
          focus={focus}
        />
      )}
      {!isSearching && (
        <>
          <p>Playlists You Follow:</p>
          {myPlaylists.length > 0 && (
            <FavoritePlaylistWrapper
              className="range"
              width="auto"
              direction="row"
              margin="0 0 30px 0"
              mMargin="15px auto"
              mAlign="center"
              mDirection="row"
              wrap="wrap"
            >
              {myPlaylists.map((item, ind) =>
                playlistItem(
                  item,
                  ind,
                  null,
                  handleSelectElement,
                  !!activePlaylist.find(playlist => playlist.id === item.id)
                )
              )}
            </FavoritePlaylistWrapper>
          )}
        </>
      )}
      <FlexContainer
        direction="column"
        justify="center"
        align="center"
        padding="30px"
      >
        {activePlaylist.length > 0 && (
          <FavoritePlaylistWrapper
            direction="row"
            margin="0 0 15px 0"
            mMargin="15px auto"
            mAlign="center"
            mDirection="row"
            wrap="nowrap"
          >
            {activePlaylist.map((item, ind) =>
              playlistItem(item, ind, removePlaylistById)
            )}
          </FavoritePlaylistWrapper>
        )}
        <Block className="count">
          <span>{activePlaylist.length}/3 Playlists Selected</span>
        </Block>
      </FlexContainer>
    </SelectMoodWrapper>
  );
};

export default SelectPlaylist;
