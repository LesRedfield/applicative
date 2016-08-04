const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const App = require('./components/app');
const LoginForm = require('./components/login_form');
const Dashboard = require('./components/dashboard');

const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />
      <Route path="/dashboard" component={ Dashboard }/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
