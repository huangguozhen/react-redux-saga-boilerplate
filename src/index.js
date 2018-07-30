import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { createBrowserHistory  } from 'history';
import { Router, Route, Switch  } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Switch>
        {routes.map((prop, key) => (
          <Route path={prop.path} component={prop.component} key={key} />
        ))}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
