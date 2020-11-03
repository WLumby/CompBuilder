import React from 'react';
import Timer from './timer';
import CharactersDisplay from './characters-display';
import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./images/Shadowlands_Logo.png')}/>
          <Timer date='Nov 23, 2020 23:00:00'></Timer>
          <CharactersDisplay/>
        </header>
      </div>
    );
  }
}

export default App;
