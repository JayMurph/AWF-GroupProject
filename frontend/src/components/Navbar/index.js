import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
return (
	<>
		<Nav>
			<NavMenu>
			<NavLink to="/about" activeStyle>
				About
			</NavLink>
			<NavLink to="/login" activeStyle>
				Login
			</NavLink>
			<NavLink to="/sign-up" activeStyle>
				Sign Up
			</NavLink>
			</NavMenu>
		</Nav>
	</>
	);
};

export default Navbar;
