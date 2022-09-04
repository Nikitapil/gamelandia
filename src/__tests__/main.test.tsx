import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import App from "../App";
import { AuthForm } from "../components/Auth/AuthForm";
import { MainPageCard } from "../components/main/MainPageCard";
import { OutSidePageCard } from "../components/main/OutSideGameCard";
import { SignIn } from "../Pages/SignIn";
import { rootReducer } from "../redux/rootReducer";
import { renderWithRedux, renderWithRouter } from "../utils/test/utils";

describe('mainpage tests', () => {
    let store: any
    beforeEach(() => {
        store = createStore(rootReducer);
    })

    test('all render main page', () => {
        render(renderWithRedux(<App />, '/', store));
        const mainPage = screen.getByTestId('main-page')
        expect(mainPage).toBeInTheDocument()
    })
    test('gameCard outside', () => {
        render(renderWithRouter(<OutSidePageCard to='' gameName="" description="" />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })

    test('gameCard inside', () => {
        render(renderWithRouter(<MainPageCard to='' gameName="" description="" labels={[]} />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })

    test('should navigate from sign in to sign up', () => {
        render(renderWithRedux(<SignIn auth={null as any}/>, '/', store));
        userEvent.click(screen.getByTestId('signup-link'))
        expect(screen.getByTestId('signup-link')).toBeInTheDocument()
    })

    test('should work authForm', () => {
        const submit = jest.fn()
        const setDisplayName = jest.fn()
        render(renderWithRouter(<AuthForm formTitle="" submit={submit} isSignUp={true}  setDisplayName={setDisplayName} />))
        const email = screen.getByTestId('email-input')
        userEvent.type(email, '12345')
        expect(email).toContainHTML('12345')
        const displayName = screen.getByTestId('display-name')
        userEvent.type(displayName, '12345')
        expect(displayName).toContainHTML('12345')
        expect(setDisplayName).toBeCalled()
        userEvent.click(screen.getByTestId('submit'))
        expect(submit).toBeCalled()
    })
})