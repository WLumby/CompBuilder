import React from 'react';
import App from './App';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

it('renders shadowlands logo at the top of the page', () => {
    var app = mount(<App></App>)
    expect(app.find('img').prop('src')).toEqual('Shadowlands_Logo.png');
});
