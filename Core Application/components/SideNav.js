import { SideNavWrapper, Screen, NavItem, NavList } from "./styled/Nav";
import { HeaderLink } from "./styled/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";

const AnimatedNavList = animated(NavList);
const AnimatedScreen = animated(Screen);

const SideNav = ({ onNavToggle }) => {
  const { pathname } = useRouter();
  const styles = useSpring({
    to: { left: 0, opacity: 1 },
    from: { left: -400, opacity: 0 },
    delay: 200
  });

  const screenStyle = useSpring({
    to: { opacity: 0.7 },
    from: { opacity: 0 }
  });

  return (
    <SideNavWrapper>
      <AnimatedScreen
        style={screenStyle}
        onClick={onNavToggle}
      ></AnimatedScreen>
      <AnimatedNavList style={styles}>
        <HeaderLink onClick={onNavToggle}>
          <img src="/static/animo.png" alt="Animo" title="Animo"></img>
        </HeaderLink>
        <Link href="/moodstream">
          <NavItem
            className={pathname === "/moodstream" && "active"}
            onClick={onNavToggle}
          >
            <i className="fas fa-home"></i> Home
          </NavItem>
        </Link>
        <Link href="/moodstream/library">
          <NavItem
            className={pathname === "/moodstream/library" && "active"}
            onClick={onNavToggle}
          >
            <i className="fab fa-spotify"></i> Library
          </NavItem>
        </Link>
        <Link href="/clients">
          <NavItem
            className={pathname === "/clients" && "active"}
            onClick={onNavToggle}
          >
            <i className="fas fa-adjust"></i> Client Portal
          </NavItem>
        </Link>
        <Link href="/moodstream/gems">
          <NavItem
            className={pathname === "/gems" && "active"}
            onClick={onNavToggle}
          >
            <i className="fas fa-gem"></i> Mood Gems
          </NavItem>
        </Link>
        <a
          href="http://eepurl.com/g7SfAf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NavItem type="special" onClick={onNavToggle}>
            <i className="fas fa-paper-plane"></i> Subscribe for Updates
          </NavItem>
        </a>
      </AnimatedNavList>
    </SideNavWrapper>
  );
};

export default SideNav;
