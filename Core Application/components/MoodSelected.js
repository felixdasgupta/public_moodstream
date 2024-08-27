import { moodGem } from "helpers/moodGemHooks";
import { GemBlock, GemName, GemSvg } from "components/styled/Mood";
import { FlexContainer } from "components/styled/Containers.js";
import { Tag } from "@/components/styled/Library";
import styled from "styled-components";
import app from "config/app";

const MoodSelectedWrapper = styled(FlexContainer)`
  padding: 0 32px;
  width: auto;
  p {
    margin: 0 10px 0 0;
    color: #cccae6;
    white-space: nowrap;
    strong {
      color: #ffc745;
    }
    &.mood-label {
      margin: 0 5px 0 0;
      font-size: 0.8em;
      color: #8780b3;
      &:first-child {
        &:before {
          content: "(";
        }
      }
      &:last-child {
        &:after {
          content: ")";
        }
      }
    }
  }

  ${Tag} {
    margin: 0 5px;
    font-size: 0.6em;
  }

  ${GemBlock} {
    margin: 0;
    padding: 0;
    width: auto;
    ${GemSvg} {
      width: 30px;
      height: auto;
    }
  }

  @media screen and (max-width: 620px) {
    padding: 0 10px;
    width: 100%;

    p {
      font-size: 0.8em;
      margin: 0 5px 0 0;
    }

    ${GemBlock} {
      ${GemSvg} {
        width: 22px;
        height: auto;
      }
    }
  }
`;

export const MoodSelected = ({ recommendations }) => {
  const { CURRENT_CLIENT } = app;
  const client = CURRENT_CLIENT.split("-")
    .join(" ")
    .toUpperCase();

  return (
    <MoodSelectedWrapper
      align="center"
      mAlign="center"
      mMargin="16px 0"
      mPadding="0 0 0 0"
    >
      {recommendations.moodTracks.length > 0 && (
        <>
          <p>
            <strong>{client}</strong> has set the mood to
          </p>
          {recommendations.moods.map(gem => (
            <GemBlock key={gem}>{moodGem(gem.toLowerCase())}</GemBlock>
          ))}
          <FlexContainer
            width="auto"
            align="center"
            margin="0 8px"
            mPadding="0 0 0 0"
            mAlign="center"
            mMargin="0 0 0 5px"
          >
            {recommendations.moods.map((name, i) => (
              <p className="mood-label" key={`mood-${name}-${i}`}>
                {i < recommendations.moods.length - 1 ? `${name}, ` : name}
              </p>
            ))}
          </FlexContainer>
        </>
      )}
    </MoodSelectedWrapper>
  );
};
