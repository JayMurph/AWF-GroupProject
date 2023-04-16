// import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles.module.css";

export const Header = styled.div`
	background:var(--navBackground); 
	display: flex;
	flex-direction:row;
	min-height: 85px;
	height: 10vh;
	min-width:0px;
	justify-content: space-between;
	z-index: 12;
`;

export const ProfileMenu = styled.div`
	float: left;
	background:var(--navBackground); 
	display: flex;
	flex-direction:column;
	height: 100vh;
	width: 20vw;
`;


export const Title = styled.h1`
	position:absolute;
	padding-left:3vw;
	@media screen and (max-width: 560px) {
		display: none;
	}
`;

export const TitleAccount = styled.h1`
	position:absolute;
	padding:5vh 80px 5vh 80px;
`;

export const MenuAccount = styled.div`
	position:absolute;
	left: 5%;
    top: 30%;
`;

export const ButtonAccount = styled(Link)`
	color: var(--navText);
	display: flex;
	align-items: center;
	text-decoration: none;
	padding-top:2vh;
	padding-bottom:2vh;
	height: 90%;
	font-size: 120%;
	cursor: pointer;
	&.active {
		color: var(--navTextActive)
	}
`;

export const Nav = styled.nav`
	display: flex;
	min-width:0px;
	justify-content: space-between;
	margin-left:auto;
`;

export const NavLink = styled(Link)`
	color: var(--navText);
	display: flex;
	align-items: center;
	text-decoration: none;
	padding-right:16px;
	padding-left:16px;
	height: 90%;
	cursor: pointer;
	&.active {
		color: var(--navTextActive)
	}
`;

export const NavMenu = styled.div`
	display: flex;
	@media screen and (max-width: 300px) {
		display: none;
	}
`;