import { connect } from "react-redux";
import { login } from "../actions/sessionActions";

import { DarkButton } from "./styled/Buttons";

const SpotifyLogin = ({ login }) => (
  <DarkButton icon={true} onClick={login}>
    <i className="fab fa-spotify"></i>
    Login with Spotify
  </DarkButton>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login())
});

export default connect(null, mapDispatchToProps)(SpotifyLogin);
