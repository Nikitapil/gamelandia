import { render, screen } from "@testing-library/react"
import { TicTacToe } from "../Pages/TicTacToe"
import { renderWithRouter } from "../utils/test/utils"

describe('tic tac toe tests', () => {
    test('should render tiс tac page', () => {
       render(renderWithRouter(<TicTacToe/>))
       expect(screen.getByTestId('tic-tac-page')).toBeInTheDocument()
    })
})