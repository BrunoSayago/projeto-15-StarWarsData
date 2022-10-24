import React from 'react';
import Provider from './context/MyContext';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Filters />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
