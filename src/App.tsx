import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <label>Current Turnip Price</label>
          <input type="number" />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
