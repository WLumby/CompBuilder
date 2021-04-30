import React from 'react';
import { render } from '@testing-library/react'
import Character from './character';
import {} from '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

const renderComponent = async () => {
    return await render(
        <Character region='eu' realm='draenor' name='wyvurn' removeChar={jest.fn()}/>
    )
}

const mockFetch = (status, charName, activeSpecName) => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            status,
            json: (() => {
                return {
                    name: charName,
                    active_spec_name: activeSpecName
                }
            })
        })
    })
}

test('renders character correctly', async () => {
    const charName = 'Testname';
    const activeSpecName = 'Outlaw';
    mockFetch(200, charName, activeSpecName);
    const { container } = await renderComponent();

    expect(container.querySelector('.Character-name').innerHTML).toBe(charName);
    expect(container.querySelector('.Character-spec-name').innerHTML).toBe(activeSpecName);
});