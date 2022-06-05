import { render, screen } from "@testing-library/react";
import App from "../App";
import { MainPageCard } from "../components/main/MainPageCard";
import { OutSidePageCard } from "../components/main/OutSideGameCard";
import { renderWithRouter } from "../utils/test/utils";

describe('mainpage tests', () => {
    test('all render main page', () => {
        render(renderWithRouter(<App />));
        const mainPage = screen.getByTestId('main-page')
        expect(mainPage).toBeInTheDocument()
    })
    test('gameCard outside', () => {
        render(renderWithRouter(<OutSidePageCard to='' gameName="" />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })

    test('gameCard inside', () => {
        render(renderWithRouter(<MainPageCard to='' gameName="" />));
        const img = screen.getByTestId('game-pic')
        expect((img as HTMLImageElement).src).not.toBe(undefined)
    })
})