import { moodGem } from "helpers/moodGemHooks";
import { GemBlock } from "./styled/Mood";
import { FlexContainer } from "./styled/Containers";
import Switch from "./forms/Switch";
import { Tag } from "./styled/Library";
import { SelectMoodWrapper } from "./styled/Recommendations";

const SelectMood = ({ id, moods, title, genres, selected, toggleMood }) => {
  const toggleSelect = function() {
    toggleMood(id);
  };

  return (
    <SelectMoodWrapper onClick={toggleSelect} className={selected && "active"}>
      <h3>{title}</h3>
      <FlexContainer>
        {moods.map(gem => (
          <GemBlock key={gem}>{moodGem(gem.toLowerCase())}</GemBlock>
        ))}
      </FlexContainer>
      <FlexContainer margin="0" wrap="wrap">
        {genres.map(genre => (
          <Tag key={genre}>{genre}</Tag>
        ))}
      </FlexContainer>
      <Switch readOnly={true} id="test-switch" toggled={selected} />
    </SelectMoodWrapper>
  );
};

export default SelectMood;
