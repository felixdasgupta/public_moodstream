import React, { useState, useEffect } from "react";
import { Block } from "./styled/Containers";
import { Artist } from "./styled/Library";
import Link from "next/link";

import {
  NowPlayingWrapper,
  NowPlayingDetails,
  NowPlayingDetailsWrapper,
  NowPlayingProgress,
  AlbumArt
} from "./styled/NowPlaying";

import {
  UserProfileWrapper,
  UserImageContainer,
  UserNameContainer
} from "./styled/Profile";
import { LikeActions } from "./UserActions";
import app from "config/app";

const NowPlaying = props => {
  const [start, setStart] = useState(Date.now());
  const [currentPosition, setCurrentPosition] = useState(
    props.playerState ? props.playerState.progressMs : 0
  );
  const [timer, setTimer] = useState(null);
  const { CURRENT_CLIENT } = app;

  const percentage =
    +((currentPosition * 100) / props.track.duration_ms).toFixed(2) + "%";
  const userName = props.user.display_name || props.user.id;

  useEffect(() => {
    const currentPosition = props.playerState
      ? props.playerState.progressMs
      : Date.now() - start + (props.position || 0);
    setStart(Date.now());
    setCurrentPosition(currentPosition);

    return () => {
      setStart(Date.now());
      setCurrentPosition(0);
    };
  }, [props]);

  useEffect(() => {
    return () => {
      setStart(Date.now());
      setCurrentPosition(0);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      setCurrentPosition(
        Date.now() -
          start +
          (props.playerState
            ? props.playerState.progressMs
            : props.position || 0)
      );
    };
    setTimer(setInterval(tick, 300));

    return () => {
      clearInterval(timer);
    };
  }, [start, currentPosition]);

  return (
    <NowPlayingWrapper>
      <NowPlayingDetailsWrapper>
        <AlbumArt>
          <img src={props.track.album.images[1].url || ""} />
        </AlbumArt>
        <NowPlayingDetails>
          <Block padding="10px 0 0" style={{ overflow: "hidden" }}>
            <h2>{props.track.name}</h2>
            {props.track.artists.map((a, ind) => (
              <Link
                href={{
                  pathname: "/moodstream/artists/[artist]",
                  query: { artist: a.id }
                }}
                key={`${props.track.name}-${a.name}-${new Date()}-${ind}`}
              >
                <Artist>
                  {a.name}
                  {ind < props.track.artists.length - 1 && ", "}
                </Artist>
              </Link>
            ))}
          </Block>
          <LikeActions
            margin="30px 0"
            session={props.session}
            item={props.track.id}
          ></LikeActions>
          {CURRENT_CLIENT != "hazy-haus" && (
            <UserProfileWrapper>
              <UserImageContainer mini>
                <img
                  src={
                    (props.user.images &&
                      props.user.images.length &&
                      props.user.images[0].url) ||
                    "/static/user-icon.png"
                  }
                  alt={userName}
                  title={userName}
                />
              </UserImageContainer>
              <UserNameContainer>
                <span>{userName}</span>
              </UserNameContainer>
            </UserProfileWrapper>
          )}
        </NowPlayingDetails>
      </NowPlayingDetailsWrapper>
      {props.playerState && props.playerState.isPlaying && (
        <NowPlayingProgress>
          <span style={{ width: percentage }}></span>
        </NowPlayingProgress>
      )}
    </NowPlayingWrapper>
  );
};

export default NowPlaying;
