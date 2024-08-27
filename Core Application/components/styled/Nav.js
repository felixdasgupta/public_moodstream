import styled from "styled-components";
import { DarkButton } from "./Buttons";
import { HeaderLink } from "./Header";

export const NavList = styled.ul`
  list-style: none;
  width: 100%;
  text-align: right;
  padding: 10px 0;
  margin: 0 0 0 0;
  z-index: 9;
`;

export const NavItem = styled.li`
  padding: 10px 10px 0;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;

  ${DarkButton} {
    width: 100%;
  }

  ${props =>
    props.type === "special" &&
    `
    font-weight: 100;
    background: #8780B3;
    margin: 30px 0;
  `}
`;

export const SideNavWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;

  ${NavList} {
    width: 30%;
    background: #190d48;
    padding: 0;
    min-width: 280px;
    position: relative;
    height: 100%;

    @media screen and (max-width: 996px) {
      width: 80%;
      min-width: 200px;
    }
  }

  ${NavItem} {
    padding: 15px 30px;
    cursor: pointer;
    transition: all 300ms ease-out;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      display: block;
      border-left: 4px solid #f5a6ff;
      transform: scaleY(0);
      transition: transform 250ms ease-in-out;
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
    }

    &:hover,
    &.active {
      background: #3d3378;
      &::after {
        transform: scaleY(1);
      }
    }

    i,
    img {
      position: absolute;
      left: 30px;
    }
  }

  ${HeaderLink} {
    padding: 15px;
    background: #221a5a;
  }
`;

export const Screen = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
  cursor: pointer;
  transition: all 300ms ease-out;
  position: absolute;
  left: 0;
  top: 0;

  &:hover {
    opacity: 0.5;
  }
`;
