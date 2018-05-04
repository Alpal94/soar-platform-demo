import { Store, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { state, State } from './root-reducer';
import sagas from './root-saga';
import initialState from './root-state';

export const history = createHistory();
const routeMiddleware = routerMiddleware(history);

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routeMiddleware)
);

const store: Store<State> = createStore(
  state,
  initialState!,
  enhancer,
);

sagaMiddleware.run(sagas);

export default store;
