import React, { Component } from 'react'
import { logIn, isLogged, logOut, signUp } from './Request';
import { withRouter } from 'react-router';

export const Session = React.createContext({
    user: null,
    setSession: () => {},
    refreshSession: () => {},
    nullSession: () => {},
    createUserAndSession: () => {}
})

class Auth extends Component {
    state = {
        user: null,
        setSession: (username, password) => {
            logIn(username, password, user => {
                if (user != null) {
                    this.setState({ user })
                    window.location.href = `/home/${user.type}`
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
        },
        createUserAndSession: (name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address) => {
            signUp(name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address, user => {
                if (user != null) {
                    this.setState({ user })
                    window.location.href = `/home/${user.type}`
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
