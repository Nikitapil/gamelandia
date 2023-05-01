import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TicTacBoard } from '../games/tic-tac-toe/components/TicTacBoard';
import { TicTacCell } from '../games/tic-tac-toe/components/TicTacCell';
import { ETicTacIcons } from '../games/tic-tac-toe/constants';
import { TicBoard } from '../games/tic-tac-toe/models/TicBoard';
import { TicCell } from '../games/tic-tac-toe/models/TicCell';
import { renderWithRouter } from '../utils/test/utils';

describe('tic tac toe classes', () => {
  let board = new TicBoard();

  beforeEach(() => {
    board = new TicBoard();
  });

  test('board init cells', () => {
    board.initCells();
    expect(board.cells.length).toBe(3);
  });

  test('board updateBoard', () => {
    board.initCells();
    expect(board.updateBoard()).toEqual(board);
  });

  test('board checkWinner', () => {
    board.initCells();
    expect(board.checkWinner()).toBe(false);
  });
  test('board swapPlayer', () => {
    board.initCells();
    board.updateBoard();
    expect(board.currentPlayer).toEqual('CIRCLE');
    board.updateBoard();
    expect(board.currentPlayer).toEqual('XMARK');
  });

  test('cell click', () => {
    board.initCells();
    board.cells[0][0].click();
    expect(board.cells[0][0].icon).toBe('XMARK');
  });
});

describe('tic tac toe components', () => {
  let board = new TicBoard();

  beforeEach(() => {
    board = new TicBoard();
  });
  test('tic tac cell', () => {
    const clickOnCell = jest.fn((cell: TicCell) => {
      cell.icon = ETicTacIcons.XMARK;
    });
    const cell = new TicCell(board, 0, 0);
    render(
      renderWithRouter(<TicTacCell cell={cell} clickOnCell={clickOnCell} />)
    );
    userEvent.click(screen.getByTestId('tic-tac-cell'));
    expect(clickOnCell).toBeCalled();
  });

  test('tic tac board', () => {
    board.initCells();
    const setBoard = jest.fn();
    const setWinner = jest.fn();
    const setDraw = jest.fn();
    render(
      renderWithRouter(
        <TicTacBoard
          board={board}
          setBoard={setBoard}
          winner=""
          setWinner={setWinner}
          draw={false}
          setDraw={setDraw}
        />
      )
    );
    userEvent.click(screen.getAllByTestId('tic-tac-cell')[0]);
    expect(setBoard).toBeCalled();
  });

  test('tic tac board winner test', () => {
    board.initCells();
    let winner = '';
    const setBoard = jest.fn();
    const setWinner = jest.fn(() => (winner = '123'));
    const setDraw = jest.fn();
    board.checkWinner = jest.fn(() => true);
    render(
      renderWithRouter(
        <TicTacBoard
          board={board}
          setBoard={setBoard}
          winner={winner}
          setWinner={setWinner}
          draw={false}
          setDraw={setDraw}
        />
      )
    );
    userEvent.click(screen.getAllByTestId('tic-tac-cell')[0]);
    expect(setWinner).toBeCalled();
  });

  test('tic tac board not to call click', () => {
    board.initCells();
    const setBoard = jest.fn();
    const setWinner = jest.fn();
    const setDraw = jest.fn();
    board.cells[0][0].icon = ETicTacIcons.XMARK;
    render(
      renderWithRouter(
        <TicTacBoard
          board={board}
          setBoard={setBoard}
          winner=""
          setWinner={setWinner}
          setDraw={setDraw}
          draw={false}
        />
      )
    );
    userEvent.click(screen.getAllByTestId('tic-tac-cell')[0]);
    expect(setBoard).not.toBeCalled();
  });

  test('winner text to be in the document', () => {
    board.initCells();
    const setBoard = jest.fn();
    const setWinner = jest.fn();
    const setDraw = jest.fn();
    render(
      renderWithRouter(
        <TicTacBoard
          board={board}
          setBoard={setBoard}
          winner="123"
          setWinner={setWinner}
          setDraw={setDraw}
          draw={false}
        />
      )
    );
    expect(screen.getByTestId('winner-text')).toBeInTheDocument();
  });
});
