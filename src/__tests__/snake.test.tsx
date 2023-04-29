import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { SnakeBoard } from '../components/snake/SnakeBoard';
import { SnakeBoardModel } from '../models/snake/SnakeBoardModel';
import { Snake } from '../pages/Snake';
import { renderWithRedux, renderWithRouter } from '../utils/test/utils';
import { rootReducer } from '../store/root-reducer';

jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('snake tests', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('should render snake board', () => {
    const board = new SnakeBoardModel();
    render(renderWithRouter(<SnakeBoard board={board} />));
    expect(screen.getByTestId('snake-board')).toBeInTheDocument();
  });

  test('should render snake page', async () => {
    render(renderWithRedux(<Snake />, '/', store));
    expect(screen.getByTestId('snake-page')).toBeInTheDocument();
  });

  test('should change levels', () => {
    render(renderWithRedux(<Snake />, '/', store));
    const easyBtn = screen.getByTestId('easy-level');
    const mediumBtn = screen.getByTestId('medium-level');
    const hardBtn = screen.getByTestId('hard-level');
    userEvent.click(easyBtn);
    expect(easyBtn).toHaveClass('success');
    userEvent.click(mediumBtn);
    expect(mediumBtn).toHaveClass('success');
    userEvent.click(hardBtn);
    expect(hardBtn).toHaveClass('success');
  });

  test('should recall timer', () => {
    render(renderWithRedux(<Snake />, '/', store));
    userEvent.click(screen.getByTestId('start-game'));
    expect(setInterval).toBeCalled();
    userEvent.keyboard('{arrowdown}');
    expect(setInterval).toBeCalled();
    userEvent.keyboard('{arrowright}');
    expect(setInterval).toBeCalled();
    userEvent.keyboard('{arrowup}');
    expect(setInterval).toBeCalled();
    userEvent.keyboard('{arrowleft}');
    expect(setInterval).toBeCalled();
  });
});
