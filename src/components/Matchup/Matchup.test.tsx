import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Matchup from './Matchup';
import { MatchupData } from './MatchupData';

describe('<Matchup />', () => {
  test('it should mount', () => {
    render(<Matchup league="test" matchupData={new MatchupData('', '', [], [])} subsEnabled={true} captainsEnabled={true}/>);
    
    const matchup = screen.getByTestId('Matchup');

    expect(matchup).toBeInTheDocument();
  });
});