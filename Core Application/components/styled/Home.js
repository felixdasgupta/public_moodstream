import styled from "styled-components";
import { FlexContainer, Block } from "./Containers";
import { Button, DarkButton } from "./Buttons";
import { UserNameContainer } from "./Profile";

export const HomeWrapper = styled(FlexContainer)`
  text-align: center;
  min-height: 100vh;
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
  flex-wrap: nowrap;

  &.hazy-haus {
    background: url("/static/hazyhaus_bg.png") repeat center center fixed;
    justify-content: flex-end;
  }

  h1 {
    margin: 0 auto 15px;
  }

  h3 {
    margin: 0 auto 30px;
    color: #8780b3;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 100;
    a {
      display: block;
    }
  }

  p {
    margin: 0 0 15px;
    text-align: left;
    line-height: 1.5;
  }

  .purple {
    color: #f5a6ff;
  }

  .spotify {
    color: #65d26e;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    text-decoration: underline;
  }

  .login {
    margin: 0 0 15px;
  }

  .animo-image {
    width: 200px;
    height: auto;
    margin: 0 0 10px;

    &__dark {
      width: 50px;
    }
  }

  .disclaimer {
    margin: 30px auto 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
  }

  .restaurant-logo {
    margin: 0 auto;
    width: 140px;
    height: auto;
  }

  @media screen and (max-width: 667px) {
    &.hazy-haus {
      justify-content: space-between;
    }

    .animo-image {
      width: 80px;
      margin: 0 auto 10px;
      &__dark {
        width: 37px;
      }
    }

    .restaurant-logo {
      width: 100px;
      height: auto;
      margin: 30px auto 0;
    }
  }
`;

export const SlideWrapper = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  background: #221a5a;
  border-radius: 10px;
  max-width: 667px;
  padding: 40px 60px;
  text-align: center;
  flex-direction: column;
  @media screen and (max-width: 667px) {
    background: transparent;
    padding: 0;
  }
`;

export const FullSlideWrapper = styled(SlideWrapper)`
  width: 100%;
  max-width: unset;
  border-radius: 10px 10px 0 0;
  filter: drop-shadow(0px -10px 15px rgba(0, 0, 0, 0.25));
  height: auto;
  min-height: 30vh;

  ${FlexContainer}, ${Block} {
    margin: 0 auto 30px;
    text-align: left;
    max-width: 1200px;
    padding: 0px 60px;

    h1 {
      margin: 0 15px;
    }
  }

  ${FlexContainer} {
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (max-width: 667px) {
    background: #221a5a;
    padding: 15px;
    height: auto;
    min-height: 350px;
    ${FlexContainer}, ${Block} {
      padding: 0px 10px;
      margin: 10px 0;
    }

    h1 {
      font-size: 24px;
    }

    h1,
    p {
      margin: 0;
    }
  }
`;

export const SpotifyLoginWrapper = styled(FlexContainer)`
  padding: 30px;

  h1 {
    margin: 0 0 15px;
  }

  .spotify {
    color: #65d26e;
  }

  ul {
    list-style: circle;
    padding: 0 0 0 0;
    margin: 0 0 30px;
    li {
      margin: 0 0 5px;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 100;
    }
  }

  ${Button}, ${DarkButton} {
    margin: 0 auto 16px;
  }

  ${UserNameContainer} {
    h4 {
      text-transform: capitalize;
    }
  }

  .animo-image {
    width: 200px;
    height: auto;
    margin: 0 0 30px;
  }

  @media screen and (max-width: 667px) {
    .animo-image {
      width: 80px;
    }
  }
`;
