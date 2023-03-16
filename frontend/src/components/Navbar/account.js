import React from "react";
import { Nav, NavLink, NavMenu, HeaderAccount, TitleAccount } from "./NavbarElements";

const NavbarAccount = () => {
	/*
	 * !! Change available links depending on if user is logged in
	 */
return (
	<HeaderAccount>
		<TitleAccount>Account</TitleAccount>
		<Nav>
			<NavMenu>
			<NavLink to="/accountMain" activeStyle>
				Main
			</NavLink>
			<NavLink to="/accountProfile" activeStyle>
				Profile
			</NavLink>
			<NavLink to="/changePassword" activeStyle>
				Change Password
			</NavLink>
			</NavMenu>
		</Nav>
	</HeaderAccount>
	);
};

export default NavbarAccount;
