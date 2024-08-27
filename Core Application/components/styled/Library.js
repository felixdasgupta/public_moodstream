import styled from "styled-components";

import { FlexContainer, Block } from "./Containers";
import { IconButton } from "./Buttons";

import { UserImageContainer } from "./Profile";
import { GemBlock } from "./Mood";

const ExplicitTag = styled.span`
  color: #ff0844;
  border: 1px solid #ff0844;
  width: auto;
  padding: 2px 5px;
  font-size: 0.8em;
  background: #ffb199;
  font-family: Audiowide, Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
  margin: 0 0 0 0;
  color: #fff;
  font-weight: 100;
  position: absolute;
  left: 0;
  bottom: 10%;
  text-transform: uppercase;
`;

const Cover = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  ${props =>
    props.url && `background: url(${props.url}) center center no-repeat;`}
  background-size: cover !important;
  margin: 0 30px 15px 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-out 0.15s;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: #221a5a;
    transition: all 0.3s ease-out 0.15s;
    pointer-events: none;
    opacity: 0.5;
    border-radius: 15px;
    position: absolute;
    left: 0;
    top: 0;
  }

  &:hover {
    &::after {
      opacity: 0;
    }
  }

  @media screen and (max-width: 667px) {
    width: 80px;
    height: 80px;
    margin: 0 15px 0 0;
    box-shadow: 2px 2px 15px #000;

    &::after {
      opacity: 0;
    }
  }
`;

const Name = styled.h4`
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 0 0 0;
  font-size: 1em;
  color: #fff;
  font-weight: 100;
  line-height: 1.5;

  @media screen and (max-width: 667px) {
    font-size: 0.8em;
  }
`;

const ArtistBlock = styled(Block)`
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const MoodGemBlock = styled(FlexContainer)`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  justify-content: flex-end;

  ${GemBlock} {
    width: auto !important;
    padding: 0 15px !important;

    svg {
      width: 30px;
      height: auto;
    }
  }
`;

const Artist = styled.span`
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0 0 0 0;
  font-size: 0.8em;
  color: #fff;
  font-weight: 100;
  line-height: 1.5;
  cursor: pointer;
  transition: all 300ms ease-out;

  @media screen and (max-width: 667px) {
    font-size: 0.7em;
  }

  &:hover {
    color: #bd10e0;
  }

  ${props =>
    props.type === "user" &&
    `
    pointer-events: none;
    color: #65D26E !important;
    font-family: Roboto, Helvetica, Arial, sans-serif !important;
    font-weight: 700;
  `}
`;

const DateAdded = styled.p`
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.9em;
  color: #5d5695;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  margin: 0 0 0 0;
  font-style: normal;
  letter-spacing: 0.085em;
  line-height: 1.5;
  i {
    margin: 0 5px 0 0;
  }

  @media screen and (max-width: 667px) {
    width: auto;
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 0.7em;
  }
`;

const ArtistBand = styled.div`
  left: 0;
  top: 70%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: unset;
  height: 30%;
  position: absolute;
  text-align: center;
  transition: all 300ms ease-out;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    -webkit-transition: all 0.3s ease-out 0.15s;
    transition: all 0.3s ease-out 0.15s;
    pointer-events: none;
    opacity: 0.7;
    border-radius: 15px;
    position: absolute;
    background: #f3f0fa;
  }

  @media screen and (max-width: 667px) {
    width: 120px;
    margin: 0 0 0 0;
    top: calc(100% - 30px);
    left: 50%;
    transform: translate(-50%, 0);
    overflow: visible;
    height: 30px;
    &::after {
      opacity: 1;
      height: 30px;
      border-radius: 15px 15px 0 0;
    }
  }
`;

const ArtistCover = styled(Cover)`
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  ${Artist} {
    z-index: 9;
    width: 70%;
    margin: 10px 0 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    color: #221a5a;
    opacity: 1;
  }

  &:hover {
    ${ArtistBand} {
      &::after {
        opacity: 0.8;
      }
    }
  }

  @media screen and (max-width: 667px) {
    width: 120px;
    height: 120px;
    margin: 0 0 0 0;
    overflow: visible;
    &::after {
      opacity: 0;
    }
    box-shadow: 5px 10px 15px #000;
    ${Artist} {
      margin: 8px 0;
    }
  }
`;

const ActionsBlock = styled(Block)`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 0;
`;

