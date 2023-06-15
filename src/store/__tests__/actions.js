import {
  advertsLoadedSuccess,
  authLogin,
} from '../actions';

import { ADVERTS_LOADED_SUCCESS} from '../types';

describe('advertsLoadedSuccess', () => {
  test('should return a "ADVERTS_LOADED_SUCCESS" action', () => {
    const adverts = 'adverts';
    const expectedAction = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    const action = advertsLoadedSuccess(adverts);
    expect(action).toEqual(expectedAction);
  });
});

describe('authLogin', () => {
  const credentials = 'credentials';
  const redirectUrl = 'redirectUrl';
  const action = authLogin(credentials);

  const dispatch = jest.fn();
  const service = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from: { pathname: redirectUrl } } } },
  };
});
