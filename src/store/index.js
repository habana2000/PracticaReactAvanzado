import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import * as service from '../service';

import * as reducers from './reducers';
import * as actionCreators from './actions';

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    persist: true, // persist states on page reloading
    export: true, // export history of actions in a file
    import: 'custom', // import history of actions from a file
    jump: true, // jump back and forth (time travelling)
    skip: true, // skip (cancel) actions
    reorder: true, // drag and drop actions in the history list
    dispatch: true, // dispatch custom actions or action creators
    test: true, // generate tests for the selected actions
  },  
  actionCreators,
});


const logger = store => next => action => {
  if (action.type) {
    console.group(action.type);
    console.info('dispatching', action, store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

const timestamp = () => next => action => {
  return next({
    ...action,
    meta: {
      ...action.meta,
      timestamp: Date.now(),
    },
  });
};

const failureRedirects = (router, redirectsMap) => () => next => action => {
  const result = next(action);

  if (action.error) {
    const redirect = redirectsMap[action.payload.status];
    if (redirect) {
      router.navigate(redirect);
    }
  }
  return result;
};

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    thunk.withExtraArgument({ service, router }),
    timestamp,
    failureRedirects(router, { 401: '/login', 404: '/404' }),
    logger,
  ];

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
