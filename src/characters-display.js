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
        var input = document.getElementById('character-input').value;
        if (input != "") {
            this.addCharacter('eu', 'draenor', input);
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

    render = () => {
        return (
            <div>
                <div className='Buttons'>
                    <span className='Character-input'>
                        <input className='Character-input-box' id='character-input'></input>
                    </span>
                    <button className='Add-button' onClick={this.addButton}>+</button>
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