import React from "react";
import axios from 'axios'
require('../assets/style/login.css');

class SignupForm extends React.Component {
  email = React.createRef();
  password = React.createRef();
  name = React.createRef();
  address = React.createRef();

  logIn = (event) => {
    event.preventDefault();
    axios.post('/signup', {
      email:this.email.current.value,
      password:this.password.current.value,
      address:this.address.current.value,
      name:this.name.current.value
    }).then((result)=>console.log(result.data))
      .catch((err)=>console.log(err))
  };

  render() {
    return (
      <div className="login-page">
        <h1> Sign up </h1>
        <div className="login-form">
          <form className="form" onSubmit={this.logIn}>
          <input
            type="text"
            ref={this.name}
            placeholder="Full name">
          </input>
          <input
            type="password"
            ref={this.address}
            placeholder="Address">
          </input>
          <input
            type="password"
            ref={this.email}
            placeholder="Email">
          </input>
          <input
            type="password"
            ref={this.password}
            placeholder="Password">
          </input>
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    )
	}
}

export default SignupForm;
