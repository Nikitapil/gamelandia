import { ReactElement } from "react"
import { MemoryRouter } from "react-router-dom"

export const renderWithRouter = (component: ReactElement, initialRoute='/') => {
    return (
    <MemoryRouter initialEntries={[initialRoute]}>
        {component}
    </MemoryRouter>
    )
}