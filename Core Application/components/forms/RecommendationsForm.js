import { generateRecommendations } from "helpers/botHooks";
import { FlexContainer } from "components/styled/Containers.js";
import { DarkButton } from "components/styled/Buttons";
import { useForm, Controller } from "react-hook-form";
import {
  MoodInput,
  MoodLabel,
  MoodForm,
  MoodOutput
} from "components/styled/Forms";
import TagMood from "../TagMood";
import { useMoodTagging } from "helpers/moodGemHooks";
import { useSlider } from "helpers/formHooks";
import Autocomplete from "./Autocomplete";
import { useRecommendationsAutocomplete } from "helpers/recommendationHooks";

const RecommendationsForm = props => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm();

  const { gemChanged, moodGems, updateGems } = useMoodTagging();
  const { sliderValue, handleSliderChange } = useSlider();
  const { isFetching, genres } = useRecommendationsAutocomplete({
    session: props.session
  });

  const onSubmit = data => {
    console.log(data); //generateRecommendations(session, tracks)
  };

  return (
    <FlexContainer
      margin="16px 0"
      justify="center"
      padding="0 32px 0 0"
      width="100%"
    >
      <MoodForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Set the Mood</h2>
        <FlexContainer margin="0 0 16px" padding="16px 0" width="100%">
          {gemChanged &&
            Object.keys(moodGems).map((gem, ind) => {
              return (
                <TagMood
                  gem={gem}
                  key={`gem-${gem}-${ind}`}
                  active={moodGems[gem]}
                  handleToggle={updateGems}
                />
              );
            })}
        </FlexContainer>
        <h2>Customize</h2>
        <FlexContainer margin="0 0 16px" padding="16px 0" width="100%">
          <Controller
            name="similar"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Autocomplete
                  field={field}
                  placeholder="Genres..."
                  label="Similar to"
                  suggestions={genres}
                />
              </>
            )}
          />
          <Controller
            name="trending"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <MoodLabel>
                  Trending
                  <MoodInput
                    type="range"
                    min="1"
                    max="100"
                    onMouseUp={handleSliderChange}
                    step="1"
                    {...field}
                  />
                  <MoodOutput>{`${sliderValue}%`}</MoodOutput>
                </MoodLabel>
              </>
            )}
          />
        </FlexContainer>
        <h2>New Automation</h2>
        <FlexContainer
          margin="0 0 16px"
          padding="16px 0"
          width="100%"
          align="flex-end"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <MoodLabel>
                  Automation Name
                  <MoodInput
                    type="text"
                    {...field}
                    placeholder="Name your automation ie: Party Vibes, Closing Time, Peak..."
                  />
                </MoodLabel>
              </>
            )}
          />
          <DarkButton icon={true} size="large" type="submit">
            <img src="/static/animo.png" alt="Animo" title="Animo" />
            Generate Automation
          </DarkButton>
        </FlexContainer>
      </MoodForm>
    </FlexContainer>
  );
};

export default RecommendationsForm;
