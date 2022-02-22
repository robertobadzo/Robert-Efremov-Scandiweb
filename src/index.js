import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware, compose } from "redux";
import { allReducers } from "./state/reducers";
import logger from 'redux-logger';

import { Provider } from "react-redux";
import thunk from 'redux-thunk';

export const client = new ApolloClient({ uri: "http://localhost:4000/", cache: new InMemoryCache(), connectToDevTools: true });
export const store = createStore(allReducers, compose( window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
      <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
