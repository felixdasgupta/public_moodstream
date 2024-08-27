import HostContextWrapper from "./hostContext"
import PlayerContextWrapper from "./playerContext"
import LoginContextWrapper from "./loginContext"
import SpotifyContextWrapper from "./spotifyContext"
import SearchContextWrapper from "./searchContext"

export default function MoodstreamContextWrapper({ children }) {
  return (
    <LoginContextWrapper>
      <SpotifyContextWrapper>
        <HostContextWrapper>
          <PlayerContextWrapper>
            <SearchContextWrapper>{children}</SearchContextWrapper>
          </PlayerContextWrapper>
        </HostContextWrapper>
      </SpotifyContextWrapper>
    </LoginContextWrapper>
  )
}
