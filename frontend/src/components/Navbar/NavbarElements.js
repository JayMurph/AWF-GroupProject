// import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles.module.css";

export const Header = styled.div`
  background: var(--navBackground);
  display: flex;
  flex-direction: row;
  min-height: 10vh;
  height: 10vh;
  min-width: 0px;
  justify-content: space-between;
  z-index: 12;
`;

export const Title = styled.h1`
  padding-left: 3vw;
  font-size: 4vh;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  min-width: 0px;
  justify-content: space-between;
  margin-left: auto;
  @media screen and (max-width: 640px) {
    margin-right: auto;
  }
`;

export const NavLink = styled(Link)`
  color: var(--navText);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-right: 16px;
  padding-left: 16px;
  height: 90%;
  cursor: pointer;
  &.active {
    color: var(--navTextActive);
  }
`;

export const NavMenu = styled.div`
  display: flex;
  @media screen and (max-width: 300px) {
    display: none;
  }
`;
