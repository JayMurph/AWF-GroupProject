import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signup';
import Quiz from './pages/quiz';
import { AppContentContainer } from './StyledElements';

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function App() {
	const [authenticated, setAuthenticated] = useState(false);

return (
	<Router>
	<Navbar authenticated={authenticated}/>
	<AppContentContainer>
		<Routes>
			<Route exact path='/' element={<Home />} />
			<Route path='/about' element={<About/>} />
			<Route path='/login' element={<Login/>} />
			<Route path='/sign-up' element={<SignUp/>} />
			{authenticated ? <Route path='/quiz' element={<Quiz/>} /> : <></>}
		</Routes>
	</AppContentContainer>
	</Router>
);
}

export default App;
