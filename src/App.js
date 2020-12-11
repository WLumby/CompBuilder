import React from 'react';
import CharactersDisplay from './characters-display';
import InfoText from './info-text';
import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <header className="Header">
          CompBuilder
        </header>
        <div className="Main-content">
          <CharactersDisplay/>
        </div>
        <footer className="Footer">
          <div className="Footer-text">
            <InfoText/>
            <InfoText/>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
