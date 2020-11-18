import React from 'react';
import Character from './character';
import './characters-display.css';

class CharactersDisplay extends React.Component {
    
    state = {
        characters: [],
        output: ''
    }

    charactersEmpty = () => {
        return (Object.values(this.state.characters).length === 0)
    }

    addCharacter = (region, realm, name) => {
        var characters = this.state.characters;

        var newCharacter = (
            <span>
                <button className='Remove-button' onClick={() => this.removeButton(newCharacter)}>X</button>
                <Character region={region} realm={realm} name={name}></Character>
            </span>
        )

        characters.push(newCharacter)
        this.setState({ characters: characters })

        this.updateOutput();
        document.getElementById('character-output').hidden = false;
    }

    removeButton = (removeCharacter) => {
        var characters = this.state.characters;
        var indexToBeRemoved = characters.indexOf(removeCharacter);

        delete characters[indexToBeRemoved]
        this.setState({ characters: characters });

        this.updateOutput();
        if (this.charactersEmpty()) {
            document.getElementById('character-output').hidden = true;
        }
    }

    addButton = () => {
        var inputName = document.getElementById('character-input').value;
        var inputRegion = document.getElementById('region-input').value;
        var inputServer = document.getElementById('server-input').value;
        if (inputName != "") {
            this.addCharacter(inputRegion, inputServer, inputName);
            document.getElementById('character-input').value = "";
        }
    }

    updateOutput = () => {
        var characters = this.state.characters;
        var charactersList = []
        characters.forEach((item, index) => {
            var name = item.props.children[1].props.name
            charactersList.push(name);

            var icon = document.getElementById(name+'-icon')
            console.log(icon?.getAttribute('role'))
        });

        document.getElementById('character-output').textContent = 
        'RAID COMPOSITION @here  \n-----------------------\n' + charactersList;
    }

    renderCharacters = () => {
        if (this.charactersEmpty()) {
            return (
                <div>
                    <div className='Empty-composition'>Composition is Empty</div>
                    <div className='Empty-composition-explanation'>Add some raid members in the box above!</div>
                </div>
            );
        }
        
        return this.state.characters;
    }

    renderRegionDropdown = () => {
        return (
            <span>
                <select className='Dropdown' id="region-input">
                    <option value="eu">EU</option>
                    <option value="na">NA</option>
                </select>
            </span>
        )
    }
    
    renderServerDropdown = () => {
        return (
            <span>
                <select className='Dropdown' id="server-input">
                    <option value="draenor">Draenor</option>
                    <option value="kazzak">Kazzak</option>
                    <option value="silvermoon">Silvermoon</option>
                </select>
            </span>
        )
    }

    render = () => {
        return (
            <div>
                <div className='Buttons'>
                    <span className='Character-input'>
                        <input className='Character-input-box' id='character-input'></input>
                    </span>
                    <button className='Add-button' onClick={this.addButton}>+</button>
                    <div>
                        {this.renderRegionDropdown()}
                        {this.renderServerDropdown()}
                    </div>
                </div>
                <div className='Characters'>
                    {this.renderCharacters()}
                </div>
                <div className='Character-output'>
                    <textarea className='Character-output-box' id='character-output' readOnly hidden></textarea>
                </div>
            </div>
        )
    }
}

export default CharactersDisplay;