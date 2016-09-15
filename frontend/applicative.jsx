const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const App = require('./components/app');
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const Dashboard = require('./components/dashboard');
const Segmentation = require('./components/segmentation');

const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ SignupForm } />
      <Route path="/dashboard" component={ Dashboard }/>
      <Route path="/segmentation" component={ Segmentation }/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('content');
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  ReactDOM.render(appRouter, root);
});