const SongRow = styled(FlexContainer)`
  width: 100%;
  background: #8780b3;
  border-bottom: 2px solid #3d3378;
  align-items: center;
  border-radius: 5px 15px 10px 0px;
  border: 1px solid #221a5a;
  border-bottom-width: 3px;
  border-left-width: 2px;
  position: relative;

  &:hover {
    background: #511e94;

    ${IconButton} {
      background: #ebe8ff;
    }
    ${DateAdded} {
      color: #bd10e0;
    }
  }

  ${Cover} {
    width: 60px;
    height: 60px;
    margin: 10px;
    border-radius: 2px;
    opacity: 1;
    margin: 10px 20px;
    &::after {
      border-radius: 2px;
      opacity: 0;
    }

    ${ExplicitTag} {
      font-size: 0.4em;
      opacity: 0.8;
    }

    @media screen and (max-width: 667px) {
      width: 50px;
      height: 50px;
      margin: 10px 10px;
      box-shadow: none;

      img {
        width: 50px;
      }

      ${ExplicitTag} {
        font-size: 0.3em;
        opacity: 0.8;
      }
    }
  }

  ${Name}, ${Artist} {
    font-size: 0.8em;
    width: 100%;

    @media screen and (max-width: 667px) {
      font-size: 0.7em;
      margin: 0 0 0 0;
      line-height: 1;
    }
  }

  ${Name} {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
  }

  ${Artist} {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;
  }
  ${DateAdded} {
    font-size: 0.6em;
    width: 100px;

    @media screen and (max-width: 667px) {
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 0.5em;
      width: auto;
      text-align: right;
    }
  }
  ${Block} {
    width: calc(100% - 300px);
    padding: 0 35px 0 5px;
    flex-shrink: 0;
    flex-grow: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;

    ${ArtistBlock} {
      width: 100%;
      padding: 0 0 0 0;
      margin: 0 0 0 0;
    }

    @media screen and (max-width: 667px) {
      width: auto;
      max-width: 200px;
      padding: 0 10px 0 5px;
    }
  }

  ${ActionsBlock} {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 0 0;
    margin: 0 0 0 0;

    @media screen and (max-width: 667px) {
      width: 25px;
      ${IconButton} {
        width: 25px;
        height: 25px;
        font-size: 0.8em;
      }
    }
  }

  ${props =>
    props.type === "queue" &&
    `
    border:none;
    border-radius: 0;
    background: transparent;
    padding: 0;


    ${Block} {
      width: calc(100% - 300px);
    }

    ${ActionsBlock} {
      width: 50px;
      justify-content: flex-end;
    }

    ${ArtistBlock} {
      padding: 0 0 0 0;
      margin: 0 0 0 0;
    }

    ${UserImageContainer} {
      margin: 0 0 0 30px;
    }

    @media screen and (max-width: 667px) {
      padding: 0;
      flex-wrap: nowrap;
      overflow: hidden;

      ${Block} {
        width: auto;
        max-width: 50vw;
      }
      
      ${UserImageContainer} {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 20px;
        height: 20px;
        img {
          width: 20px;
        }
      }

      ${ActionsBlock} {
        &.right {
          position: absolute;
          top:50%;
          transform: translate(0, -50%);
          left: 75vw;
        }
      }

      h4 {
        font-size: 0.7em;
        opacity: 0.7;
      }
    }
  `}
`;

