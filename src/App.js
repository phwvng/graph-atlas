// Description: This is the main file for the GraphPolaris Use Case Repository.
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' exact element={<Home/>} />

      </Routes>
    </Router>
    </>
  );
}



export default App;
