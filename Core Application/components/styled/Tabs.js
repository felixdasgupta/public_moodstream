import styled from "styled-components";

const Tab = styled.div`
  width: auto;
  padding: 20px 10px 0;
  margin: 0 40px 0 0;
  cursor: pointer;
  opacity: 0.8;
  transition: all 300ms ease-out;
  position: relative;
  font-family: Audiowide, Helvetica, Arial, sans-serif;
  color: #fff;

  i {
    margin: 0 10px 0 0;
  }

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

  ${props =>
    props.active &&
    `
        &::after {
            transform: scaleX(1);
        }
        opacity: 1;
    `}

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 667px) {
    padding: 16px 0 0;
    margin: 0 16px 0 0;
    h2 {
      font-size: 1em;
    }
    h3 {
      font-size: 1em;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 300;
    }
  }
`;

const TabHeader = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
  display: flex;
  border-bottom: 1px solid #8780b3;

  @media screen and (max-width: 667px) {
    overflow: hidden;
    overflow-x: scroll;
    margin: 0;
    h3 {
      white-space: nowrap;
      padding: 0 10px;
    }
  }
`;

const TabBody = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0;
`;

const TabContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
  display: block;
  position: relative;

  @media screen and (max-width: 667px) {
    width: 100%;
  }
`;

const TabSelect = styled.select`
  width: 100%;
  height: auto;
  background: transparent;
  color: #fff;
  border: none;
  margin: 15px 0;
  border-bottom: 1px solid #d8d8d8;
  font-family: Audiowide, Helvetica, Arial, sans-serif;
  color: #fff;
  font-size: 1.5em;
  padding: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 8px;
  }
`;

export { TabContainer, TabSelect, TabHeader, TabBody, Tab };
