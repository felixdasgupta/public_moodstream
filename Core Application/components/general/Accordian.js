import { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Block, FlexContainer } from "../styled/Containers";
import { GemBlock, GemSvg } from "../styled/Mood";

const AccordianWrapper = styled(FlexContainer)`
  height: auto;
  flex-direction: column;
  background: transparent;
  border-top: 1px solid #ebe8ff;

  ${props => props.active && `background: #221A5A;`}

  &:hover {
    background: #221a5a;
  }

  ${GemBlock} {
    margin: 8px 16px 0 0;
  }

  ${GemSvg} {
    width: 50px;
    height: auto;
  }

  h2 {
    line-height: 2;
  }

  h2,
  p {
    text-transform: capitalize;
    margin: 0;
  }

  @media screen and (max-width: 667px) {
    ${GemBlock} {
      width: auto;
    }
    ${GemSvg} {
      width: 30px;
      height: auto;
    }
    ${GemBlock} {
      padding: 0;
    }
  }
`;

const AccordianHead = styled(FlexContainer)`
  justify-content: space-between;
  align: center;
  padding: 16px;
  width: 100%;
  white-space: nowrap;
  flex-wrap: nowrap;
  cursor: pointer;
  position: relative;
  transition: all 300ms ease-out;

  > ${Block} {
    width: 70%;
  }

  i {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2em;
    transition: all 300ms ease-out;
  }

  @media screen and (max-width: 667px) {
    padding: 16px 0;

    > ${Block} {
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    i {
      font-size: 1em;
    }

    h2 {
      font-size: 1.2em;
    }

    p {
      font-size: 0.8em;
    }
  }
`;

const AccordianBody = styled.div`
  text-align: left;
  display: block;
  transition: all 300ms ease-out;

  p {
    margin: 32px auto;
    text-transform: none;
  }

  @media screen and (max-width: 667px) {
    p {
      line-height: 1.5;
    }
  }
`;
const AnimatedAccordianBody = animated(AccordianBody);

const Accordian = props => {
  const [isOpen, setIsOpen] = useState(props.initOpen || false);

  const openStyle = useSpring({
    to: { padding: 16, opacity: 1, height: "auto" },
    from: { padding: 0, opacity: 0, height: 0 }
  });
  return (
    <AccordianWrapper active={isOpen}>
      <AccordianHead onClick={() => setIsOpen(!isOpen)}>
        <Block>{props.children}</Block>
        <i className={isOpen ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
      </AccordianHead>
      {isOpen && (
        <AnimatedAccordianBody style={openStyle}>
          <p>{props.description}</p>
        </AnimatedAccordianBody>
      )}
    </AccordianWrapper>
  );
};

export default Accordian;
