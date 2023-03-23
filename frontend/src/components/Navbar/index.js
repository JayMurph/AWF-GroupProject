import React from "react";
import { Nav, NavLink, NavMenu, Header, Title } from "./NavbarElements";

const Navbar = (props) => {
	const logout = () => {
		props.onLogout();
	}
  /*
   * !! Change available links depending on if user is logged in
   */
  return (
    <Header>
      <Title>Trivia Mania</Title>
      <Nav>
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          {props.authenticated ? (
			<>
				<NavLink to="/quiz" activeStyle>
				{" "}
				Quiz{" "}
				</NavLink>
				<NavLink onClick={logout} to="/">Logout</NavLink>
			</>
          ) : (
            <>
              <NavLink to="/login" activeStyle>
                {" "}
                Login{" "}
              </NavLink>
              <NavLink to="/sign-up" activeStyle>
                {" "}
                Sign Up{" "}
              </NavLink>
            </>
          )}
        </NavMenu>
      </Nav>
    </Header>
  );
};

export default Navbar;
