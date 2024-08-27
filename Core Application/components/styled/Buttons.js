import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Tooltip = styled.span`
  position: absolute;
  width: auto;
  z-index: 9;
  padding: 0 5px;
  background: #ebe8ff;
  color: #8780b3;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 700;
  transition: all 300ms ease-out;
  opacity: 0;
  visibility: hidden;
  white-space: nowrap;
  margin: 0 auto;
  font-size: 0.7em;
  pointer-events: none;
  top: unset;
  left: unset;
  right: unset;
  bottom: unset;
  transform: none;

  i {
    margin: 0 5px 0 0;
  }

  ${props =>
    props.active &&
    `
    opacity: 1;
    visibility: visible;
    `}

  ${props => {
    switch (props.position) {
      case "top-right":
        return `
          left: calc(100% - 15px);
          text-align: left;
          top: -15px;
          border-radius: 3px 6px 9px 0px;
        `;
      case "top-left":
        return `
          right: calc(100% - 15px);
          text-align: right;
          top: -15px;
          border-radius: 3px 6px 0 9px;
        `;
      case "bottom-left":
        return `
          right: calc(100% - 15px);
          text-align: right;
          bottom: -15px;
          border-radius: 6px 0px 3px 9px;
        `;
      case "bottom-right":
        return `
          left: calc(100% - 15px);
          text-align: left;
          bottom: -15px;
          border-radius: 0px 6px 3px 9px;
        `;
      case "top-center":
        return `
          left: 50%;
          top: -15px;
          transform: translate(-50%, 0%);
          border-radius: 9px;
          padding: 0 10px;
        `;
      case "bottom-center":
        return `
          left: 50%;
          bottom: -15px;
          transform: translate(-50%, 0%);
          border-radius: 9px;
          padding: 0 10px;
        `;
      default:
        return `
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 9px;
          padding: 0 10px;
        `;
    }
  }}
`;

const Button = styled.button`
  background-color: ${props => props.bgColor || "transparent"};
  border: 1px solid ${props => props.borderColor || "#3d3378"};
  border-radius: 50px;
  min-width: 125px;
  color: ${props => props.textColor || "#3d3378"};
  cursor: pointer;
  line-height: 2;
  padding: 8px 22px;
  text-overflow: ellipsis;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  transition: all 300ms ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || "0"};
  &:hover {
    background: ${props => props.hoverColor || "#ebe8ff"};
    color: ${props => props.hoverTextColor || "#3d3378"};
  }
  position: relative;

  ${props =>
    props.icon &&
    `
      padding: 8px 22px 8px 62px;
      position: relative;

      > i {
        font-size: 1.5em;
        margin: 0 30px 0 0;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
      }

      > img {
        width: 30px;
        height: auto;
        margin: 0 30px 0 0;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translate(0, -50%);
      }


      @media screen and (max-width: 667px) {
        padding: 10px 15px 10px 45px;
        i {
          font-size: 1.2em;
        }
        > img {
          width: 30px;
        }
      }
  `}

  ${props =>
    props.btnType === "client" &&
    `
      background: linear-gradient(270deg, #FC6076 0%, #FFC745 100%);
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 400;
      color: #fff;
      &:hover {
        background: linear-gradient(170deg, #FC6076 10%, #FFC745 100%);
        color: #3d3378;
        box-shadow: 2px 2px 5px #3d3378;
      }
  `}

  ${props => props.noClick && `pointer-events: none;`}

  ${props => props.disabled && `pointer-events: none; opacity: 0.5;`}

  ${props =>
    props.isLoading &&
    `
     pointer-events:none;
     opacity: 0.5;
    `}

  ${props =>
    props.size === "mini" &&
    `
      font-size: 0.8em;
      line-height: 1em;

      i {
        font-size: 1em;
      }
      > img {
        width: 25px;
      }
  `}

  ${props =>
    props.size === "large" &&
    `
      font-size: 1.5em;
      line-height: 1.2em;
      padding: 24px 30px;

      i {
        font-size: 2em;
      }
      > img {
        width: 40px;
      }
  `}

  ${props =>
    props.size === "large" &&
    props.icon &&
    `
        padding: 24px 30px 24px 75px;
      `}

  ${props =>
    props.size === "huge" &&
    `
      font-size: 2em;
      line-height: 1.5em;
      padding: 30px 45px;

      i {
        font-size: 3em;
      }

      > img {
        width: 50px;
      }
  `}

  ${props =>
    props.size === "huge" &&
    props.icon &&
    `
        padding: 30px 45px 30px 90px;
      `}

  @media screen and (max-width: 667px) {
      font-size: 0.8em;
      line-height: 2em;
      width: 100%;
      opacity: 1;
      margin: ${props => props.mMargin || "0"};
  }
`;

const DarkButton = styled(Button)`
  background-color: #3d3378;
  border: 1px solid #3d3378;
  color: #fff;

  &:hover {
    color: #3d3378;
  }
`;

const IconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1em;
  padding: 0;
  min-width: unset;

  ${props =>
    props.size === "mini" &&
    `
      width: 24px;
      height: 24px;

      i {
        font-size: 0.7em;
      }
  `}

  ${props =>
    props.size === "med" &&
    `
      width: 45px;
      height: 45px;

      i {
        font-size: 1.5em;
      }
  `}

  ${props =>
    props.size === "large" &&
    `
      width: 64px;
      height: 64px;

      i {
        font-size: 2em;
      }
  `}

  ${props =>
    props.size === "huge" &&
    `
      width: 96px;
      height: 96px;

      i {
        font-size: 3em;
      }
  `}

  ${props =>
    props.dark &&
    `background-color: #3d3378;
    border: 1px solid #3d3378;
    color: #fff;

  &:hover {
    color: #3d3378;
  }`}
`;

export { DarkButton, Button, IconButton, Tooltip };
