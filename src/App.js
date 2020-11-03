import React from 'react';
import Timer from './timer';
import Character from './character';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./images/Shadowlands_Logo.png')}/>
          <Timer date='Nov 23, 2020 23:00:00'></Timer>
          <div className='Characters'>
            <Character region='eu' realm='draenor' name='wyvurn'></Character>
            <Character region='eu' realm='draenor' name='durakan'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='modsognir'></Character>
            <Character region='eu' realm='draenor' name='angrypotatoe'></Character>
            <Character region='eu' realm='draenor' name='derackon'></Character>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
