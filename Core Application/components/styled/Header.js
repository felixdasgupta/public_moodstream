import styled from "styled-components";
import { DarkButton } from "./Buttons";
import { FlexContainer } from "./Containers";

const HeaderContainer = styled.div`
  background-color: #221a5a;
  padding: 15px 30px;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100vw;

  ${FlexContainer} {
    transition: all 300ms ease-out;
    width: 100%;
  }

  @media screen and (max-width: 667px) {
    width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 15px 15px;

    ${DarkButton} {
      width: auto;
    }

    ${FlexContainer} {
      padding: 10px 0;
      a,
      ${DarkButton} {
        width: 100%;
      }
    }
  }
`;

const HeaderLink = styled.div`
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    height: 60px;
    width: auto;
  }
  i {
    font-size: 2em;
  }

  @media screen and (max-width: 667px) {
    img {
      height: 45px;
    }

    h4 {
      font-size: 0.8em;
    }

    i {
      font-size: 1.5em;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;

  a {
    margin: 0 30px 0 0;
    position: relative;
    padding: 15px 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    opacity: 0.8;

    &::after {
      content: "";
      display: block;
      border-bottom: 4px solid #f5a6ff;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
    }

    &.active {
      opacity: 1;
      font-weight: bolder;
    }

    &:hover {
      opacity: 1;
      &::after {
        transform: scaleX(1);
      }
    }
  }
`;

export { HeaderContainer, HeaderLink, HeaderActions };
