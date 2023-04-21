// import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles.module.css";

export const Header = styled.div`
  background: var(--navBackground);
  display: flex;
  flex-direction: row;
  min-width: 0px;
  justify-content: space-between;
  z-index: 12;

  min-height: 10vh;
  height: 10vh;
  @media screen and (max-width: 640px) {
    min-height: 48px;
    height: 48px;
  }
`;

export const ProfileMenuFlexContainer = styled.div`
  display:flex;
  flex-direction:row;
  height:100%;
  width:100%;
  @media screen and (max-width: 640px) {
    flex-direction:column;
  }
`

export const ProfileMenu = styled.div`
 flex-shrink:0;
	background:var(--navBackground); 
	display: flex;
	flex-direction:column;
  min-height:0;

	height: 100%;
	width: 230px;

  @media screen and (max-width:1000px) {
    width: 200px;
  }

  @media screen and (max-width: 640px) {
    height: 32px;
    width: 100%;
  }
`;

export const Title = styled.h1`
  padding-left: 3vw;
  font-size: 4vh;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const TitleAccount = styled.h2`
	margin-left: 48px;
  margin-top: 16px;
  @media screen and (max-width:1000px) {
    margin-left: 24px;
  }
  @media screen and (max-width: 640px) {
    display:none;
  }
`;

export const MenuAccount = styled.div`
  display:flex;
  flex-direction:column;

  height:min-content;
  margin-top: 8px;
	margin-left: 48px;

  @media screen and (max-width:1000px) {
    margin-left: 24px;
  }
  @media screen and (max-width: 640px) {
    margin-left: 0px;
    margin-top: 0px;
    display:flex;
    flex-direction:row;
    margin-left: 22px;
    justify-content: space-evenly;
    align-items:center;
  }
`;

export const ButtonAccount = styled(Link)`
	color: var(--navText);
	text-decoration: none;
	padding-top:2vh;
	padding-bottom:2vh;
	height: 90%;
	cursor: pointer;

	&.active {
		color: var(--navTextActive)
	}

	font-size: 18px;
  @media screen and (max-width: 640px) {
    padding-top:0;
    padding-bottom:0;
    font-size: 14px;
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
  @media screen and (max-width: 640px) {
    padding-right: 8px;
    padding-left: 8px;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  @media screen and (max-width: 300px) {
    display: none;
  }
`;
