import styled from "styled-components";
import { FlexContainer } from "./Containers";

const UserListWrapper = styled(FlexContainer)``;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 12px 0 0;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  background: #221a5a;
  border: 2px solid transparent;
  position: relative;
  transition: all 300ms ease-out;

  &::after {
    content: "";
    display:block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
  }

  img {
    width: 40px;
    height: auto;
  }

  @media screen and (max-width: 667px) {
    width: 35px;
    height: 35px;
    img {
      width: 35px;
    }
  }

  ${props =>
    props.mini &&
    `
        width: 30px;
        height: 30px;
        img {
            width: 30px;
        }
    `}

  ${props =>
    props.large &&
    `
        width: 60px;
        height: 60px;
        img {
            width: 60px;
        }
    `}
  ${props =>
    props.active &&
    `
      border-color: #fff;
      &::after {
        background: rgba(0, 0, 0, 0.5);
      }
  `}
`;

const UserNameContainer = styled.div`
  width: auto;
  display: block;
  text-align: right;
  span {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;
    color: #fff;
    text-transform: capitalize;
  }
`;

const UserList = styled.ul`
  border-top: 1px solid #8780b3;
  list-style: none;
  margin: 0;
  padding: 20px 0 0 0;
  width: 100%;
`;

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0 1em;

  ${UserImageContainer} {
    width: 30px;
    height: 30px;
    img {
      width: 30px;
    }
  }

  ${UserNameContainer} {
    span {
      font-size: 0.8rem;
    }
  }
`;

export {
  UserProfileWrapper,
  UserImageContainer,
  UserNameContainer,
  UserList,
  UserListItem,
  UserListWrapper
};
