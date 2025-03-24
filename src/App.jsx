import React from 'react';
import { HalakList } from './HalakList';
import HalakSingle from './HalakSingle';
import { HalakMod } from './HalakMod';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Halak</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/hal/:halakId" element={<HalakSingle />} />
        <Route path="/" element={<HalakList />} />
        <Route path="/mod-halak/:halakId" element={<HalakMod />} />
      </Routes>
    </Router>
  );
}

export default App;