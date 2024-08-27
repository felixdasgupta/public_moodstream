import Link from "next/link";
import { connect, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";

import {
  HeaderActions,
  HeaderContainer,
  HeaderLink
} from "components/styled/Header";
import router, { useRouter } from "next/router";
import ClientNavDropdown from "./ClientNavDropdown";
import { useEffect, useState } from "react";

const ClientHeader = ({ session }) => {
  const { pathname } = useRouter();
  const { user, error, isLoading } = useUser();
  const { track } = useSelector(state => state.playback);
  const [checkExpires, setCheckExpires] = useState(false);

  setTimeout(() => {
    setCheckExpires(true);
  }, 1000 * 60 * 60);

  useEffect(() => {
    if (!session.user || !checkExpires) return;
    router.reload(window.location.pathname);
  }, [track, checkExpires]);

  return (
    <HeaderContainer>
      <Link href="/clients/room">
        <HeaderLink>
          <img src="/static/animo.png" alt="Animo" title="Animo"></img>
          <h4>Animo's Moodstream</h4>
        </HeaderLink>
      </Link>
      <HeaderActions>
        <Link href="/clients/room">
          <a className={pathname === "/clients/room" ? "active" : ""}>Room</a>
        </Link>
        <Link href="/clients/station">
          <a className={pathname === "/clients/station" ? "active" : ""}>
            Station
          </a>
        </Link>
        <Link href="/moodstream/library">
          <a className={pathname === "/moodstream/library" ? "active" : ""}>
            Library
          </a>
        </Link>
        {!error && !isLoading && <ClientNavDropdown {...user} />}
      </HeaderActions>
    </HeaderContainer>
  );
};

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, null)(ClientHeader);
