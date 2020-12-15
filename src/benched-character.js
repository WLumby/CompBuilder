import React from 'react';
import Character from './character';
import './benched-character.css';

class BenchedCharacter extends Character {

    render = () => {
        if (this.state.character.name) {
            return (
                <span className='Character-benched'>
                    <span className='Character-benched-name'>
                        <span className='Character-benched-spec-icon'>
                            {this.state.icon}
                            {(this.state.character.name)}
                        </span>
                    </span>
                </span>
            )
        }

        return null;
    }
}

export default BenchedCharacter;