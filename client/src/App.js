import React from 'react';
import Header from './components/header';
import './css/global.css';
import Router from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
