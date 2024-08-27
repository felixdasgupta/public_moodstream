import React from "react";
import { FlexContainer } from "./styled/Containers";

import {
  UserImageContainer,
  UserNameContainer,
  UserList,
  UserListItem,
  UserListWrapper
} from "./styled/Profile";

const Users = ({ items, onRefresh }) => {
  if (!items || items === null) return <h4>No users...</h4>;
  return (
    <UserListWrapper width="100%" direction="column" mPadding="0 0 30px 0">
      <h2>Listeners</h2>
      <UserList>
        {items.map((i, index) => {
          if (i === null) {
            try {
              onRefresh();
            } catch (err) {
              console.error(err);
            }
            return;
          }

          const userName =
            i.display_name && i.display_name !== ""
              ? i.display_name
              : `${i.id}`;

          return (
            <UserListItem key={index}>
              <UserImageContainer>
                <img
                  src={
                    (i.images && i.images.length && i.images[0].url) ||
                    "/static/user-icon.png"
                  }
                  alt={userName}
                  title={userName}
                />
              </UserImageContainer>
              <UserNameContainer>
                <span>{userName}</span>
              </UserNameContainer>
            </UserListItem>
          );
        })}
      </UserList>
    </UserListWrapper>
  );
};

export default Users;
