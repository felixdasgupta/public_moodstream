import styled from "styled-components";
import { Block, FlexContainer } from "./Containers";

const SearchResultsInput = styled.input`
  padding: 8px 12px;
  width: 100%;
  background: #3d3378ff;
  border: 2px solid #8780b3;
  line-height: 2em;
  border-radius: 8px;
  display: block;
  box-sizing: border-box;
  position: relative;
  font-family: Roboto, "Font Awesome 5 Free";
  font-style: normal;
  color: #ebe8ff;
  @media screen and (max-width: 667px) {
    margin: 15px auto 0;
  }
`;

const SearchResultsList = styled.ul`
  width: 100%;
  border: 1px solid #999;
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  background: #ebe8ff;
  box-sizing: border-box;

  @media screen and (max-width: 667px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ResultItem = styled.li`
  padding: 12px;
  border-bottom: 1px solid #0f083c;
  background-color: #8780b3;
  position: relative;
  &.focused,
  &:hover {
    background-color: #3d3378;
  }
  @media screen and (max-width: 667px) {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 12px 0;
  }

  &:after {
    content: "\f067";
    font-family: Roboto, "Font Awesome 5 Free";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

const AlbumImage = styled.div`
  width: 64px;
  padding-right: 1em;
  margin: 0 15px 0 0;

  img {
    width: 64px;
    height: auto;
  }

  @media screen and (max-width: 667px) {
    width: 50px;

    img {
      width: 50px;
    }
  }
`;

const SongDetails = styled(Block)`
  width: calc(100% - 80px);
  whitespace: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 667px) {
    width: calc(100% - 66px);
  }
`;

const SongName = styled.span`
  font-size: 1em;
  margin-bottom: 15px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 700;

  @media screen and (max-width: 667px) {
    font-size: 0.8em;
  }
`;

const ArtistName = styled.div`
  font-size: 1em;
  margin-bottom: 0.3em;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;

  @media screen and (max-width: 667px) {
    font-size: 0.8em;
  }
`;

const QueueTable = styled.table`
  margin: 0 0 15px;
  border: 2px solid #3d3378;
  table-layout: fixed;
  width: 100%;

  td {
    padding: 10px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 0.8em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const QueueWrapper = styled(FlexContainer)`
  overflow: auto;
  overflow-x: hidden;
  padding: 15px 0;
  border-top: 1px solid #3d3378;

  @media screen and (max-width: 667px) {
    display: block;
    overflow: auto;
    padding: 0;
  }
`;

export {
  SearchResultsInput,
  SearchResultsList,
  QueueTable,
  QueueWrapper,
  ResultItem,
  SongDetails,
  AlbumImage,
  SongName,
  ArtistName
};
