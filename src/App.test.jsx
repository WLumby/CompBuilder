import React from 'react';
import { render } from '@testing-library/react'
import App from './App';
import {} from '@testing-library/jest-dom/extend-expect'

const renderComponent = () => {
    return render(
        <App/>
    );
};

test('renders page heading correctly', () => {
    const { getByText } = renderComponent();
    const element = getByText('CompBuilder');

    expect(element).toBeInTheDocument();
})