import Link from "next/link";
import { connect } from "react-redux";

import { HeaderContainer, HeaderLink } from "components/styled/Header";

import { UserImageContainer } from "components/styled/Profile";
import SpotifyLogin from "components/SpotifyLogin";
import { useState } from "react";
import { DarkButton } from "../styled/Buttons";
import { NavList, NavItem } from "../styled/Nav";

const getNameFromUser = user => {
  return user?.display_name || `Friend`;
};

const MobileHeader = ({ session, onNavToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderLink onClick={onNavToggle}>
        <i className="fa fa-bars"></i>
      </HeaderLink>
      <HeaderLink>
        <img src="/static/animo.png" alt="Animo" title="Animo"></img>
        <h4>Hi {getNameFromUser(session.user)}</h4>
      </HeaderLink>
      {session.user ? (
        <>
          <UserImageContainer
            style={{ margin: "0 0 0 0" }}
            active={menuOpen}
            onClick={() => toggleMenu()}
          >
            <img
              src={
                (session.user.images &&
                  session.user.images.length &&
                  session.user.images[0].url) ||
                "/static/user-icon.png"
              }
              alt={getNameFromUser(session.user)}
            />
          </UserImageContainer>
          {menuOpen && (
            <NavList>
              <NavItem>
                <Link href="/">
                  <DarkButton icon={true}>
                    <i className="fas fa-sign-out-alt"></i> Leave Moodstream
                  </DarkButton>
                </Link>
              </NavItem>
            </NavList>
          )}
        </>
      ) : (
        <SpotifyLogin></SpotifyLogin>
      )}
    </HeaderContainer>
  );
};

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, null)(MobileHeader);
