import React, { useState } from "react";
import { connect } from "react-redux";

import { searchTracks, searchTracksReset } from "../actions/searchActions";
import { queueTrack } from "../actions/queueActions";

import {
  SearchResultsInput,
  SearchResultsList,
  ResultItem,
  AlbumImage,
  SongName,
  ArtistName,
  SongDetails
} from "./styled/Queue";

import { FlexContainer, Block } from "./styled/Containers";
import { useAddToQueue } from "helpers/queueHooks";

const ResultsList = props => {
  const { results, focus } = props;
  return (
    <SearchResultsList>
      {results.tracks &&
        results.tracks.items.map((r, index) => {
          const isFocused = focus === index;
          const className = isFocused ? "focused" : "";
          return (
            <ResultItem
              key={r.id}
              className={className}
              onClick={() => props.onSelect(r.id)}
            >
              <FlexContainer justify="space-between" align="center">
                <AlbumImage>
                  <img src={r.album.images[2].url || ""} />
                </AlbumImage>
                <SongDetails>
                  <SongName>{r.name}</SongName>
                  <ArtistName>{r.artists[0].name}</ArtistName>
                </SongDetails>
              </FlexContainer>
            </ResultItem>
          );
        })}
    </SearchResultsList>
  );
};

const AddToQueue = props => {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(-1);

  const { QueueModal, queueAction, showAddQueueModal } = useAddToQueue(
    props.queueTrack
  );

  const handleChange = e => {
    const text = e.target.value;
    setText(text);
    if (text !== "") {
      props.searchTracks(text);
    } else {
      setFocus(-1);
      props.searchTracksReset();
    }
  };

  const handleSelectElement = id => {
    setText("");
    queueAction(id);
    props.searchTracksReset();
  };

  const handleFocus = e => {
    if (e.target.value !== "") {
      props.searchTracks(e.target.value);
    }
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 38: // up
        setFocus(focus - 1);
        break;
      case 40: // down
        setFocus(focus + 1);
        break;
      case 13: {
        let correct = false;
        if (focus !== -1) {
          const { items } = props.search.results.tracks || null;
          if (items === null) return;
          queueAction(items[focus].id);
          correct = true;
        } else {
          const text = e.target.value.trim();
          if (text.length !== 0) {
            queueAction(text);
            correct = true;
          }
        }
        if (correct) {
          setText("");
          props.searchTracksReset();
          setFocus(-1);
        }
        break;
      }
    }
  };

  const results = props.search.results;

  return (
    <FlexContainer
      margin="16px 0"
      mPadding="0 0"
      mMargin="16px 0"
      direction="column"
    >
      <SearchResultsInput
        className="fa"
        type="text"
        placeholder="&#xF002;  Search for a new song"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {results && (
        <ResultsList
          results={results}
          onSelect={handleSelectElement}
          focus={focus}
        />
      )}
      {showAddQueueModal && <QueueModal />}
    </FlexContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  searchTracks: query => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset())
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
