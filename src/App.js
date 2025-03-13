// Description: This is the main file for the GraphPolaris Use Case Repository.
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages';
import ExplorePage from './pages/explore';



function App() {
  return (       
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home />} exact/>
      <Route path='explore' element={<ExplorePage  />} exact/>
      <Route path='explore/domains/:domainId' element={<ExplorePage />} exact/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
