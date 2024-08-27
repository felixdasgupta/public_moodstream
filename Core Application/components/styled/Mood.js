import styled from "styled-components";
import { Block } from "./Containers";

const GemSvg = styled.svg`
  transition: all 300ms ease-out;
`;

const GemName = styled.h4`
  text-transform: capitalize;
  color: #f4f4ff;
  margin: 10px 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
`;

const GemBlock = styled(Block)`
  width: auto;
  text-align: center;
  display: block;
  padding: 10px;
  margin: 10px;

  @media screen and (max-width: 667px) {
    width: 25%;
    margin: 0;
    text-align: center;
    ${GemName} {
      font-size: 12px;
    }
    ${GemSvg} {
      width: 45px;
      height: auto;
    }
  }
`;

const GemToggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  margin: 0;
  background: transparent;
  border: 3px solid #8780b3;
  cursor: pointer;
  ${GemSvg} {
    width: 30px;
    height: auto;
    opacity: 0.8;
  }

  &:hover {
    background: rgba(235, 232, 255, 0.75);
    ${GemSvg} {
      width: 40px;
      opacity: 1;
    }

    @media screen and (max-width: 667px) {
      background: transparent;
      ${GemSvg} {
        width: 20px;
        opacity: 0.8;
      }
    }
  }

  ${props =>
    props.active &&
    `
    background: #eae9fd;
    ${GemSvg} {
        width: 50px;
        opacity: 1;
    }
    @media screen and (max-width: 667px) {
        background: #eae9fd !important;
        ${GemSvg} {
            width: 30px !important;
            opacity: 1 !important;
        }
    }
  `}

  ${props =>
    props.inactive &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}


  @media screen and (max-width: 667px) {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    ${GemSvg} {
      width: 20px;
      height: auto;
      opacity: 0.8;
    }
  }
`;

const GemDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  width: auto;
`;

export { GemSvg, GemToggle, GemName, GemBlock, GemDetails };
