import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../app/App';
import { MatchCard } from '../games/match-match/components/MatchCard';
import { rootReducer } from '../store/root-reducer';
import { renderWithRedux, renderWithReduxInsideLayout, renderWithRouter } from '../utils/test/utils';
import { MatchMatch } from '../games/match-match/pages/MatchMatch';

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
    render(renderWithReduxInsideLayout(<MatchMatch />, store));
    expect(screen.getByText('match_match')).toBeInTheDocument();
  });
});
