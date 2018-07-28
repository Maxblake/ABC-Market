import React, { Component } from 'react'
import { logIn, isLogged, logOut } from './Request';
import { withRouter } from 'react-router';

export const Session = React.createContext()

class Auth extends Component {
    state = {
        user: null,
        setSession: (username, password) => {
            logIn(username, password, user => {
                if (user != null) {
                    this.setState({ user })
                    window.location.href = '/home'
                }
            })
        },
        refreshSession: () => {
            isLogged(user => {
                if (user != null) {
                    this.setState({ user })
                }
            })
        },
        nullSession: () => {
            logOut(user => {
                if (user) {
                    this.setState({ user: null })
                    alert('Session closed')
                }
            })
        }
    } 
  
    render() {
        return (
            <Session.Provider value={this.state}>
                {this.props.children}
            </Session.Provider>
        )
    }
}

export default Auth
