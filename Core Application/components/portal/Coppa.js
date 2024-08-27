import { IconButton } from "../styled/Buttons";
import { MenuWrapper } from "../styled/Menu";

const Coppa = () => {
  return (
    <MenuWrapper>
      <img
        className="restaurant-logo"
        src="/static/coppa_logo.png"
        alt="Coppa"
        title="Coppa"
      ></img>
      <h1>Welcome to COPPA!</h1>
      <h3>
        Enjoy a fresh <strong className="purple">coppa</strong> coffee in our
        rustic & urban venue in the heart of NoMad.
      </h3>
      <a
        href="https://www.instagram.com/coppanomad/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton size="med">
          <i className="fab fa-instagram"></i>
        </IconButton>
      </a>
    </MenuWrapper>
  );
};

export default Coppa;
