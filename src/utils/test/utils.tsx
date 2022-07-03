import { ReactElement } from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

export const renderWithRouter = (component: ReactElement, initialRoute='/') => {
    return (
    <MemoryRouter initialEntries={[initialRoute]}>
        {component}
    </MemoryRouter>
    )
}

export const renderWithRedux = (component: ReactElement, initialRoute='/', store: any) => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                {component}
            </MemoryRouter>
        </Provider>
    )
}