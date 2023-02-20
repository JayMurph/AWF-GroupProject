// import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles.module.css";

export const Header = styled.div`
	background:var(--navBackground); 
	height: 85px;
	display: flex;
	justify-content: space-between;
	z-index: 12;
`
export const Title = styled.h1`
	position:absolute;
	padding-left:3vw;
	@media screen and (max-width: 560px) {
		display: none;
	}
`

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	padding: 0.2rem calc((100vw - 350px));
	position:relative;
`;

export const NavLink = styled(Link)`
	color: var(--navText);
	display: flex;
	align-items: center;
	text-decoration: none;
	width: 100px;
	padding: 1 1rem;
	height: 90%;
	cursor: pointer;
	&.active {
		color: var(--navTextActive)
	}
`;

//export const Bars = styled(FaBars)`
//display: none;
//color: #808080;
//@media screen and (max-width: 768px) {
//	display: block;
//	position: absolute;
//	top: 0;
//	right: 0;
//	transform: translate(-100%, 75%);
//	font-size: 1.8rem;
//	cursor: pointer;
//}
//`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */
	/* Third Nav */
	/* width: 100vw; white-space: nowrap; */
	@media screen and (max-width: 300px) {
		display: none;
	}
`;
