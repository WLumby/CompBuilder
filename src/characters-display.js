import React from 'react';
import BenchedCharacter from './benched-character';
import Character from './character';
import './characters-display.css';

class CharactersDisplay extends React.Component {
    
    state = {
        characters: [],
        benchedCharacters: [],
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

    storeBenchedCharacters = (region, realm, name) => {
        var storedCharacters = window.localStorage.getItem("benched-characters");
        if (storedCharacters !== null) { 
            storedCharacters = JSON.parse(storedCharacters)
        } 
        else storedCharacters = [];

        storedCharacters.push({region, realm, name});
        window.localStorage.setItem("benched-characters", JSON.stringify(storedCharacters));
    }

    getBenchedCharacters = () => {
        var localStorageCharacters = window.localStorage.getItem("benched-characters");
        var parsedCharacters = JSON.parse(localStorageCharacters);

        if (parsedCharacters) {
            parsedCharacters.forEach((char) => {
                if (char) {
                    this.addCharacterToBench(char.region, char.realm, char.name, false);
                }
            });
        }
    }

    charactersEmpty = () => {
        return (Object.values(this.state.characters).length === 0)
    }

    charactersAndBenchEmpty = () => {
        return (Object.values(this.state.characters).length === 0 && Object.values(this.state.benchedCharacters).length === 0)
    }

    addCharacter = (region, realm, name, store) => {
        var characters = this.state.characters;

        var newCharacter = (
            <span key={name}>
                <button className='Remove-button' onClick={() => this.removeButton(newCharacter)}>X</button>
                <button className='Bench-button' onClick={() => this.benchButton(newCharacter)}>B</button>
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

    addCharacterToBench = (region, realm, name, store) => {
        var benchedCharacters = this.state.benchedCharacters;

        var newBenchedCharacter = (
            <span key={name} className='Benched-character'>
                <BenchedCharacter region={region} realm={realm} name={name}></BenchedCharacter>
                <button className='Remove-button-benched' onClick={() => this.removeFromBenchButton(newBenchedCharacter)}>X</button>
                <button className='Unbench-button' onClick={() => this.unbenchButton(newBenchedCharacter)}>A</button>
            </span>
        )

        benchedCharacters.push(newBenchedCharacter);
        this.setState({ benchedCharacters: benchedCharacters})

        if (store) {
            this.storeBenchedCharacters(region, realm, name);
        }
    }

    removeCharacterFromBench = (name) => {
        var parsedCharacters = JSON.parse(window.localStorage.getItem("benched-characters"));
        var indexToBeRemoved;
        parsedCharacters.forEach((char, i) => {
            if (char && char.name === name) {
                indexToBeRemoved = i;
            }
        });
        
        delete parsedCharacters[indexToBeRemoved];
        window.localStorage.setItem("benched-characters", JSON.stringify(parsedCharacters));
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

    removeButton = (removeCharacter) => {
        var characters = this.state.characters;
        var indexToBeRemoved = characters.indexOf(removeCharacter);

        this.removeCharacter(removeCharacter.key);

        delete characters[indexToBeRemoved]
        this.setState({ characters: characters });

        this.updateOutput();
        if (this.charactersEmpty()) {
            document.getElementById('character-output').hidden = true;
        }
    }

    removeFromBenchButton = (removeCharacter) => {
        var benchedCharacters = this.state.benchedCharacters;
        var indexToBeRemoved = benchedCharacters.indexOf(removeCharacter);

        this.removeCharacterFromBench(removeCharacter.key);

        delete benchedCharacters[indexToBeRemoved]
        this.setState({ benchedCharacters: benchedCharacters });

        if (this.charactersEmpty()) {
            document.getElementById('character-output').hidden = true;
        }
    }

    benchButton = (benchCharacter) => {
        this.removeButton(benchCharacter);
        
        var benchCharProps = benchCharacter.props.children[2].props;
        this.addCharacterToBench(benchCharProps.region, benchCharProps.realm, benchCharProps.name, true)
    }

    unbenchButton = (unbenchCharacter) => {
        this.removeFromBenchButton(unbenchCharacter);

        console.log(unbenchCharacter.props)
        
        var unbenchCharProps = unbenchCharacter.props.children[0].props;
        this.addCharacter(unbenchCharProps.region, unbenchCharProps.realm, unbenchCharProps.name, true)
    }

    updateOutput = () => {
        var characters = this.state.characters;
        var charactersList = []

        characters.forEach((item, index) => {
            var name = item.key
            charactersList.push(name);
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
        if (this.charactersAndBenchEmpty()) {
            return (
                <div>
                    <div className='Empty-composition'>Composition is Empty</div>
                    <div className='Empty-composition-explanation'>Add some raid members in the box above!</div>
                </div>
            );
        }
        
        return this.state.characters;
    }

    renderBench = () => {
        return this.state.benchedCharacters;
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
        this.getBenchedCharacters();
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
                <hr className='Characters-divider'/>
                <div className='Characters-benched'>
                    {this.renderBench()}
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