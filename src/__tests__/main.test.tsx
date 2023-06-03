import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { InternalGameCard } from '../main/components/InternalGameCard';
import { OutSideGameCard } from '../main/components/OutSideGameCard';
import { renderWithRedux, renderWithRouter } from '../utils/test/utils';
import { rootReducer } from '../store/root-reducer';
import App from '../app/App';
import { AuthForm } from '../auth/components/AuthForm/AuthForm';

describe('mainpage tests', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  test('all render main page', () => {
    render(renderWithRedux(<App />, '/', store));
    const mainPage = screen.getByTestId('main-page');
    expect(mainPage).toBeInTheDocument();
  });
  test('gameCard outside', () => {
    render(
      renderWithRouter(
        <OutSideGameCard
          card={{
            id: 123,
            gameName: 'outside game',
            pictureName: 'default',
            description: 'game',
            labels: [],
            mobileSuitable: true,
            path: 'path',
            isOutside: true
          }}
        />
      )
    );
    const img = screen.getByTestId('game-pic');
    expect((img as HTMLImageElement).src).not.toBe(undefined);
  });

  test('gameCard inside', () => {
    render(
      renderWithRouter(
        <InternalGameCard
          card={{
            id: 123,
            gameName: 'internal game',
            pictureName: 'default',
            description: 'game',
            labels: [],
            mobileSuitable: true,
            path: 'path',
            isOutside: true
          }}
        />
      )
    );
    const img = screen.getByTestId('game-pic');
    expect((img as HTMLImageElement).src).not.toBe(undefined);
  });

  test('should work authForm', () => {
    const submit = jest.fn();
    render(
      renderWithRouter(
        <AuthForm
          formTitle=""
          submit={submit}
          isSignUp
          isLoading={false}
        />
      )
    );
    const email = screen.getByTestId('email-input');
    userEvent.type(email, '12345@12345.test');
    expect(email).toContainHTML('12345@12345.test');
    const displayName = screen.getByTestId('display-name');
    userEvent.type(displayName, '12345');
    const password = screen.getByTestId('password-input');
    userEvent.type(password, '12345678');
    expect(displayName).toContainHTML('12345');
    userEvent.click(screen.getByTestId('submit'));
    expect(submit).toBeCalled();
  });
});
