import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../shared/Button';
import FormField from '../shared/FormField';

import './LoginPage.css';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [rememberPassword, setRememberPassword] = useState(true);

  const resetError = () => {
    dispatch(uiResetError());
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authLogin(credentials, rememberPassword));
  };

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = event => {
    setRememberPassword(rememberPassword ? false : true);
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Adverts page</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.email}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <label>
        <input
          type="checkbox"
          name="rememberPassword"
          value= {rememberPassword? rememberPassword : false}
          checked={rememberPassword === true}
          onChange={handleCheckboxChange}
          // onClick={handleCheckboxChange}
          />
          Remember password
        </label>
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
