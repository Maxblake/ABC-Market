import React from "react";
require('../assets/style/login.css');

class LoginForm extends React.Component {
  email = React.createRef();
  password = React.createRef();

  logIn = (event) => {
    event.preventDefault();
    console.log(this.email.current.value,  this.password.current.value)
  };

  render() {
    return (
      <div className="login-page">
        <h1> Log in </h1>
        <div className="login-form">
          <form className="form" onSubmit={this.logIn}>
          <input
            type="text"
            ref={this.email}
            placeholder="Type message...">
          </input>
          <input
            type="password"
            ref={this.password}
            placeholder="Type message...">
          </input>
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    )
	}
}

export default LoginForm;
