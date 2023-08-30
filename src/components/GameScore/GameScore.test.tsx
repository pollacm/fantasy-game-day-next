import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameScore from './GameScore';

describe('<GameScore />', () => {
  test('it should mount', () => {
    render(<GameScore />);
    
    const gameScore = screen.getByTestId('GameScore');

    expect(gameScore).toBeInTheDocument();
  });
});