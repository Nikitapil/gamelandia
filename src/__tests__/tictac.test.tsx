import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { TicTacToe } from '../pages/TicTacToe';
import { rootReducer } from '../redux/root-reducer';
import { renderWithRedux } from '../utils/test/utils';

describe('tic tac toe tests', () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });
  test('should render tiс tac page', () => {
    render(renderWithRedux(<TicTacToe />, '/', store));
    expect(screen.getByTestId('tic-tac-page')).toBeInTheDocument();
  });
});
