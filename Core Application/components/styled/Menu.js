import styled from "styled-components";
import { IconButton } from "./Buttons";
import { Block, FlexContainer } from "./Containers";

export const MenuWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;
  display: block;
  overflow: hidden;
  margin: 0 auto 30px;
  text-align: center;
  max-width: 1200px;

  h1,
  h2,
  h3,
  p {
    margin: 10px 0;
    color: #0f083c;
  }

  h1 {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 100;
  }
  a,
  button {
    margin: 30px auto;
  }

  @media screen and (max-width: 996px) {
    padding: 0 15px;

    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const MenuList = styled(FlexContainer)`
  margin: 15px auto;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 30px 0;

  @media screen and (max-width: 996px) {
    padding: 0;
    margin: 0 auto;
  }
`;
export const MenuItem = styled(Block)`
  width: 22.5%;
  padding: 0 0 0 0;
  background: transparent;
  height: auto;
  text-align: left;
  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 996px) {
    padding: 15px 0;
  }
`;

export const MenuTitle = styled.h3`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 100;
  margin: 15px 0 0;
  color: #0f083c;
  @media screen and (max-width: 996px) {
    font-size: 12px;
  }
`;
export const MenuPrice = styled.h4`
  margin: 0px 0 10px;
  color: #0f083c;
`;
export const MenuImage = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 57%;
  border-radius: 5px;

  ${props =>
    props.src &&
    `background: url(${props.src}) center center no-repeat; background-size: cover;`}

  @media screen and (max-width: 996px) {
    padding-bottom: 100%;
  }
`;
export const MenuDescription = styled.p`
  margin: 10px 0 10px;
  line-height: 1.5;
  overflow: hidden;
  padding: 0 0 15px;
  color: #0f083c;
`;
