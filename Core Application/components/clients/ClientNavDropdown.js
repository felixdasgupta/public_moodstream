import { useState } from "react";
import styled from "styled-components";
import { NavItem, NavList } from "../styled/Nav";
import {
  UserProfileWrapper,
  UserImageContainer,
  UserNameContainer
} from "../styled/Profile";
import useComponentVisible from "helpers/dropdownHooks";
import Link from "next/link";

const NavAction = styled.div`
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8780b3;
  transition: all 300ms ease-out;
`;

const NavUserDropdownAction = styled.div`
  margin: 0 0 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #8780b3;
  border-radius: 5px;
  width: 150px;
  overflow: visible;
  cursor: pointer;
  transition: all 300ms ease-out;
  position relative;

  ${UserImageContainer} {
    width: 24px;
    height: 24px;
    margin: 0 8px 0 0;
    img {
      width: 24px;
    }
  }

  ${UserNameContainer} {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      font-size: 0.8em;
      line-height: 1;
    }
  }

    ${NavList} {
        position: absolute;
        top: calc(100% + 2px);
        right: 0;
        background-color: #190D48;
        padding: 12px 0;
        border-bottom: 2px solid #8780b3;

        ${NavItem} {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            &:hover {
                background: #BD10E0;
            }
        }
    }

  &:hover {
    border-color: #fff;
    ${NavAction} {
      color: #fff;
    }
  }
`;

const ClientNavDropdown = ({ nickname, picture, name }) => {
  const {
    ref,
    actionRef,
    isComponentVisible,
    toggleClickComponent
  } = useComponentVisible(false);

  return (
    <NavUserDropdownAction ref={actionRef} onClick={toggleClickComponent}>
      <UserProfileWrapper>
        <UserImageContainer>
          <img
            src={picture || "/static/user-icon.png"}
            alt={name}
            title={name}
          />
        </UserImageContainer>
        <UserNameContainer>
          <span>{nickname || name}</span>
        </UserNameContainer>
      </UserProfileWrapper>
      <NavAction>
        <i className="fas fa-ellipsis-h"></i>
      </NavAction>
      {isComponentVisible && (
        <NavList ref={ref}>
          <Link href="/api/auth/logout">
            <NavItem>
              <i className="fas fa-sign-out-alt"></i> Logout
            </NavItem>
          </Link>
        </NavList>
      )}
    </NavUserDropdownAction>
  );
};

export default ClientNavDropdown;
