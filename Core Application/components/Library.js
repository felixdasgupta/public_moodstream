import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { find } from "lodash";

import { searchSpotify, searchSpotifyReset } from "../actions/searchActions";
import { queueTrack, queueRemoveTrack } from "../actions/queueActions";
import {
  fetchPlaylists,
  fetchArtists,
  fetchAlbums,
  fetchSongs
} from "../actions/libraryActions";

import { SearchResultsInput } from "./styled/Queue";
import { FlexContainer, Block } from "./styled/Containers";
import { DarkButton } from "./styled/Buttons";
import { TabContainer, TabHeader, Tab } from "../components/styled/Tabs";

import { NoResultsLibrary } from "./NoResultsLibrary";
import {
  playlistItem,
  albumItem,
  songItem,
  artistItem,
  taggedSongsItem
} from "./LibraryItems";
import ResultsLibrary from "./ResultLibrary";
import { useAddToQueue } from "helpers/queueHooks";

const Library = props => {
  const [text, setText] = useState(props.text || "");
  const [isSearching, setIsSearching] = useState(false);
  const [focus, setFocus] = useState(-1);
  const [typeLibrary, setTypeLibrary] = useState("songs");
  const [queueArray, setQueueArray] = useState([]);
  const { QueueModal, queueAction, showAddQueueModal } = useAddToQueue(
    props.queueTrack
  );

  const handleChange = e => {
    const text = e.target.value;
    setText(text);
    if (text !== "") {
      props.searchSpotify(text, {
        limit: "10",
        type: "track,artist,album,playlist"
      });
      setIsSearching(true);
    } else {
      setFocus(-1);
      setIsSearching(false);
      props.searchSpotifyReset();
    }
  };

  useEffect(() => {
    return () => props.searchSpotifyReset();
  }, []);

  useEffect(() => {
    const array = props.queue.map(o => o.track.id);
    setQueueArray(array);
    return () => {
      setQueueArray([]);
    };
  }, [props.queue]);

  const handleFocus = e => {
    if (e.target.value !== "") {
      props.searchSpotify(e.target.value, {
        limit: "10",
        type: "track,artist,album,playlist"
      });
    }
  };

  const handleLoadMore = type => {
    switch (type) {
      case "songs": {
        props.mySongs(props.library.nextSong);
        break;
      }
      case "albums": {
        props.myAlbums(props.library.nextAlbum);
        break;
      }
      case "playlists": {
        props.myPlaylists(props.library.nextPlaylist);
        break;
      }
      case "artists": {
        props.myArtists(props.library.nextArtist);
        break;
      }
      default: {
        break;
      }
    }
  };

  const ifLoadable = type => {
    switch (type) {
      case "songs": {
        return props.library.nextSong && !props.library.isFetchingSongs;
      }
      case "albums": {
        return props.library.nextAlbum && !props.library.isFetchingAlbums;
      }
      case "playlists": {
        return props.library.nextPlaylist && !props.library.isFetchingPlaylists;
      }
      case "artists": {
        return props.library.nextArtist && !props.library.isFetchingArtists;
      }
      default: {
        return false;
      }
    }
  };

  const ifLoading = type => {
    switch (type) {
      case "songs": {
        return props.library.isFetchingSongs;
      }
      case "albums": {
        return props.library.isFetchingAlbums;
      }
      case "playlists": {
        return props.library.isFetchingPlaylists;
      }
      case "artists": {
        return props.library.isFetchingArtists;
      }
      default: {
        return false;
      }
    }
  };

  const showLibrary = type => {
    switch (type) {
      case "tagged": {
        if (!props.library.tagged) return <NoResultsLibrary type="tagged" />;
        return props.library.tagged.map((item, ind) =>
          taggedSongsItem(item, ind, queueArray, queueAction, removeTrack)
        );
      }
      case "songs": {
        if (props.library.songs.length === 0 && !props.library.isFetchingSongs)
          return <NoResultsLibrary type="songs" />;
        return props.library.songs.map((item, ind) =>
          songItem(item, ind, queueArray, queueAction, removeTrack)
        );
      }
      case "albums": {
        if (
          props.library.albums.length === 0 &&
          !props.library.isFetchingAlbums
        )
          return <NoResultsLibrary type="albums" />;
        return props.library.albums.map((item, ind) => albumItem(item, ind));
      }
      case "playlists": {
        if (
          props.library.playlists.length === 0 &&
          !props.library.isFetchingPlaylists
        )
          return <NoResultsLibrary type="playlists" />;
        return props.library.playlists.map((item, ind) =>
          playlistItem(item, ind)
        );
      }
      case "artists": {
        if (
          props.library.artists.length === 0 &&
          !props.library.isFetchingArtists
        )
          return <NoResultsLibrary type="artists" />;
        return props.library.artists.map((item, ind) => artistItem(item, ind));
      }
      default: {
        break;
      }
    }
  };

  const stopSearch = () => {
    setText("");
    props.searchSpotifyReset();
    setFocus(-1);
    setIsSearching(false);
  };

  const removeTrack = id => {
    const track = find(props.queue, o => o.track.id === id);
    if (track) {
      props.queueRemoveTrack(track.id);
    }
  };

  return (
    <FlexContainer direction="column" mPadding="0 0">
      <FlexContainer direction="column" mPadding="0 0">
        <FlexContainer direction="row" align="center">
          <SearchResultsInput
            placeholder={"Search Spotify"}
            value={text}
            onChange={handleChange}
            onFocus={handleFocus}
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
        <FlexContainer></FlexContainer>
      </FlexContainer>
      {isSearching ? (
        <FlexContainer
          direction="column"
          margin="15px 0"
          mAlign="center"
          mPadding="30px 10px"
          style={{ minHeight: "60vh" }}
        >
          <h3>Search Results</h3>
          {props.search.results && (
            <ResultsLibrary
              results={props.search.results}
              queue={queueArray}
              addSong={queueAction}
              removeSong={removeTrack}
            />
          )}
        </FlexContainer>
      ) : (
        <FlexContainer direction="column" margin="15px 0" mPadding="0 10px">
          <TabContainer>
            <h3>My Library</h3>
            <TabHeader>
              {/* <Tab
                onClick={() => setTypeLibrary("tagged")}
                active={typeLibrary === "tagged"}
              >
                <h3>Mood Songs</h3>
              </Tab> */}
              <Tab
                onClick={() => setTypeLibrary("songs")}
                active={typeLibrary === "songs"}
              >
                <h3>Songs</h3>
              </Tab>
              <Tab
                onClick={() => setTypeLibrary("playlists")}
                active={typeLibrary === "playlists"}
              >
                <h3>Playlists</h3>
              </Tab>
              <Tab
                onClick={() => setTypeLibrary("artists")}
                active={typeLibrary === "artists"}
              >
                <h3>Artists</h3>
              </Tab>
              <Tab
                onClick={() => setTypeLibrary("albums")}
                active={typeLibrary === "albums"}
              >
                <h3>Albums</h3>
              </Tab>
            </TabHeader>
          </TabContainer>
          <FlexContainer
            margin="30px 0"
            direction="row"
            justify="flex-start"
            mPadding="30px 0px"
            wrap="wrap"
          >
            {showLibrary(typeLibrary)}
          </FlexContainer>
          <FlexContainer
            margin="0 0"
            direction="row"
            justify="center"
            align="center"
          >
            {ifLoadable(typeLibrary) && (
              <DarkButton
                style={{ textTransform: "capitalize" }}
                onClick={() => handleLoadMore(typeLibrary)}
                mMargin="0px 0px 30px"
              >
                Load More {typeLibrary}
              </DarkButton>
            )}
            {ifLoading(typeLibrary) && (
              <div className="fa-3x">
                <i className="fas fa-spinner fa-pulse"></i>
              </div>
            )}
          </FlexContainer>
        </FlexContainer>
      )}
      {showAddQueueModal && <QueueModal />}
    </FlexContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id)),
  searchSpotify: (query, options) => dispatch(searchSpotify(query, options)),
  searchSpotifyReset: () => dispatch(searchSpotifyReset()),
  myPlaylists: url => dispatch(fetchPlaylists(url)),
  myArtists: url => dispatch(fetchArtists(url)),
  mySongs: url => dispatch(fetchSongs(url)),
  myAlbums: url => dispatch(fetchAlbums(url))
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
