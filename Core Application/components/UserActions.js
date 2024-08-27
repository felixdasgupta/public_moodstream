import { useFollowAction } from "../helpers/saveHooks";

import { ActionsBlock } from "./styled/Library";
import { DarkButton, IconButton, Tooltip } from "./styled/Buttons";
import { useState } from "react";
import useWindowDimensions from "utils/useWindowDimensions";
import useMobileDetect from "utils/useMobileDetect";

export const FollowActions = props => {
  const { isFollowing, isFetchingFollow, followAction } = useFollowAction(
    props.item,
    props.session,
    props.type
  );

  const [isStoping, setIsStoping] = useState(false);

  const followActionSafe = item => {
    if (isStoping) {
      followAction(item);
      setIsStoping(false);
    } else {
      setIsStoping(true);
      setTimeout(() => {
        setIsStoping(false);
      }, 5000);
    }
  };

  let termSuccess,
    termAction = "";

  switch (props.type) {
    case "albums":
      termSuccess = "Saved in Library";
      termAction = "Save to Library";
      break;
    default:
      termSuccess = "Following";
      termAction = "Follow";
      break;
  }

  return (
    <ActionsBlock>
      {isFollowing ? (
        <DarkButton
          icon={true}
          onClick={() => followActionSafe(props.item)}
          isLoading={isFetchingFollow}
        >
          <i className="fas fa-check-circle"></i>
          {termSuccess}
          <Tooltip active={isStoping} position={"top-right"}>
            Click again to stop following this{" "}
            {props.type.slice(0, props.type.length - 1)}
          </Tooltip>
        </DarkButton>
      ) : (
        <DarkButton
          icon={true}
          onClick={() => followAction(props.item)}
          isLoading={isFetchingFollow}
        >
          <i className="fas fa-plus-circle"></i>
          {termAction}
        </DarkButton>
      )}
    </ActionsBlock>
  );
};

export const LikeActions = props => {
  const { isFollowing, isFetchingFollow, followAction } = useFollowAction(
    props.item,
    props.session,
    "tracks"
  );
  let { isMobile } = useMobileDetect();
  let { width } = useWindowDimensions();

  const [isStoping, setIsStoping] = useState(false);

  const followActionSafe = item => {
    if (isStoping) {
      followAction(item);
      setIsStoping(false);
    } else {
      setIsStoping(true);
      setTimeout(() => {
        setIsStoping(false);
      }, 5000);
    }
  };

  return (
    <ActionsBlock>
      <IconButton
        onClick={() =>
          isFollowing ? followActionSafe(props.item) : followAction(props.item)
        }
        isLoading={isFetchingFollow}
        textColor={"#F5A6FF"}
        borderColor={"transparent"}
        bgColor={"transparent"}
        size={"large"}
        hoverColor={"#511E94"}
      >
        <i className={isFollowing ? "fas fa-heart" : "far fa-heart"}></i>
        <Tooltip
          active={isStoping}
          position={width <= 667 || isMobile() ? "bottom-left" : "top-right"}
        >
          Click again to unlike this track
        </Tooltip>
      </IconButton>
    </ActionsBlock>
  );
};
