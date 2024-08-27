import styled from "styled-components";

import { FlexContainer } from "./styled/Containers";

const NoResultsWrapper = styled(FlexContainer)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 64px;
  text-align: center;
  background: #221a5a;
  height: auto;

  .fa-meh {
    font-size: 3em;
  }

  h2,
  p {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 100;
  }

  @media screen and (max-width: 667px) {
    padding: 32px;
  }
`;

export const NoResultsLibrary = ({ type }) => {
  switch (type) {
    case "tagged": {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>No tagged songs were found.</h2>
          <p>
            Tag a song with <i className="far fa-gem"></i> to add it to your
            mood library! Then you can access them here and filter by mood.
          </p>
        </NoResultsWrapper>
      );
    }
    case "songs": {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>No liked songs were found.</h2>
          <p>
            Like a song <i className="far fa-heart"></i> to add it to your
            library! Then you can access them here.
          </p>
        </NoResultsWrapper>
      );
    }
    case "albums": {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>No albums were found.</h2>
          <p>Save an album to your library to access them here.</p>
        </NoResultsWrapper>
      );
    }
    case "playlists": {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>No playlists were found.</h2>
          <p>Follow a playlist to access them here.</p>
        </NoResultsWrapper>
      );
    }
    case "artists": {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>No artists were found.</h2>
          <p>Follow an artist to access them here.</p>
        </NoResultsWrapper>
      );
    }
    default: {
      return (
        <NoResultsWrapper>
          <i className="fas fa-meh"></i>
          <h2>Nothing to see here.</h2>
        </NoResultsWrapper>
      );
    }
  }
};
