import { Modal } from "@/components/general/Modal";
import { MoodSelected } from "@/components/MoodSelected";
import { Button } from "@/components/styled/Buttons";
import { Block } from "@/components/styled/Containers";
import {
  ArtistBlock,
  Artist,
  Cover,
  ExplicitTag,
  Name,
  SongRow
} from "@/components/styled/Library";
import { useUser } from "@auth0/nextjs-auth0";
import { fetchQueue } from "actions/queueActions";
import { getRecommendations } from "actions/recommendationActions";
import { voteUp } from "actions/voteActions";
import { includes, intersection, uniq } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ga from "utils/googleAnalytics";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const hrefGetTrack = `${SPOTIFY_API_BASE}/tracks`;
const hrefGetArtists = `${SPOTIFY_API_BASE}/artists`;

const listOfUnwantedGenres = [
  "hard rock",
  "metal",
  "old school thrash",
  "thrash metal",
  "dubstep",
  "filthstep",
  "alternative metal",
  "connecticut hardcore",
  "hardcore",
  "melodic metalcore",
  "metalcore",
  "nu metal"
];

const requestTrackEvent = (text, moods, id) => {
  const currentMood = moods.length > 0 ? moods.join("-").toString() : "None";
  ga.event({
    action: text,
    params: {
      current_mood: currentMood,
      song_id: id
    }
  });
};

export const useAddToQueue = queueTrack => {
  const [showAddQueueModal, setShowAddQueueModal] = useState(false);
  const [songToQueue, setSongToQueue] = useState("");
  const [songDetails, setSongDetails] = useState(null);
  const [fetchingSongDetails, setFetchingSongDetails] = useState(false);
  const [genres, setGenres] = useState([]);
  const [fetchingGenres, setFetchingGenres] = useState(false);
  const [unableToRequest, setUnableToRequest] = useState(false);
  const [queueArray, setQueueArray] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendations());
    dispatch(fetchQueue());
  }, []);

  const {
    recommendations,
    session: { access_token },
    queue
  } = useSelector(state => state);

  useEffect(() => {
    const array = queue.map(o => o.track.id);
    setQueueArray(array);
    return () => {
      setQueueArray([]);
    };
  }, [queue]);

  useEffect(() => {
    if (songToQueue) {
      setFetchingSongDetails(true);
      fetch(`${hrefGetTrack}/${songToQueue}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            console.error(r.error);
            setFetchingSongDetails(false);
          } else {
            setSongDetails(r);
            setFetchingSongDetails(false);
          }
        })
        .catch(err => setFetchingSongDetails(false));
    } else {
      setSongDetails(null);
    }

    return () => {
      setSongDetails(null);
    };
  }, [songToQueue]);

  useEffect(() => {
    if (songDetails != null) {
      setFetchingGenres(true);
      const { artists } = songDetails;
      const artist_ids = artists.map(artist => artist.id);
      const queryString = new URLSearchParams({
        ids: artist_ids
      }).toString();
      fetch(`${hrefGetArtists}?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            console.error(r.error);
            setFetchingGenres(false);
          } else {
            const genres = uniq(r.artists.map(artist => artist.genres).flat());
            //console.log(genres, "Artist Genres");
            setGenres(genres);
            setFetchingGenres(false);
          }
        })
        .catch(err => {
          console.error(err);
          setFetchingGenres(false);
        });
    } else {
      setGenres([]);
    }

    return () => {
      setGenres([]);
    };
  }, [songDetails]);

  useEffect(() => {
    if (genres.length > 0 && recommendations.moods.length > 0) {
      const doesItPermit = intersection(genres, listOfUnwantedGenres);
      if (doesItPermit.length > 0) {
        setUnableToRequest(true);
      }
    }
  }, [genres]);

  let queueAction = () => {};
  const { user } = useUser();

  const closeModal = () => {
    if (unableToRequest) {
      requestTrackEvent("song_rejected", recommendations.moods, songToQueue);
    } else {
      requestTrackEvent("closed_request", recommendations.moods, songToQueue);
    }
    setSongToQueue("");
    setShowAddQueueModal(false);
    setUnableToRequest(false);
  };

  const userQueueAction = () => {
    requestTrackEvent(
      "song_added_to_queue",
      recommendations.moods,
      songToQueue
    );
    if (!includes(queueArray, songToQueue)) {
      queueTrack(songToQueue);
    } else {
      const songInQueue = queue.find(({ track }) => track.id === songToQueue);
      songInQueue && dispatch(voteUp(songInQueue.id));
    }
    closeModal();
  };

  if (!user) {
    queueAction = id => {
      // logic to see how many queues are in track
      requestTrackEvent("song_requested", recommendations.moods, id);
      setShowAddQueueModal(true);
      setSongToQueue(id);
    };
  } else {
    queueAction = queueTrack;
  }

  const QueueModal = () => (
    <Modal handleClose={closeModal}>
      {!unableToRequest ? (
        <>
          <h4>Request a Song</h4>
          <p>
            You can only request songs that fit the mood of the venue. If your
            song matches the mood, it will be added to the queue.
          </p>
        </>
      ) : (
        <>
          <h4>Uh-oh! Your song doesn’t match the mood.</h4>
          <p>
            Sorry this song does not match the mood in this venue. Try to
            request a song that matches the mood.
          </p>
        </>
      )}

      <MoodSelected recommendations={recommendations} />
      <SongRow
        type="queue"
        width="auto"
        margin="0 auto 8px"
        mMargin="0 auto 8px"
        justify="center"
      >
        {fetchingSongDetails && (
          <div className="fa-3x">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        )}
        {songDetails != null && (
          <>
            <Cover
              url={
                songDetails.album.images[2]
                  ? songDetails.album.images[2].url
                  : ""
              }
            >
              {songDetails.explicit && <ExplicitTag>Explicit</ExplicitTag>}
            </Cover>
            <Block width="auto">
              <Name>{songDetails.name}</Name>
              <ArtistBlock>
                {songDetails.artists.map((a, ind) => (
                  <Artist
                    key={`${songDetails.name}-${a.name}-${new Date()}-${ind}`}
                  >
                    {a.name}
                    {ind < songDetails.artists.length - 1 && ", "}
                  </Artist>
                ))}
              </ArtistBlock>
            </Block>
          </>
        )}
      </SongRow>
      <Button
        isLoading={fetchingGenres}
        borderColor="#EBE8FF"
        textColor="#EBE8FF"
        hoverColor="transparent"
        onClick={() =>
          !unableToRequest ? userQueueAction(songToQueue) : closeModal()
        }
      >
        {!unableToRequest ? "Add To Queue" : "Try Again"}
      </Button>
    </Modal>
  );

  return {
    QueueModal,
    queueAction,
    showAddQueueModal
  };
};
