import styled from "styled-components";
import { SwitchLabel } from "../forms/Switch";
import { Tag } from "./Library";
import { GemBlock } from "./Mood";
import { SearchResultsInput } from "./Queue";

export const SelectMoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align: flex-start;
  width: 32%;
  min-width: 200px;
  height: auto;
  border-radius: 10px 15px 30px 0px;
  padding: 12px;
  background: #511e94;
  box-shadow: -1px 3px 2px #8780b3;
  position: relative;
  margin: 0 0 30px 0;
  cursor: pointer;
  &:before {
    content: "";
    background: #190d48;
    border-radius: 10px 15px 30px 0px;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    transition: all 300ms ease-out;
  }

  &:hover,
  &.active {
    &:before {
      opacity: 0;
    }
  }

  h3 {
    margin: 0;
  }

  ${Tag} {
    margin: 0 5px 5px 0;
    font-size: 0.6em;
  }

  ${GemBlock} {
    margin: 12px 4px 12px 0;
    padding: 0;

    svg {
      width: 30px;
      height: auto;
    }
  }

  ${SwitchLabel} {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  ${props =>
    props.type === "playlist" &&
    ` {
        width: 100%;
        min-height: 100px;
        background: #221A5A;
    }
     ${GemBlock} {
      margin: 12px 16px 12px;
  }`}

  ${SearchResultsInput} {
    width: 90%;
  }

  @media screen and (max-width: 996px) {
    width: 100%;
  }
`;
