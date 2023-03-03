import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signup';
import Quiz from './pages/quiz';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' exact element={<Home />} />
		<Route path='/about' element={<About/>} />
		<Route path='/login' element={<Login/>} />
		<Route path='/sign-up' element={<SignUp/>} />
		<Route path='/quiz' element={<Quiz/>} />
	</Routes>
	</Router>
);
}

export default App;
