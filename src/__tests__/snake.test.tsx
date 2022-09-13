import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import userEvent from '@testing-library/user-event';
import { SnakeBoard } from '../components/snake/SnakeBoard';
import { SnakeBoardModel } from '../models/snake/SnakeBoardModel';
import { Snake } from '../Pages/Snake';
import { rootReducer } from '../redux/rootReducer';
import { renderWithRedux, renderWithRouter } from '../utils/test/utils';

jest.mock('react-firebase-hooks/auth');
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('snake tests', () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test('should render snake board', () => {
    const board = new SnakeBoardModel();
    render(renderWithRouter(<SnakeBoard board={board} />));
    expect(screen.getByTestId('snake-board')).toBeInTheDocument();
  });

  test('should render snake page', async () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(
      renderWithRedux(<Snake auth={{ currentUser: null } as any} />, '/', store)
    );
    expect(screen.getByTestId('snake-page')).toBeInTheDocument();
  });

  test('should change levels', () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(
      renderWithRedux(<Snake auth={{ currentUser: null } as any} />, '/', store)
    );
    const easyBtn = screen.getByTestId('easy-level');
    const mediumBtn = screen.getByTestId('medium-level');
    const hardBtn = screen.getByTestId('hard-level');
    userEvent.click(easyBtn);
    expect(easyBtn).toHaveClass('snake-current-level');
    userEvent.click(mediumBtn);
    expect(mediumBtn).toHaveClass('snake-current-level');
    userEvent.click(hardBtn);
    expect(hardBtn).toHaveClass('snake-current-level');
  });

  test('should recall timer', () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(
      renderWithRedux(<Snake auth={{ currentUser: null } as any} />, '/', store)
    );
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