const HorizontalSwipe = styled(FlexContainer)`
  overflow: hidden;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding: 30px 30px 5px;
  background: #221a5ab5;
  align-items: center;
  border-radius: 15px 45px 30px 0px;
  border: 3px solid #221a5a;
  border-bottom-width: 9px;
  border-left-width: 6px;

  &.actions {
    padding: 10px 10px 10px;
    background: transparent;
    border: none;
  }

  ${ArtistCover}, ${Cover} {
    width: 150px;
    height: 150px;
    opacity: 1;

    &:after {
      opacity: 0;
    }

    &:hover {
      top: -5px;
      box-shadow: 0px 5px 1px #221a5a;
    }

    @media screen and (max-width: 667px) {
      width: 120px;
      height: 120px;
      margin: 0 15px 0 0;
    }
  }

  ${ArtistBand} {
    &:after {
      opacity: 0.8;
    }
  }

  ${Cover} {
    margin: 0 30px 15px 0;
  }

  ${ArtistCover} {
    margin: 0 30px 0 0;
    ${Artist} {
      font-size: 0.6em;
    }
  }

  ${Name}, ${Artist} {
    width: 110px;
    font-size: 0.8em;
    line-height: 1;
    opacity: 1;
    pointer-events: none;
  }

  ${ArtistBlock} {
    width: 110px;
  }

  @media screen and (max-width: 667px) {
    padding: 0 15px 5px 0;
    border-radius: 5px 15px 10px 0px;

    ${FlexContainer} {
      flex-shrink: 0;
      flex-grow: 0;
      width: auto;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const TracklistHero = styled(FlexContainer)`
  padding: 20px;
  background: #9013fe;
  border: 3px solid #511e94;
  border-bottom-width: 9px;
  border-left-width: 6px;
  border-radius: 30px 90px 60px 0px;
  position: relative;

  ${Cover} {
    width: 300px;
    height: 300px;
    margin: 0 0 0 0;
    cursor: default;

    &:after {
      display: none;
    }

    @media screen and (max-width: 667px) {
      width: 150px;
      height: 150px;
      margin: 15px auto;
    }
  }

  > ${Block} {
    display: block;
    margin: 0 0 0 30px;
    width: calc(100% - 360px);

    @media screen and (max-width: 667px) {
      width: 100%;
      margin: 0 0 0 0;
    }
  }

  ${Name} {
    font-size: 3em;
    width: 100%;

    @media screen and (max-width: 667px) {
      font-size: 1.5em;
    }
  }

  ${Artist} {
    margin: 0 10px;
    font-size: 1.25em;
    width: 100%;
    color: #f4f4ff;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;

    &:hover {
      color: #c86dd7;
    }
  }

  ${ActionsBlock} {
    margin: 15px 0;
    justify-content: flex-start;

    @media screen and (max-width: 667px) {
      flex-direction: column;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }

  .tag {
    font-size: 0.8em;
    color: #ebe8ff;
    margin: 0 10px;
    line-height: 2em;
    position: absolute;
    right: 60px;
    bottom: 30px;

    @media screen and (max-width: 667px) {
      right: unset;
      left: 10px;
      bottom: 5px;
      margin: 0;
      opacity: 0.5;
    }
  }

  p a {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;
    color: #f5a6ff;
  }

  @media screen and (max-width: 667px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 10px 30px;
    border-radius: 10px 45px 15px 0px;

    p {
      text-align: left;
    }
  }
`;

const ArtistHero = styled(TracklistHero)`
  justify-content: center;
  align-items: center;

  ${ArtistCover} {
    width: 300px;
    height: 300px;
    margin: 0 0 0 0;
    &:after {
      opacity: 0;
    }
    cursor: default;

    @media screen and (max-width: 667px) {
      width: 150px;
      height: 150px;
      margin: 15px auto;
    }
  }

  ${Name} {
    margin: 0 30px;

    @media screen and (max-width: 667px) {
      margin: 15px auto;
    }
  }

  ${ActionsBlock} {
    margin: 15px 30px 0;
    justify-content: flex-start;

    @media screen and (max-width: 667px) {
      margin: 15px 30px 15px;
    }
  }
`;

const Tag = styled.span`
  font-family: Audiowide, Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
  margin: 0 0 0 0;
  font-size: 0.8em;
  color: #fff;
  font-weight: 100;
  line-height: 1;
  padding: 2px 5px;
  text-transform: uppercase;
  border: 1px solid #fff;
  background: rgba(235, 232, 255, 0.6);
  width: auto;

  i {
    background: transparent;
    margin: 0 32px 0 0;
    cursor: pointer;
    transition: all 300ms ease-out;

    &:hover {
      color: #3d3378;
    }
  }
`;

const GenreBlock = styled(Block)`
  width: 100%;
  margin: 30px 30px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-wrap: wrap;

  &:before {
    content: "artist genres";
    position: absolute;
    top: -20px;
    left: 0;
    font-family: Audiowide, Helvetica, Arial, sans-serif;
    letter-spacing: 1px;
    margin: 0 0 0 0;
    font-size: 0.7em;
    color: rgba(235, 232, 255, 0.75);
    font-weight: 100;
    opacity: 1;
  }

  ${Tag} {
    margin: 0 5px 5px 0;
  }

  @media screen and (max-width: 667px) {
    margin: 15px auto 15px;
    justify-content: center;
    ${Tag} {
      margin: 5px;
      font-size: 0.6em;
    }
  }
`;

const AlbumWrapper = styled(FlexContainer)`
  > ${Block} {
    display: block;
    padding: 0 0 0 0;
    box-sizing: border-box;
    width: auto;
    text-align: left;
  }

  ${ArtistBlock} {
    margin: 5px 0;
  }

  @media screen and (max-width: 667px) {
  }
`;

export {
  Cover,
  Name,
  DateAdded,
  Artist,
  ArtistCover,
  ArtistBand,
  SongRow,
  ActionsBlock,
  HorizontalSwipe,
  TracklistHero,
  ArtistHero,
  MoodGemBlock,
  Tag,
  GenreBlock,
  ExplicitTag,
  ArtistBlock,
  AlbumWrapper
};
