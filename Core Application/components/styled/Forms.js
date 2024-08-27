import styled from "styled-components";
import { Tag } from "./Library";

export const MoodOutput = styled.output`
  background: transparent;
  padding: 5px 16px;
  color: #ebe8ff;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  line-height: 1rem;
  font-size: 24px;
`;

export const MoodInput = styled.input`
  background: #221a5a;
  border-radius: 5px;
  padding: 12px 16px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  line-height: 1rem;
  font-size: 16px;
  color: #ebe8ff;
  opacity: 0.8;
  border: 1px solid transparent;
  width: 100%;
  margin: 16px 0 0;

  &:focus,
  &:hover {
    border: 1px solid #ebe8ff;
    opacity: 1;
  }

  ${props =>
    props.type === "range" &&
    `
		height: 25px;
    -webkit-appearance: none;
    margin: 25px 0;
    width: 100%;
    background: transparent;
    outline: none !important;
    transition: all 300ms ease-out;
    &:focus {
      outline: none !important;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 0px #000000;
      border-radius: 5px;
      background-image: linear-gradient(270deg, #FC6076 0%, #FFC745 100%);
      background-size: ${props.value || "50"}% 100%;
      background-repeat: no-repeat;
      transition: all 300ms ease-out;
    }
    &::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #fff;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #fff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7px;
      transition: all 300ms ease-out;
    }
    &::-moz-range-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 0px #000000;
      background: #2497E3;
      border-radius: 1px;
      border: 0px solid #000000;
    }
    &::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
    }
    &::-ms-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: #2497E3;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    &::-ms-fill-upper {
      background: #2497E3;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    &::-ms-thumb {
      margin-top: 1px;
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
    }
    &:focus::-ms-fill-lower {
      background: #2497E3;
    }
    &:focus::-ms-fill-upper {
      background: #2497E3;
    }
  `}
`;

export const MoodLabel = styled.label`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.5em;
  color: #ebe8ff;
  margin: 0 8px;
  position: relative;
  ${MoodOutput} {
    position: absolute;
    right: 30px;
    top: 10px;
  }

  .no-autocomplete {
    color: #999;
    padding: 8px;
  }
  .autocomplete {
    border: 1px solid #3d3378;
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 200px;
    overflow-y: auto;
    padding-left: 0;
    width: 100%;
  }
  .autocomplete li {
    padding: 15px 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: capitalize;
    i {
      margin: 0 30px 0 0;
    }

    &.header {
      padding: 8px 15px;
      background: #ebe8ff;
      pointer-events: none;
      justify-content: space-between;
      h4,
      i {
        color: #000;
        margin: 0 0 0 0;
      }
    }
  }
  .autocomplete > .active,
  .autocomplete li:hover {
    background-color: #3d3378;
    cursor: pointer;
    font-weight: 700;
  }
  .autocomplete li:not(:last-of-type) {
    border-bottom: 1px solid #3d3378;
  }
  .chipset {
    margin: 16px 0;
    display: flex;
    flex-wrap: wrap;
  }

  ${Tag} {
    margin: 0 10px 10px 0;
    white-space: nowrap;
    padding: 10px 12px;
  }
`;

export const MoodForm = styled.form`
  display: block;
  width: 100%;
  height: auto;

  ${MoodLabel} {
    width: 50%;
    padding: 0 30px 0 0;
  }
`;
