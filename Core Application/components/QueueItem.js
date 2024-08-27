import React from "react";
import { IconButton } from "./styled/Buttons";
import { UserImageContainer } from "./styled/Profile";
import {
  Cover,
  Name,
  Artist,
  ArtistBlock,
  SongRow,
  ActionsBlock,
  ExplicitTag
} from "./styled/Library";
import { Block, FlexContainer } from "./styled/Containers";
import Link from "next/link";
import app from "config/app";

const QueueItem = ({
  index,
  item,
  session,
  onRemoveItem,
  allowRemoval,
  voteUp
}) => {
  const canUserRemove =
    allowRemoval ||
    (item.user && session.user && item.user.id === session.user.id);
  const { CURRENT_CLIENT } = app;

  return (
    <SongRow type="queue" key={`${item.track.name}-${new Date()}-${index}`}>
      <ActionsBlock>
        {canUserRemove && (
          <IconButton
            borderColor="#bd10e0"
            textColor="#bd10e0"
            bgColor="#ebe8ff"
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            <i className="fas fa-minus"></i>
          </IconButton>
        )}
      </ActionsBlock>
      <Cover
        url={item.track.album.images[2] ? item.track.album.images[2].url : ""}
      >
        {item.explicit && <ExplicitTag>Explicit</ExplicitTag>}
      </Cover>
      <Block>
        <Name>{item.track.name}</Name>
        <ArtistBlock>
          {item.track.artists.map((a, ind) => (
            <Link
              href={{
                pathname: "/moodstream/artists/[artist]",
                query: { artist: a.id }
              }}
              key={`${item.track.name}-${a.name}-${new Date()}-${ind}`}
            >
              <Artist>
                {a.name}
                {ind < item.track.artists.length - 1 && ", "}
              </Artist>
            </Link>
          ))}
        </ArtistBlock>
      </Block>
      {item.user && (
        <ActionsBlock className="right">
          <IconButton
            dark
            onClick={() => {
              voteUp(item.id);
            }}
            margin="0 12px 0 0"
            mMargin="0 4px 0 0"
          >
            <i className="fas fa-chevron-up"></i>
          </IconButton>
          {item.voters.length > 0 && <h4>{item.voters.length}</h4>}
        </ActionsBlock>
      )}
      {item.user && CURRENT_CLIENT != "hazy-haus" && (
        <UserImageContainer mini>
          <img
            src={
              (item.user.images &&
                item.user.images.length &&
                item.user.images[0].url) ||
              "/static/user-icon.png"
            }
            alt={item.user.id}
            title={item.user.id}
          />
        </UserImageContainer>
      )}
    </SongRow>
  );
};

export default QueueItem;
