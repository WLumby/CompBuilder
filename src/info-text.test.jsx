import React from 'react';
import { render } from '@testing-library/react'
import InfoText from './info-text';
import {} from '@testing-library/jest-dom/extend-expect'

const renderComponent = () => {
    return render(
        <InfoText/>
    );
};

test('renders bottom info text correctly', () => {
    const { getByText } = renderComponent();
    const element = getByText('Lorem ipsum');

    expect(element).toBeInTheDocument();
})