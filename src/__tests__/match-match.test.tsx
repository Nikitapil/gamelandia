import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatchCard } from "../components/match/MatchCard";
import { renderWithRouter } from "../utils/test/utils";


describe('match-match game', () => {
    const clickHandler = jest.fn()
    test('match card', () => {
        render(renderWithRouter(<MatchCard onClick={clickHandler} flipped={false} pic='' name='cat' id={1} disabled={false}  />));
        userEvent.click(screen.getByTestId('match-card'))
        expect(clickHandler).toHaveBeenCalled()
    })
    test('match card classname', () => {
        render(renderWithRouter(<MatchCard onClick={clickHandler} flipped={true} pic='' name='cat' id={1} disabled={false}  />));
        expect(screen.getByTestId('match-card')).toHaveClass('flipped')
    })
})