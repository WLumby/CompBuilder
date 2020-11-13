import React from 'react';
import Character from './character';
import './characters-display.css';

class CharactersDisplay extends React.Component {
    
    state = {
        characters: [
                <Character region='eu' realm='draenor' name='wyvurn'></Character>,
                <Character region='eu' realm='draenor' name='durakan'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='modsognir'></Character>,
                <Character region='eu' realm='draenor' name='angrypotatoe'></Character>,
                <Character region='eu' realm='draenor' name='derackon'></Character>,
        ]
    }

    addCharacter = (region, realm, name) => {
        var characters = this.state.characters;
        var newCharacter = <Character region={region} realm={realm} name={name}></Character>
        characters.push(newCharacter)
        this.setState({ characters: characters })
    }

    addButton = () => {
        var input = document.getElementById('character-input').value;
        if (input != "") {
            this.addCharacter('eu', 'draenor', input);
            document.getElementById('character-input').value = "";
        }
    }
    
    render = () => {
        return (
            <div>
                <div className='Buttons'>
                    <span className='Character-input'>
                        <input className='Character-input-box' id='character-input'></input>
                    </span>
                    <button className='Add-button' onClick={this.addButton}>Add</button>
                </div>
                <div className='Characters'>
                    {this.state.characters}
                </div>
            </div>
        )
    }
}

export default CharactersDisplay;