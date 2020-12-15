import React from 'react';
import Character from './character';
import './characters-display.css';

class CharactersDisplay extends React.Component {
    
    state = {
        characters: [],
        output: '',
        buttonText: 'Copy to Clipboard'
    }

    copyText = null;

    storeCharacters = (region, realm, name) => {
        var storedCharacters = window.localStorage.getItem("characters");
        if (storedCharacters !== null) { 
            storedCharacters = JSON.parse(storedCharacters)
        } 
        else storedCharacters = [];

        storedCharacters.push({region, realm, name});
        window.localStorage.setItem("characters", JSON.stringify(storedCharacters));
    }

    removeCharacter = (name) => {
        var parsedCharacters = JSON.parse(window.localStorage.getItem("characters"));
        var indexToBeRemoved;
        parsedCharacters.forEach((char, i) => {
            if (char && char.name === name) {
                indexToBeRemoved = i;
            }
        });
        
        delete parsedCharacters[indexToBeRemoved];
        window.localStorage.setItem("characters", JSON.stringify(parsedCharacters));
    }

    getCharacters = () => {
        var localStorageCharacters = window.localStorage.getItem("characters");
        var parsedCharacters = JSON.parse(localStorageCharacters);

        if (parsedCharacters) {
            parsedCharacters.forEach((char) => {
                if (char) {
                    this.addCharacter(char.region, char.realm, char.name, false);
                }
            });
        }
    }

    charactersEmpty = () => {
        return (Object.values(this.state.characters).length === 0)
    }

    addCharacter = (region, realm, name, store) => {
        var characters = this.state.characters;

        var newCharacter = (
            <span key={name}>
                <button className='Remove-button' onClick={() => this.removeButton(newCharacter)}>X</button>
                <Character region={region} realm={realm} name={name}></Character>
            </span>
        )

        characters.push(newCharacter)
        this.setState({ characters: characters })

        this.updateOutput();
        document.getElementById('character-output').hidden = false;

        if (store) {
            this.storeCharacters(region, realm, name);
        }
    }

    removeButton = (removeCharacter) => {
        var characters = this.state.characters;
        var indexToBeRemoved = characters.indexOf(removeCharacter);

        console.log(removeCharacter.key);
        this.removeCharacter(removeCharacter.key);

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
        if (inputName !== "") {
            this.addCharacter(inputRegion, inputServer, inputName, true);
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
        });

        document.getElementById('character-output').textContent = 
        'RAID COMPOSITION @here  \n-----------------------\n' + charactersList;
    }

    copyToClipboard = () => {
        this.copyText.select();
        document.execCommand("copy");

        this.setState({
            buttonText: 'Copied!'
        })
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

    renderCopyButton = () => {
        if (!this.charactersEmpty()) {
            return (
                <button className='Copy-button' onClick={this.copyToClipboard}>
                    {this.state.buttonText}
                </button>
            )
        }
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

    componentDidMount = () => {
        this.getCharacters();
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
                    <textarea className='Character-output-box' id='character-output' ref={(ref) => this.copyText = ref} readOnly hidden></textarea>
                    <div>
                        {this.renderCopyButton()}
                    </div>
                </div>
            </div>
        )
    }
}

export default CharactersDisplay;