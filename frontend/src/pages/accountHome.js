import React from 'react';
import './App.css';
import NavbarAccount from './components/Navbar/account';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import AccountMain from './pages/accountMain';
import Profile from './pages/accountProfile';
import ChangePassword from './pages/changePassword';
import { AccountContentContainer } from './StyledElements';

function AccountHome() {
return (
	<Router>
	<NavbarAccount />
	<AccountContentContainer>
		<Routes>
			<Route index element={<AccountMain/>} />
			<Route path='/accountProfile' element={<Profile/>} />
			<Route path='/changePassword' element={<ChangePassword/>} />
		</Routes>
	</AccountContentContainer>
	</Router>
);
}

export default AccountHome;
