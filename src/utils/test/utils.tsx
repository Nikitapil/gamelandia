import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { CommonLayout } from '../../app/components/CommonLayout/CommonLayout';

export const renderWithRouter = (component: ReactElement, initialRoute = '/') => {
  return <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>;
};

export const renderWithRedux = (
  component: ReactElement | any,
  initialRoute = '/',
  store: ReturnType<typeof configureStore>
) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
    </Provider>
  );
};

export const renderWithReduxInsideLayout = (
  component: ReactElement | any,
  store: ReturnType<typeof configureStore>
) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <CommonLayout>{component}</CommonLayout>
      </MemoryRouter>
    </Provider>
  );
};
