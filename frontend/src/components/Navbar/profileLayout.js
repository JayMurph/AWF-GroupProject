import React from "react";
import { ButtonAccount, MenuAccount, ProfileMenu, TitleAccount } from "./NavbarElements";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
	<>
	<ProfileMenu>
		<TitleAccount>Account</TitleAccount>
			<MenuAccount>
			<ButtonAccount to="/profile/" activeStyle>
				Main
			</ButtonAccount>
			<ButtonAccount to="/profile/details" activeStyle>
				Profile
			</ButtonAccount>
			<ButtonAccount to="/profile/changePassword" activeStyle>
				Change Password
			</ButtonAccount>
			</MenuAccount>
	</ProfileMenu>
	<Outlet />
	</>
	);
};

export default ProfileLayout;
