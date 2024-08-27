import { FlexContainer } from "components/styled/Containers.js";
import { DarkButton, IconButton } from "components/styled/Buttons";
import { useEffect, useState } from "react";
import SelectMood from "./SelectMood";
// import RecommendationsForm from "./forms/RecommendationsForm";
import MoodTracks from "./MoodTracks";
import { connect } from "react-redux";

import {
  fetchMoodTracks,
  fetchPlaylistRecommendationsSuccess,
  getRecommendations
} from "actions/recommendationActions";
import app from "config/app";
import { recommendationMoods } from "constants/recommendations";
import SelectPlaylist from "./SelectPlaylist";
import { SPOTIFY_API_BASE } from "constants/utils";
import { flatten, shuffle } from "lodash";
import { useFetchTop } from "helpers/suggestions";

const fetchPlaylistTracks = async (id, session) => {
  const href = `${SPOTIFY_API_BASE}/playlists/${id}?market=US`;
  const response = await fetch(href, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });
  const data = await response.json();

  if (data.error) {
    console.error(data.error);
    return null;
  }

  return data.tracks.items;
};

const Recommendations = props => {
  // const [addMood, setAddMood] = useState(false);
  const [activeSetting, setActiveSetting] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(false);
  const [activePlaylistIds, setActivePlaylistIds] = useState([]);
  const topArtists = useFetchTop(props.session, "artists");

  useEffect(() => {
    props.getMoodTracks();
  }, []);

  const { CURRENT_CLIENT } = app;
  const recommendationsMoodArray =
    recommendationMoods[CURRENT_CLIENT.split("-").join("")];

  const [createdMoods, setCreatedMoods] = useState(recommendationsMoodArray);

  const handleMoodToggle = id => {
    setActivePlaylist(false);
    const moodSet = createdMoods.map(setting => {
      if (setting.id === id) {
        setting.selected = true;
        setActiveSetting(setting);
      } else {
        setting.selected = false;
      }
      return setting;
    });
    setCreatedMoods(moodSet);
  };

  const fetchAllPlaylistTracks = async (playlistIds, session) => {
    try {
      const moodTracksPromises = await playlistIds.map(async id => {
        const tracks = await fetchPlaylistTracks(id, session);
        return tracks.map(({ track }) => track);
      });
      Promise.all(moodTracksPromises).then(responses => {
        const moodTracks = shuffle(
          flatten(responses).map(track => {
            const artists_names = track.artists.map(({ name }) => name);
            return { name: track.name, artists_names, uri: track.uri };
          })
        );
        props.setPlaylistTracks({ moodTracks });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecommendationFetch = () => {
    if (!activePlaylist) {
      props.fetchMyMoodTracks(activeSetting);
    } else {
      activePlaylistIds.length > 0 &&
        fetchAllPlaylistTracks(activePlaylistIds, props.session);
      //do something
    }
  };

  const handlePlaylistToggle = () => {
    setActivePlaylist(true);
    setActiveSetting(null);
  };

  const emitPlaylists = playlistIds => {
    setActivePlaylistIds(playlistIds);
  };

  return (
    <FlexContainer
      margin="16px 0"
      justify="center"
      direction="column"
      padding="0 32px 0 0"
    >
      {/* <FlexContainer
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0 15px 30px"
        mPadding="0px 10px"
      >
        {createdMoods.map(d => (
          <SelectMood key={d.title} {...d} toggleMood={handleMoodToggle} />
        ))}
      </FlexContainer> */}

      <FlexContainer
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0 15px"
        mPadding="0px 10px"
      >
        <SelectPlaylist
          selected={activePlaylist}
          toggleMood={handlePlaylistToggle}
          emitPlaylists={emitPlaylists}
          topArtists={topArtists}
        />
      </FlexContainer>
      <FlexContainer
        margin="10px 0"
        align="center"
        padding="0 15px 30px"
        mPadding="0px 10px"
        justify="center"
      >
        <DarkButton
          icon={true}
          type="submit"
          disabled={
            (!activeSetting && !activePlaylist) ||
            (activePlaylist && activePlaylistIds.length === 0)
          }
          isLoading={props.recommendations.isFetching}
          onClick={handleRecommendationFetch}
          size="large"
        >
          <img src="/static/animo.png" alt="Animo" title="Animo" />
          {!props.recommendations.isFetching
            ? "Generate Recommendations"
            : "Generating..."}
        </DarkButton>
      </FlexContainer>
      {props.recommendations.moodTracks.length > 0 &&
        !props.recommendations.isFetching && (
          <MoodTracks {...props.recommendations} playing={props.playing} />
        )}
      {props.recommendations.isFetching && (
        <div className="fa-3x">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      )}
      {/* {addMood && <RecommendationsForm session={props.session} />} */}
    </FlexContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchMyMoodTracks: setting => dispatch(fetchMoodTracks(setting)),
  getMoodTracks: () => dispatch(getRecommendations()),
  setPlaylistTracks: ({ moodTracks }) =>
    dispatch(fetchPlaylistRecommendationsSuccess({ moodTracks }))
});

const mapStateToProps = state => ({
  recommendations: state.recommendations,
  session: state.session
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
