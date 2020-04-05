import React from 'react';
import logo from './logo.png';
import './App.css';
import Form from './PriceForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
      </header>
    </div>
  );
}

export default App;
