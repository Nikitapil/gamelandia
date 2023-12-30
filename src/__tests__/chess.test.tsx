import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { Chess } from '../games/chess/pages/Chess';
import {
  renderWithRedux,
  renderWithReduxInsideLayout,
  renderWithRouter
} from '../utils/test/utils';
import { Board } from '../games/chess/models/Board';
import { Cell } from '../games/chess/models/Cell';
import { King } from '../games/chess/models/figures/King';
import { Figure } from '../games/chess/models/figures/Figure';
import { WinnerModal } from '../games/chess/components/WinnerModal';
import { TimerModal } from '../games/chess/components/TimerModal';
import { FiguresModal } from '../games/chess/components/FiguresModal';
import { Player } from '../games/chess/models/Player';
import { EChessColors } from '../games/chess/models/EChessColors';
import { ChessTimer } from '../games/chess/components/ChessTimer';
import { ChessCellComponent } from '../games/chess/components/ChessCellComponent';
import { rootReducer } from '../store/root-reducer';
import { ChessTypes } from '../games/chess/pages/ChessTypes';

jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('chess tests', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });
  test('timer should be in the document', () => {
    render(renderWithRedux(<Chess />, '/', store));
    expect(screen.getByTestId('timer-modal')).toBeInTheDocument();
  });
  test('winner modal should call new game', () => {
    const newGame = jest.fn();
    render(
      renderWithRouter(
        <WinnerModal
          color="white"
          isOpened
          newGame={newGame}
        />
      )
    );
    userEvent.click(screen.getByTestId('newGame-btn'));
    expect(newGame).toBeCalled();
  });

  test('timer modal should call new game', () => {
    const newGame = jest.fn();
    const closeModal = jest.fn();
    render(
      renderWithRouter(
        <TimerModal
          start={newGame}
          closeModal={closeModal}
        />
      )
    );
    userEvent.click(screen.getByTestId('chess-start-button'));
    expect(newGame).toBeCalled();
  });
  test('timer modal time input should set value', () => {
    const newGame = jest.fn();
    const closeModal = jest.fn();
    render(
      renderWithRouter(
        <TimerModal
          start={newGame}
          closeModal={closeModal}
        />
      )
    );
    userEvent.type(screen.getByTestId('time-input'), '12345');
    expect((screen.getByTestId('time-input') as HTMLInputElement).value).toBe('6012345');
  });

  test('FiguresModal should call functions', () => {
    const swapPlayer = jest.fn();
    const closeModal = jest.fn();
    const player = new Player(EChessColors.WHITE);
    const board = new Board();
    board.initCells();
    render(
      renderWithRouter(
        <FiguresModal
          swapPlayer={swapPlayer}
          closeModal={closeModal}
          currentPlayer={player}
          board={board}
          cell={board.cells[2][0]}
          isOpened
        />
      )
    );
    userEvent.click(screen.getByTestId('bishop-btn'));
    expect(swapPlayer).toBeCalled();
    userEvent.click(screen.getByTestId('knight-btn'));
    expect(swapPlayer).toBeCalled();
    userEvent.click(screen.getByTestId('queen-btn'));
    expect(swapPlayer).toBeCalled();
    userEvent.click(screen.getByTestId('rook-btn'));
    expect(swapPlayer).toBeCalled();
  });

  test('timer component', () => {
    const player = new Player(EChessColors.WHITE);
    const restart = jest.fn();
    let isModalOpen = false;
    const setIsModalOpen = jest.fn(() => {
      isModalOpen = !isModalOpen;
    });
    const setWinner = jest.fn();
    render(
      renderWithRouter(
        <ChessTimer
          restart={restart}
          currentPlayer={player}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setWinner={setWinner}
        />
      )
    );
    userEvent.click(screen.getByTestId('chess__restart'));
    expect(isModalOpen).toBe(true);
  });
  test('timer component intervals', async () => {
    const player = new Player(EChessColors.WHITE);
    const restart = jest.fn();
    let isModalOpen = false;
    const setIsModalOpen = jest.fn(() => {
      isModalOpen = !isModalOpen;
    });
    const setWinner = jest.fn();
    render(
      renderWithRouter(
        <ChessTimer
          restart={restart}
          currentPlayer={player}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setWinner={setWinner}
        />
      )
    );
    expect(setInterval).toBeCalled();
    setTimeout(() => {
      expect(clearInterval).toBeCalled();
    }, 1700);
  });
  test('chess cell should have different classes', () => {
    const board = new Board();
    board.initCells();
    const click = jest.fn();
    render(
      renderWithRouter(
        <ChessCellComponent
          cell={board.cells[0][0]}
          click={click}
          selected
        />
      )
    );
    expect(screen.getByTestId('chess-cell')).toHaveClass('selected');
    userEvent.click(screen.getByTestId('chess-cell'));
    expect(click).toBeCalled();
  });
  test('chess cell should be available', () => {
    const board = new Board();
    board.initCells();
    const click = jest.fn();
    board.cells[0][0].available = true;
    render(
      renderWithRouter(
        <ChessCellComponent
          cell={board.cells[0][0]}
          click={click}
          selected
        />
      )
    );
    expect(screen.getByTestId('available-dot')).toBeInTheDocument();
  });
  test('chess cell should have  figure', () => {
    const board = new Board();
    board.initCells();
    board.addFigures();
    const click = jest.fn();
    board.cells[0][0].available = true;
    render(
      renderWithRouter(
        <ChessCellComponent
          cell={board.cells[0][0]}
          click={click}
          selected={false}
        />
      )
    );
    expect(screen.getByTestId('figure-logo')).toBeInTheDocument();
  });
  test('should set winner', async () => {
    render(renderWithRedux(<Chess />, '/', store));
    userEvent.click(screen.getByTestId('chess-start-button'));
    const promise = new Promise((res) => {
      setTimeout(() => res(''), 250);
    });
    await promise;
    expect(screen.queryByTestId('timer-modal')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('give-up-btn'));
    expect(screen.getByTestId('newGame-btn')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      screen.getByTestId('newGame-btn').click();
    });
    expect(screen.getByTestId('timer-modal')).toBeInTheDocument();
  });
  test('should render types with right breadcrumbs', () => {
    render(renderWithReduxInsideLayout(<ChessTypes />, store));
    expect(screen.getByText('chess')).toBeInTheDocument();
  });
});

