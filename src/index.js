import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({ uri: "http://localhost:4000/", cache: new InMemoryCache(), connectToDevTools: true });
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
