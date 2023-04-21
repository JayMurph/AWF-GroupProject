import React from "react";
import {
  ButtonAccount,
  MenuAccount,
  ProfileMenu,
  ProfileMenuFlexContainer,
  TitleAccount,
} from "./NavbarElements";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <ProfileMenuFlexContainer>
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
    </ProfileMenuFlexContainer>
  );
};

export default ProfileLayout;
