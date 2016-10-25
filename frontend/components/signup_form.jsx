const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const SignupForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    this.redirectIfLoggedIn();
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/dashboard");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

    if (this.props.location.pathname === "/signup") {
      SessionActions.signUp(this.state);
    } else {
      SessionActions.logIn(this.state);
    }
	},

  redirectToLogin() {
    this.context.router.push("/login");
  },

  formType() {
    return this.props.location.pathname.slice(1);
  },

  inputHandler(property, e) {
		return (e) => this.setState({[property]: e.target.value});
  },

	render() {

    let navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }

		return (

      <div className="home-page">
        <div className="blackout">

    			<div className="login-form-container">
            <div className="logo"></div>
            <h2 className="login-header">Sign Up</h2>
    				<form onSubmit={this.handleSubmit} className="login-form-box">
              <h3 className="login-message">Enter your name, email address, and password to sign up.</h3>

    					<span className="login-form">
                <div className="inside-login-form">

                  <br />
                  <label>
                    <input type="text"
                      value={this.state.first_name}
                      onChange={this.inputHandler("first_name")}
                      placeholder="First Name"
                      className="login-input-name" />
                  </label>

                  <br />
                  <label>
                    <input type="text"
                      value={this.state.last_name}
                      onChange={this.inputHandler("last_name")}
                      placeholder="Last Name"
                      className="login-input-name" />
                  </label>

      		        <br />
      						<label>
      							<input type="text"
      		            value={this.state.email}
      		            onChange={this.inputHandler("email")}
                      placeholder="Email"
      								className="login-input-email" />
      						</label>

      		        <br />
      						<label>
      		          <input type="password"
      		            value={this.state.password}
      		            onChange={this.inputHandler("password")}
                      placeholder="Password"
      								className="login-input-password" />
      						</label>

      		        <br />

                  <div id="signup-failed"></div>

                  <button className="login-button">
                    Sign Up
                    <span className="arrow"></span>
                  </button>
                </div>
    					</span>

              <br />

              <input id="guest" className="demo-button" type="submit" value="Log In Instead" onClick={ this.redirectToLogin } />
    				</form>
    			</div>
        </div>
      </div>

		);
	}
});

module.exports = SignupForm;


// Please { this.formType() } or { navLink }
