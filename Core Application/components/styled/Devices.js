import styled from "styled-components";
import { Button } from "./Buttons";
import { FlexContainer, Block } from "./Containers";

const DeviceIcon = styled(Block)`
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 1em;
    margin: 0 12px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 100;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: row-reverse;
  }
`;

const DeviceWrapper = styled(FlexContainer)`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  background: #221a5a;
  padding: 4px;
  width: 100%;
  max-height: 208px;
  overflow: auto;
  border-radius: 4px;

  p {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.5rem;
  }

  ${FlexContainer} {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    border-bottom: 1px solid #8780b3;
    padding: 4px 0;
  }

  ${Block} {
    padding: 5px;
    max-width: 50%;
    width: auto;
  }

  @media screen and (max-width: 1200px) {
    ${FlexContainer} {
      position: relative;
      flex-direction: column-reverse;
      align-items: flex-start;
      margin: 0;
      padding: 12px;
    }
    ${Block} {
      position: static;
      max-width: none;
      width: 100%;
      text-align: center;
      ${Button} {
        margin: 10px auto;
      }
    }
  }
`;

const DeviceActions = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-end;
  ${Button} {
    margin: 8px 0 0;
    width: 100%;
  }
`;

export { DeviceWrapper, DeviceIcon, DeviceActions };
