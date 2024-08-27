import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "flex-start"};
  flex-direction: ${props => props.direction || "row"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  color: #fff;
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "auto"};
  padding: ${props => props.padding || "0"};
  margin: ${props => props.margin || "0"};
  position: relative;
  background: ${props => props.background || "transparent"};

  @media screen and (max-width: 667px) {
    flex-wrap: ${props => props.mWrap || "wrap"};
    width: ${props => props.mWidth || "100%"};
    padding: ${props => props.mPadding || "0 10px"};
    margin: ${props => props.mMargin || "0"};
    overflow: auto;
    justify-content: ${props => props.mJustify || "flex-start"};
    align-items: ${props => props.mAlign || "flex-start"};
    ${props =>
      props.mDirection &&
      `
      flex-direction: ${props.mDirection};
    `}
`;

const Block = styled.div`
  flex-grow: ${props => props.grow || "0"};
  flex-shrink: ${props => props.shrink || "0"};
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "auto"};
  padding: ${props => props.padding || "0"};
  margin: ${props => props.margin || "0"};

  @media screen and (max-width: 667px) {
    width: ${props => props.mWidth || "100%"};
    padding: ${props => props.mPadding || "0"};
    margin: ${props => props.mMargin || "0"};
    overflow: auto;
  }

  &.pixel {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
  }
`;

export { FlexContainer, Block };
