import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameTeam from './GameTeam';

describe('<GameTeam />', () => {
  test('it should mount', () => {
    render(<GameTeam />);
    
    const gameTeam = screen.getByTestId('GameTeam');

    expect(gameTeam).toBeInTheDocument();
  });
});