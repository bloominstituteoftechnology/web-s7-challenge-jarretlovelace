import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './Home';
import Form from './Form';

function App() {
  return (
    <Router>
      <div id="app">
        <nav>
          <NavLink exact="true" to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/order" activeClassName="active">Order</NavLink>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/order" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
