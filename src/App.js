import React from 'react';
import Provider from './context/MyContext';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <span>Hello, App!</span>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
