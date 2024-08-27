import styled from "styled-components";

import {
  UserImageContainer,
  UserNameContainer,
  UserProfileWrapper
} from "./Profile";
import { ActionsBlock } from "./Library";
import { IconButton } from "./Buttons";
import { Artist } from "./Library";

const AlbumArt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 5px 10px #0f083c;
  width: 170px;
  height: 170px;

  img {
    width: 170px;
    height: auto;
  }

  ${props =>
    props.blank &&
    `
    width: 170px;
    height: 170px;
    background: #3d3378;
  `}

  @media screen and (max-width: 667px) {
    width: 80px;
    height: 80px;
    img {
      width: 80px;
    }
  }
`;

const NowPlayingWrapper = styled.div`
  background-color: #221a5a;
  color: #0f083c;
  min-height: 250px;
  height: auto;
  position: relative;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    background: linear-gradient(360deg, #fc6076 0%, #ffc745 100%);
    width: 10px;
    left: 0px;
    top: 0;
    height: 100%;
    position: absolute;
  }

  @media screen and (max-width: 667px) {
    min-height: 0;
    margin: 30px auto 0;
  }
`;

const NowPlayingDetails = styled.div`
  flex-grow: 1;
  display: block;
  overflow: hidden;
  h2,
  p,
  ${Artist} {
    line-height: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  h2 {
    font-size: 1.5rem;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    margin: 0 0 16px;
  }

  p,
  ${Artist} {
    font-size: 1.15rem;
    margin: 0 0 0 0;
  }

  @media screen and (max-width: 667px) {
    h2 {
      font-size: 0.8rem;
      margin: 0 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p,
    ${Artist} {
      font-size: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const NowPlayingDetailsWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${AlbumArt} {
    margin: 0 30px 0 0;
  }

  ${NowPlayingDetails} {
    width: calc(100% - 240px);
  }

  ${UserProfileWrapper} {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }

  ${ActionsBlock} {
    margin: 30px 0;
    justify-content: flex-start;
    overflow: visible;
  }

  @media screen and (max-width: 667px) {
    padding: 15px 15px 45px;

    ${UserProfileWrapper} {
      left: unset;
      right: 15px;
      bottom: 15px;
      ${UserImageContainer} {
        width: 25px;
        height: 25px;
        margin: 0 8px 0 0;
        img {
          width: 25px;
        }
      }
      ${UserNameContainer} {
        max-width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.7em;
      }
    }

    ${AlbumArt} {
      margin: 0 15px 0 0;
    }

    ${ActionsBlock} {
      align-items: center;
      padding: 0;
      position: absolute;
      margin: 0;
      right: 15px;
      top: 0;
      height: 100%;

      ${IconButton} {
        width: 50px;
        height: 50px;
      }
    }
  }
`;

const NowPlayingProgress = styled.div`
  bottom: 15px;
  height: 8px;
  position: absolute;
  width: 100%;
  padding: 0 30px;
  overflow: hidden;
  span {
    display: block;
    height: 100%;
    position: relative;
    background-color: #f5a6ff;
    border-radius: 4px;
    opacity: 0.5;
  }

  @media screen and (max-width: 667px) {
    height: 4px;
    bottom: 5px;
    padding: 0 15px;
  }
`;

export {
  NowPlayingWrapper,
  NowPlayingDetailsWrapper,
  NowPlayingDetails,
  NowPlayingProgress,
  AlbumArt
};
