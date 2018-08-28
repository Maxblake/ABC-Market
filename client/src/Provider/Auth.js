import React, { Component } from 'react'
import { logIn, isLogged, logOut, signUp } from './Request';
import { withRouter } from 'react-router';
import { checkErrors } from '../Helpers/Helpers';

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
        setSession: (...options) => {
            let { username, password } = options[0]
            let errors = checkErrors(username, password)
            if (errors) {
                logIn(username, password, user => {
                    if (user != null) {
                        this.setState({ user })
                        window.location.href = `/home/${user.type}`
                    }
                })
            } 
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
        createUserAndSession: (...options) => {
            let { name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address } = options = options[0]
            let errors = checkErrors(name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address)
            if (errors) {
                signUp(name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address, user => {
                    if (user != null) {
                        this.setState({ user })
                        window.location.href = `/home/${user.type}`
                    }
                })
            }
        }
    } 
  
    getSession = () => {
        return this.state.user
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
