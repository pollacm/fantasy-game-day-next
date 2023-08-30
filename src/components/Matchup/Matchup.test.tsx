import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Matchup from './Matchup';

describe('<Matchup />', () => {
  test('it should mount', () => {
    render(<Matchup league="test"/>);
    
    const matchup = screen.getByTestId('Matchup');

    expect(matchup).toBeInTheDocument();
  });
});