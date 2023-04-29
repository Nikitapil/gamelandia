import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { TicTacToe } from '../pages/TicTacToe';
import { renderWithRedux } from '../utils/test/utils';
import { rootReducer } from '../store/root-reducer';

describe('tic tac toe tests', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });
  test('should render tiс tac page', () => {
    render(renderWithRedux(<TicTacToe />, '/', store));
    expect(screen.getByTestId('tic-tac-page')).toBeInTheDocument();
  });
});
