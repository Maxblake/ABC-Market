import React from "react";
import axios from 'axios'
require('../assets/style/login.css');

class LoginForm extends React.Component {
  email = React.createRef();
  password = React.createRef();

  signUp = (event) => {
    event.preventDefault();
    axios.post('/login', {
      email:this.email.current.value,
      password:this.password.current.value
    }).then((result)=> {
        if (result.data.status === 200) {
          this.props.history.push('/');
        }
    }).catch((err)=>console.log(err))
  };

  render() {
    return (
      <div className="login-page">
        <h1> Log in </h1>
        <div className="login-form">
          <form className="form" onSubmit={this.signUp}>
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
