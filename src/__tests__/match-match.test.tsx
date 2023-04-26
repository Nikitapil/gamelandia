import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { MatchCard } from '../components/match/MatchCard';
import { rootReducer } from '../store/root-reducer';
import { renderWithRedux, renderWithRouter } from '../utils/test/utils';

describe('match-match game', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });
  const clickHandler = jest.fn();
  test('match card', () => {
    render(
      renderWithRouter(
        <MatchCard
          onClick={clickHandler}
          flipped={false}
          pic=""
          name="cat"
          id={1}
          disabled={false}
        />
      )
    );
    userEvent.click(screen.getByTestId('match-card'));
    expect(clickHandler).toHaveBeenCalled();
  });
  test('match card classname', () => {
    render(
      renderWithRouter(
        <MatchCard
          onClick={clickHandler}
          flipped
          pic=""
          name="cat"
          id={1}
          disabled={false}
        />
      )
    );
    expect(screen.getByTestId('match-card')).toHaveClass('flipped');
  });
  test('should render page with right breadcrumbs', () => {
    render(renderWithRedux(<App />, '/match-match', store));
    expect(screen.getByText('match_match')).toBeInTheDocument();
  });
});
