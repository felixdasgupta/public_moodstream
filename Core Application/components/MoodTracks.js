import { moodGem } from "helpers/moodGemHooks";
import styled from "styled-components";
import { Block, FlexContainer } from "./styled/Containers";
import { Name, Artist, ArtistBlock, SongRow } from "./styled/Library";
import { GemBlock } from "./styled/Mood";

const PlainSongRow = styled(SongRow)`
  padding: 20px 30px;
  background: transparent;
  &:nth-child(2n + 1) {
    background: #511e94;
  }
  pointer-events: none;

  ${props =>
    props.active &&
    `background: #8780b3;
  `}

  border ${Artist} {
    pointer-events: none;
    width: calc(100% - 400px);
  }
`;

const MoodTracks = props => {
  return (
    <FlexContainer
      direction="column"
      margin="15px 0"
      mAlign="center"
      padding="0 15px 30px"
      mPadding="30px 10px"
    >
      <FlexContainer>
        <Block width="50%" margin="0 0 15px">
          <FlexContainer align="center">
            <img
              src="/static/animo.png"
              alt="Animo"
              title="Animo"
              style={{ width: "50px", margin: "0 15px 0 0" }}
            />
            <h1>{props.moodTracks.length} Recommendations</h1>
          </FlexContainer>
          <p>
            Below is a list of recommended songs based on the mood you've
            selected. If the queue is empty, the song from the top of this list
            will start playing.
          </p>
        </Block>
        <FlexContainer width="50%" margin="0 0 15px" justify="flex-end">
          {props.moods &&
            props.moods.map(gem => (
              <GemBlock key={gem}>{moodGem(gem.toLowerCase())}</GemBlock>
            ))}
        </FlexContainer>
      </FlexContainer>
      {props.moodTracks &&
        props.moodTracks.map(({ name, artists_names, uri }, ind) => (
          <PlainSongRow
            key={`${name}-${new Date()}-${ind}`}
            active={
              ind === props.currentHead &&
              props.playing.track &&
              uri === props.playing.track.uri
            }
          >
            <Name>{name}</Name>
            <ArtistBlock>
              {artists_names.map((artist, ind) => (
                <Artist key={`${artist}-${new Date()}-${ind}`}>
                  {artist}
                  {ind < artists_names.length - 1 && ", "}
                </Artist>
              ))}
            </ArtistBlock>
            {ind === props.currentHead &&
              uri ===
                (props.playing.track && uri === props.playing.track.uri) && (
                <i className="fas fa-volume-up"></i>
              )}
          </PlainSongRow>
        ))}
    </FlexContainer>
  );
};

export default MoodTracks;
