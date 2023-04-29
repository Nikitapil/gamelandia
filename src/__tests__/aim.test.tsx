import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { renderWithRedux } from '../utils/test/utils';
import { AimGame } from '../pages/AimGame';
import { rootReducer } from '../store/root-reducer';

jest.mock('react-firebase-hooks/auth');
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('aim game tests', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('shoul render aim game page', () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(renderWithRedux(<AimGame />, '/', store));
    expect(screen.getByTestId('aim-page')).toBeInTheDocument();
  });

  test('should change score by click', () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(renderWithRedux(<AimGame />, '/', store));
    expect(screen.getByTestId('aim-page')).toBeInTheDocument();
    const aim = screen.getByTestId('aim-dot');
    userEvent.click(aim);
    expect(screen.getByTestId('aim-score').textContent?.includes('1')).toBe(
      true
    );
  });

  test('should start timer', () => {
    (useAuthState as any).mockReturnValue([null, false]);
    render(renderWithRedux(<AimGame />, '/', store));
    expect(screen.getByTestId('aim-page')).toBeInTheDocument();
    const aim = screen.getByTestId('aim-dot');
    userEvent.click(aim);
    expect(screen.getByTestId('aim-score').textContent?.includes('1')).toBe(
      true
    );
    expect(setInterval).toBeCalled();
  });
});
