import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import rug from 'random-username-generator';

import App from './components/App';
import messagesReducer from './reducers/messagesReducer';
import channelsReducer from './reducers/channelsReducer';
import currentUserReducer from './reducers/currentUserReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));

const randomUsername = rug.generate();

const initialState = {
  messages: [],
  channels: ['general', 'react', 'london'],
  currentUser: prompt('Pick a username') || randomUsername
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  currentUser: currentUserReducer
});

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <BrowserRouter>
      <Switch>
        <Route path="/:channel" component={App} />
        <Redirect from="/" to="/general" />
      </Switch>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root'));

