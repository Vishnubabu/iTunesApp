import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(
    promiseMiddleware()                     // used for fetching data from backend. %_PENDING, %_FULLFILLED, %_REJECTED actions are dispatched.
));

/* passing redux store */
/* Redirect for making the default route '/search' */
/* withRouter with send history prop to the component */

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" render={() => (
                    <Redirect to="/search"/>
                )}/>
                <Route path="/" component={ withRouter(App) } />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
