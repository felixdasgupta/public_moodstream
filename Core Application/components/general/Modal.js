import styled from "styled-components";
import { Button, IconButton } from "../styled/Buttons";
import { Block, FlexContainer } from "../styled/Containers";
import { SongRow } from "@/components/styled/Library";

const ModalScreen = styled(FlexContainer)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  background: #0f083c;
  opacity: 0.5;
  white-space: nowrap;
  z-index: 999;
`;

const ModalWrapper = styled(FlexContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #221a5a;
  padding: 48px 16px;
  width: 80vw;
  height: auto;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  ${IconButton} {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  @media screen and (max-width: 420px) {
    width: 90vw;
    height: auto;
  }
`;
const ModalContent = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  text-align: center;
  h4 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 1.8em;
    line-height: 2em;
    margin: 0;
  }
  p {
    font-size: 1em;
    line-height: 1.5;
  }

  ${Button} {
    margin: 8px auto;
  }

  ${SongRow} {
    ${Block} {
      width: auto;
      text-align: left;
    }
  }

  @media screen and (max-width: 620px) {
    text-align: left;
    align-items: flex-start;
  }
`;

export const Modal = ({ children, handleClose }) => {
  return (
    <>
      <ModalScreen onClick={handleClose} />
      <ModalWrapper>
        <IconButton
          borderColor="transparent"
          textColor="#EBE8FF"
          hoverColor="transparent"
          onClick={handleClose}
        >
          <i className="fa fa-times"></i>
        </IconButton>
        <ModalContent direction="column">{children}</ModalContent>
      </ModalWrapper>
    </>
  );
};
