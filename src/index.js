/*
import store from '../src/redux/store';


// Log the initial state
console.log('Initial state: ', store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
)
// Now, dispatch some actions

store.dispatch({ type: 'shipmentDeleted', payload: "kk-275651-64476049-3346442" })

// Stop listening to state updates
unsubscribe()*/





import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from '../src/redux/store';
import { fetchData } from './redux/fetchingSlice/fetchingReducer';

store.dispatch(fetchData);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


