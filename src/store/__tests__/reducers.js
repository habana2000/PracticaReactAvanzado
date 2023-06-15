import { authLoginSuccess } from '../actions';
import { auth, defaultState } from '../reducers';

describe('auth', () => {
  test('should manage "AUTH_LOGIN_SUCCESS" action', () => {
    const state = defaultState.auth;
    const action = authLoginSuccess();
    const newState = auth(state, action);
    expect(newState).toBe(true);
  });
});
