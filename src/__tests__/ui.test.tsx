import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalContainer } from '../components/UI/ModalContainer';
import { renderWithRouter } from '../utils/test/utils';

describe('ui tests', () => {
  test('modal container', () => {
    const closeModal = jest.fn();
    render(
      renderWithRouter(
        <ModalContainer closeModal={closeModal}>123</ModalContainer>
      )
    );
    userEvent.click(screen.getByTestId('modal-content'));
    expect(closeModal).not.toBeCalled();
  });
});
