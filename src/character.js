import React from 'react';
import './character.css';

class Character extends React.Component {

    state = {
        character: {
            name: '...',
            active_spec_name: '...',
            thumbnail_url: 'https://wow.zamimg.com/images/wow/icons/large/spell_magic_lesserinvisibilty.jpg',
            gear: {
                item_level_equipped: 0
            }
        },
        icon: ''
    }
    
    getCharacter = (region, realm, name, removeChar) => {
        fetch(this.makeRequest(region, realm, name))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                removeChar(this);
                throw new Error('Error reading response / Response code not 200');
            }
        })
        .then(response => {
            this.setState({
                character: response,
                icon: this.setIcon(response.active_spec_role, response.name)
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    setIcon = (spec, name) => {
        switch (spec) {
            case 'HEALING':
                return <img className='Spec-icon' id={name+'-icon'} role='Healer' src={require('./images/Healer_Icon.png')} alt='Healer Spec Icon'/>
            case 'TANK':
                return <img className='Spec-icon' id={name+'-icon'} role='Tank' src={require('./images/Tank_Icon.png')} alt='Tank Spec Icon'/>
            default:
                return <img className='Spec-icon' id={name+'-icon'} role='DPS' src={require('./images/Damage_Icon.png')} alt='DPS Spec Icon'/>
        }
    }

    makeRequest = (region, realm, name) => {
        return new Request('https://raider.io/api/v1/characters/profile?region=' + region + '&realm=' + realm + '&name=' + name + '&fields=gear', {method: 'GET'});
    }

    componentDidMount = () => {
        this.getCharacter(this.props.region, this.props.realm, this.props.name, this.props.removeChar);
    }

    onClick = () => {
        window.location.href = this.state.character.profile_url;
    }

    render = () => {
        if (this.state.character.name) {
            return (
                <div className='Character' onClick={this.onClick} cursor='grab'>
                    <div className='Profile-pic'>
                        <img className='Profile-pic-image' src={this.state.character.thumbnail_url} alt='Character Portrait'/>
                    </div>
                    <div className='Character-name'>
                        {(this.state.character.name)}
                    </div>
                    <div className='Character-spec'>
                        {this.state.icon}
                        {(this.state.character.active_spec_name)}
                    </div>
                    <div className='Character-ilvl'>
                        {this.state.character.gear?.item_level_equipped}
                    </div>
                </div>
            )
        }

        return null;
    }
}

export default Character;