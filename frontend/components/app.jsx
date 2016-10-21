const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const LeftNav = require('./left_nav');
const Dashboard = require('./dashboard');


const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const App = React.createClass({

  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  _handleLogOut(){
    SessionActions.logOut();
  },

  greeting() {

    if (SessionStore.isUserLoggedIn()) {
    	return (
        <div className="logged-in group">
      		<hgroup className="header group">
            <Link to="/dashboard" className="logo-link"></Link>
            <span className="top-nav group">
              <div className="welcome">
          			<h2 className="header-name">Hi, {SessionStore.currentUser().first_name}!</h2>
                <h2 className="header-favorites">Start Querying Your Data</h2>
              </div>
        			<input id="logout" className="header-button" type="submit" value="Logout" onClick={ this._handleLogOut } />
            </span>
      		</hgroup>

          <div className="demo-page group">
            <span className="left-nav-outer">
              <LeftNav />
            </span>
            <div className="feature group">
              { this.props.children }
            </div>
          </div>

          <div className="footer group">
            <span className="bot-nav group">
              <div className="bot-nav-item">Contact Us</div>
              <div className="bot-nav-item">Terms of Service</div>
              <div className="bot-nav-item">Privacy Policy</div>
              <div id="copyright" className="bot-nav-item">© 2016 Applicative, Inc.</div>
            </span>
          </div>
        </div>
    	);
    } else if ( !["/login", "/signup"].includes(this.props.location.pathname) ) {
      hashHistory.push('/login');

    } else {
      return (
        <div className="tall group">
          { this.props.children }
        </div>
      );
    }
  },

  render() {
    return (
      <div className="tall">
        { this.greeting() }
      </div>
    );
  }
});

module.exports = App;
