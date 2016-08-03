const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const LoginForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      email: "",
      password: ""
    };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

    if (this.props.location.pathname === "/login") {
      SessionActions.logIn(this.state);
    } else {
      SessionActions.signUp(this.state);
    }
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
			<div className="login-form-container">
        <h2 className="login-header">Sign In</h2>
				<form onSubmit={this.handleSubmit} className="login-form-box">
          <h3 className="login-message">Enter your email address and password to login.</h3>

					<span className="login-form">
            <div className="inside-login-form">
  		        <br />
  						<label>
  							<input type="text"
  		            value={this.state.email}
  		            onChange={this.inputHandler("email")}
                  placeholder="Email"
  								className="login-input" />
  						</label>

  		        <br />
  						<label>
  		          <input type="password"
  		            value={this.state.password}
  		            onChange={this.inputHandler("password")}
                  placeholder="Password"
  								className="login-input" />
  						</label>

  		        <br />
              <button className="login-button">Sign In</button>
            </div>
					</span>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;


// Please { this.formType() } or { navLink }
