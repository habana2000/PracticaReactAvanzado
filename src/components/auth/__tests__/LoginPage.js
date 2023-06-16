import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { defaultState } from '../../../store/reducers';
import { authLogin, uiResetError } from '../../../store/actions';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/actions');

describe('LoginPage', () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = defaultState;
        state.ui.error = error;
        
        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
      <LoginPage />
      </Provider>,
      );
    };
    
    test('snapshot', () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot();
    });

    /*
        
    test('should dispatch authLogin action', () => {
      const email = 'xroca@vilamatica.com';
    const password = '1234';

    renderComponent();

    const usernameInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();

    // fireEvent.change(usernameInput, { target: { value: email } });
    // fireEvent.change(passwordInput, { target: { value: password } });
    userEvent.type(usernameInput, email);
    userEvent.type(passwordInput, password);

    expect(submitButton).toBeEnabled();

    // fireEvent.click(submitButton);
    userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password });
  });

  test('should display an error', () => {
    const error = { message: 'Unauthorized' };
    renderComponent(error);

    const errorElement = screen.getByText(error.message);
    expect(errorElement).toBeInTheDocument();

    // fireEvent.click(errorElement);
    userEvent.click(errorElement);

    expect(uiResetError).toHaveBeenCalled();
  });

  */
});
