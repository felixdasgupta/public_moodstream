import Link from "next/link";
import { connect } from "react-redux";

import { HeaderContainer, HeaderLink } from "./styled/Header";

import {
  UserProfileWrapper,
  UserImageContainer,
  UserNameContainer
} from "./styled/Profile";
import SpotifyLogin from "./SpotifyLogin";
import { DarkButton } from "./styled/Buttons";
import { useState } from "react";
import { NavItem, NavList } from "./styled/Nav";

const getNameFromUser = user => {
  return user?.display_name || user?.id;
};

const Header = ({ session, onNavToggle }) => {
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
      </HeaderLink>
      {session.user ? (
        <>
          <UserProfileWrapper onClick={() => toggleMenu()}>
            <UserImageContainer active={menuOpen}>
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
            <UserNameContainer>
              <span>{getNameFromUser(session.user)}</span>
            </UserNameContainer>
          </UserProfileWrapper>
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

export default connect(mapStateToProps, null)(Header);
