import { render, screen } from "@testing-library/react";
import { createStore } from "redux";
import App from "../App";
import { MainPageCard } from "../components/main/MainPageCard";
import { OutSidePageCard } from "../components/main/OutSideGameCard";
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
        render(renderWithRouter(<OutSidePageCard to='' gameName="" />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })

    test('gameCard inside', () => {
        render(renderWithRouter(<MainPageCard to='' gameName="" labels={[]} />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })
})