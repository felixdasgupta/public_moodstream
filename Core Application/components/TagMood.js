import { moodGem } from "helpers/moodGemHooks";
import { GemBlock, GemToggle, GemName } from "./styled/Mood";

const TagMood = ({ gem, handleToggle, active, inactive }) => (
  <GemBlock width="auto" grow="0">
    <GemToggle
      active={active}
      inactive={inactive}
      onClick={() => handleToggle(gem, !active)}
    >
      {moodGem(gem)}
    </GemToggle>
    <GemName>{gem}</GemName>
  </GemBlock>
);

export default TagMood;
