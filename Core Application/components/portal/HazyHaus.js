import styled from "styled-components";
import { Button, IconButton } from "../styled/Buttons";
import { FlexContainer } from "../styled/Containers";
import { MenuWrapper } from "../styled/Menu";

const HazyHausIntro = styled(MenuWrapper)`
  margin: 16px auto;
  padding: 16px;
  background: linear-gradient(270deg, #8ec5fc -1.25%, #e0c3fc 101.25%);
  width: calc(100% - 24px);
  overflow: auto;

  h1 {
    font-family: Audiowide, Helvetica, Arial, sans-serif;
  }

  h1,
  h3 {
    text-align: left;
    max-width: 600px;
    margin: 0 auto 12px;
  }

  ${Button} {
    margin: 15px auto;
  }

  .restaurant-logo {
    margin: 0 auto 15px;
    width: 100px;

    @media screen and (max-width: 667px) {
      width: 80px;
    }
  }
`;

const HazyHaus = () => {
  return (
    <HazyHausIntro>
      <img
        className="restaurant-logo"
        src="/static/hazyhaus_logo.png"
        alt="Hazy Haus"
        title="Hazy Haus"
      ></img>
      <h1>Welcome to HazyHaüs!</h1>
      <h3>
        HAZYHAÜS is an invite-only members social club. Members enjoy perks and
        access to a vast network of like minded people.
      </h3>
      <a
        href="https://www.hazyhaus.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Become A Member</Button>
      </a>
      <a
        href="https://www.instagram.com/hazyhaus/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton size="med">
          <i className="fab fa-instagram"></i>
        </IconButton>
      </a>
    </HazyHausIntro>
  );
};

export default HazyHaus;
