// Description: This is the main file for the GraphPolaris Use Case Repository.
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages';
import ExplorePage from './pages/explore';
import { ViewProvider } from './viewContext';



function App() {
  return (       
    <ViewProvider>
    <Router>
      <Routes>
      <Route path='/' element={<Home />} exact/>
      <Route path='explore' element={<ExplorePage  />} exact/>
      <Route path='explore/:domainDomain/:domainId' element={<ExplorePage />} exact/>
      <Route path='explore/upload' element={<ExplorePage />} exact/>
      </Routes>
    </Router>
    </ViewProvider>
  );
}

export default App;
