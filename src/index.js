import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import rug from 'random-username-generator';

import App from './components/App';
import messagesReducer from './reducers/messagesReducer';
import channelsReducer from './reducers/channelsReducer';
import currentUserReducer from './reducers/currentUserReducer';
import selectedChannelReducer from './reducers/selectedChannelReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));

const randomUsername = rug.generate();

const initialState = {
  messages: [],
  channels: ['general', 'react', 'London'],
  currentUser: prompt('Pick a username') || randomUsername,
  selectedChannel: 'general'
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  currentUser: currentUserReducer,
  selectedChannel: selectedChannelReducer
});

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <App />
  </Provider>, 
  document.getElementById('root'));

