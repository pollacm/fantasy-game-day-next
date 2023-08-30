import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Team from './Team';

describe('<Team />', () => {
  test('it should mount', () => {
    render(<Team />);
    
    const team = screen.getByTestId('Team');

    expect(team).toBeInTheDocument();
  });
});