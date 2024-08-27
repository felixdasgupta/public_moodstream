import React from "react";
import styled from "styled-components";

const SwitchInput = styled.input`
  display: none;
`;

export const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  border: 2px solid #ebe8ff;
  position: relative;
  transition: background-color 0.2s;
  pointer-events: none;

  ${props =>
    props.enabled &&
    `
      background: #65d26e;
    `}
`;

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 45px;
  transition: 0.2s;
  background: #ebe8ff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

const Switch = ({ id, toggled, onChange, readOnly }) => {
  return (
    <>
      <SwitchInput
        className="switch-checkbox"
        id={id}
        type="checkbox"
        checked={toggled}
        onChange={onChange}
        readOnly={readOnly}
      />
      <SwitchLabel enabled={toggled} className="switch-label" htmlFor={id}>
        <SwitchButton className="switch-button" />
      </SwitchLabel>
    </>
  );
};

export default Switch;
