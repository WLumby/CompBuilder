import React from 'react';
import './character.css';

class Character extends React.Component {

    state = {
        character: {}
    }
    
    getCharacter = (region, realm, name) => {
        fetch(this.makeRequest(region, realm, name))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(response => {
            this.setState({
                character: response
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    makeRequest = (region, realm, name) => {
        return new Request('https://raider.io/api/v1/characters/profile?region=' + region + '&realm=' + realm + '&name=' + name + '&fields=gear', {method: 'GET'});
    }

    componentDidMount = () => {
        this.getCharacter(this.props.region, this.props.realm, this.props.name);
    }

    render = () => {
        return (
            <div className='Character'>
                <div className='Profile-pic'>
                    <img className='Profile-pic-image' src={this.state.character.thumbnail_url}/>
                </div>
                <div className='Character-name'>
                    {(this.state.character.name)}
                </div>
                <div className='Character-spec'>
                    {(this.state.character.active_spec_name)}
                </div>
                <div className='Character-ilvl'>
                    {this.state.character.gear?.item_level_equipped}
                </div>
            </div>
        )
    }
}

export default Character;