// Description: This is the main file for the GraphPolaris Use Case Repository.
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages';


function App() {
  return (
    <>
    <Router>
    <Home />
      <Routes>
      <Route path='/' exact/>

      </Routes>
    </Router>
    </>
  );
}



export default App;