describe('chess classes test', () => {
  let board = new Board();

  beforeEach(() => {
    board = new Board();
  });

  test('should init right cells', () => {
    board.initCells();
    expect(board.cells.length).toBe(8);
  });

  test('should return right cell', () => {
    board.initCells();
    const cell = board.getCell(1, 1);
    expect(cell).toBeInstanceOf(Cell);
    expect(cell).toEqual(board.cells[1][1]);
  });

  test('should add figures right', () => {
    board.initCells();
    board.addFigures();
    expect(board.getCell(4, 0).figure).toBeInstanceOf(King);
  });

  test('should highlight right cells', () => {
    board.initCells();
    board.addFigures();
    board.highLightCells(board.getCell(0, 1));
    expect(board.getCell(0, 2).available).toBe(true);
  });

  test('should copy board', () => {
    board.initCells();
    const newBoard = board.getCopyBoard();
    expect(newBoard).toEqual(board);
  });

  test('White King under attack', () => {
    board.initCells();
    board.addFigures();
    board.kings.white!.cell!.isUnderAttack = jest.fn(() => true);
    board.checkIfKingIsUnderAttack();
    expect(board.underAttackMessage).toBe('white_king_under_attack');
  });
  test('Black King under attack', () => {
    board.initCells();
    board.addFigures();
    board.kings.black!.cell!.isUnderAttack = jest.fn(() => true);
    board.checkIfKingIsUnderAttack();
    expect(board.underAttackMessage).toBe('black_king_under_attack');
  });
  test('Shouldnt be underattack message', () => {
    board.initCells();
    board.addFigures();
    board.checkIfKingIsUnderAttack();
    expect(board.underAttackMessage).toBe('');
  });

  test('cell setFigure', () => {
    board.initCells();
    board.addFigures();
    board.cells[0][2].setFigure(board.cells[0][1].figure);
    expect(board.cells[0][2].figure).toBeInstanceOf(Figure);
  });
  test('cell addLostfigure', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[0][0];
    cell.addLostfigure(cell.figure!);
    expect(board.lostBlackFigures.length).toBe(1);
  });
  test('cell moveFigure', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[1][0];
    const { figure } = cell;
    cell.moveFigure(board.cells[2][0]);
    expect(board.cells[2][0].figure).toEqual(figure);
  });
  test('cell moveFigure and addLostfigure', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[1][0];
    cell.moveFigure(board.cells[3][0]);
    board.cells[6][1].moveFigure(board.cells[4][1]);
    board.cells[3][0].moveFigure(board.cells[4][1]);
    expect(board.lostWhiteFigures.length).toBe(1);
  });

  test('cell isEmptyDiagonal', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[1][0];
    const notEmptyCell = board.cells[0][0];
    expect(cell.isEmptyDiagonal(board.cells[2][1])).toBe(true);
    expect(notEmptyCell.isEmptyDiagonal(board.cells[2][2])).toBe(false);
  });

  test('cell isEmptyVertical', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[0][0];
    expect(cell.isEmptyVertical(board.cells[2][0])).toBe(false);
  });

  test('cell isEmptyHorizontal', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[0][0];
    expect(cell.isEmptyHorizontal(board.cells[0][2])).toBe(false);
    board.cells[0][1].moveFigure(board.cells[2][0]);
    expect(cell.isEmptyHorizontal(board.cells[0][2])).toBe(true);
  });
  test('shoul be underAttack', () => {
    board.initCells();
    board.addFigures();
    const cell = board.cells[1][0];
    cell.moveFigure(board.cells[3][0]);
    board.cells[6][1].moveFigure(board.cells[4][1]);
    expect(board.cells[4][1].isUnderAttack()).toBe(true);
  });

  test('Bishop can move', () => {
    board.initCells();
    board.addFigures();
    board.cells[1][3].moveFigure(board.cells[2][3]);
    expect(board.cells[0][2].figure?.canMove(board.cells[3][5])).toBe(true);
  });

  test('King can move', () => {
    board.initCells();
    board.addFigures();
    board.cells[1][4].moveFigure(board.cells[2][4]);
    expect(board.cells[0][4].figure?.canMove(board.cells[1][4])).toBe(true);
  });
  test('Pawn end of board', () => {
    board.initCells();
    board.addFigures();
    expect(board.cells[1][1].figure?.checkIfEndOfBoard()).toBe(false);
  });
  test('Queen can move', () => {
    board.initCells();
    board.addFigures();
    board.cells[1][3].moveFigure(board.cells[2][3]);
    expect(board.cells[0][3].figure?.canMove(board.cells[1][3])).toBe(true);
  });
  test('Rook can move', () => {
    board.initCells();
    board.addFigures();
    board.cells[1][0].moveFigure(board.cells[2][0]);
    expect(board.cells[0][0].figure?.canMove(board.cells[1][0])).toBe(true);
  });
});
