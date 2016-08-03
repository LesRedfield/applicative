const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Dashboard = require('./dashboard');

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
        <div>
      		<hgroup className="header-group">
      			<h2 className="header-name">Hi, {SessionStore.currentUser().first_name}!</h2>
            <h2 className="header-favorites">Check out this Dashboard! The data is actually on the backend!!!</h2>
      			<input id="logout" className="header-button" type="submit" value="Logout" onClick={ this._handleLogOut } />
      		</hgroup>
          <Dashboard/>
      </div>
    	);
    } else if ( !["/login", "/signup"].includes(this.props.location.pathname) ) {
      return (
        <nav className="login-signup">
          <Link to="/login" activeClassName="current">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current">Sign up!</Link>
        </nav>
      );
    }
  },

  render() {
    return (
      <div className="home-page">
        <div className="blackout">
          { this.greeting() }
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;


// <header>
//   <Link to="/" className="header-link"><h1></h1></Link>
// </header>
