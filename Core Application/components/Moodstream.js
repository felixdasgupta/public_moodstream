import { FlexContainer } from "./styled/Containers";
import { Button } from "./styled/Buttons";
import TagMood from "./TagMood";
import { useMoodTagging } from "helpers/moodGemHooks";
import { useEffect } from "react";

const Moodstream = ({ playing, session, saveSong }) => {
  const {
    gemChanged,
    moodGems,
    updateGems,
    resetGems,
    isFetching,
    submitted,
    submitTag
  } = useMoodTagging();

  useEffect(() => {
    resetGems();
  }, [playing.track]);

  const tagAndSave = () => {
    //saveSong(playing.track.uri);
    submitTag(session.user.id, playing.track.uri);
  };

  if (!playing.track) {
    return (
      <FlexContainer
        direction="column"
        justify="center"
        align="center"
        mPadding="0"
        mMargin="0 0 30px"
        mJustify="flex-start"
      >
        <h4>
          No song is currently playing. Room might be inactive, please wait for
          the host to start the room or add a song to the queue.
        </h4>
      </FlexContainer>
    );
  }

  return (
    <FlexContainer
      direction="column"
      justify="center"
      align="center"
      mPadding="0"
      mMargin="0 0 30px"
      mJustify="flex-start"
    >
      <h2>Tag Song</h2>
      {!submitted && (
        <h4 style={{ margin: "0 0 15px" }}>
          Which mood(s) closely resembles the song that is currently playing?
          Tag as many as you'd like.
        </h4>
      )}
      <FlexContainer
        margin="15px 0"
        wrap="wrap"
        justify="center"
        align="center"
        mPadding="0"
        mMargin="0 0 30px"
        mJustify="flex-start"
      >
        {gemChanged &&
          Object.keys(moodGems).map((gem, ind) => {
            return (
              <TagMood
                gem={gem}
                key={`gem-${gem}-${ind}`}
                active={moodGems[gem]}
                handleToggle={updateGems}
                inactive={!playing.track || submitted || isFetching}
              />
            );
          })}
      </FlexContainer>
      <FlexContainer direction="column" justify="center" align="center">
        {!submitted && (
          <Button
            btnType="client"
            style={{ margin: "0 0 15px" }}
            disabled={!playing.track}
            onClick={() => tagAndSave()}
            isLoading={isFetching}
          >
            {!isFetching ? "Save" : "Submitting..."}
          </Button>
        )}
        {!submitted && !isFetching && (
          <Button
            onClick={resetGems}
            style={{ margin: "0 0 8px" }}
            isLoading={isFetching}
          >
            Reset
          </Button>
        )}
        {submitted && (
          <p>This song has been tagged. Thank you for your submision.</p>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

export default Moodstream;
