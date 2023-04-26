import { render, screen } from '@testing-library/react';
import { MainPageCard } from '../components/main/MainPageCard';
import { OutSidePageCard } from '../components/main/OutSideGameCard';
import { renderWithRouter } from '../utils/test/utils';

describe('mainpage tests', () => {
  // TODO fix this test
  // let store: any;
  // beforeEach(() => {
  //   store = configureStore({
  //     reducer: rootReducer
  //   });
  // });

  // test('all render main page', () => {
  //   render(renderWithRedux(<App />, '/', store));
  //   const mainPage = screen.getByTestId('main-page');
  //   expect(mainPage).toBeInTheDocument();
  // });
  test('gameCard outside', () => {
    render(
      renderWithRouter(<OutSidePageCard to="" gameName="" description="" />)
    );
    const img = screen.getByTestId('game-pic');
    expect((img as HTMLImageElement).src).not.toBe(undefined);
  });

  test('gameCard inside', () => {
    render(
      renderWithRouter(
        <MainPageCard to="" gameName="" description="" labels={[]} />
      )
    );
    const img = screen.getByTestId('game-pic');
    expect((img as HTMLImageElement).src).not.toBe(undefined);
  });
  // TODO fix this test
  // test('should work authForm', () => {
  //   const submit = jest.fn();
  //   const setDisplayName = jest.fn();
  //   render(
  //     renderWithRouter(
  //       <AuthForm
  //         formTitle=""
  //         submit={submit}
  //         isSignUp
  //         setDisplayName={setDisplayName}
  //       />
  //     )
  //   );
  //   const email = screen.getByTestId('email-input');
  //   userEvent.type(email, '12345@12345.test');
  //   expect(email).toContainHTML('12345@12345.test');
  //   const displayName = screen.getByTestId('display-name');
  //   userEvent.type(displayName, '12345');
  //   const password = screen.getByTestId('password-input');
  //   userEvent.type(password, '12345678');
  //   expect(displayName).toContainHTML('12345');
  //   expect(setDisplayName).toBeCalled();
  //   userEvent.click(screen.getByTestId('submit'));
  //   expect(submit).toBeCalled();
  // });
});
