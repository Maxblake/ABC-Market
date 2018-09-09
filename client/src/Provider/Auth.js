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
            const credentials = options[0]
            const input = { credentials }
            let errors = checkErrors(input)
            if (errors) {
                logIn(input, user => {
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
            const credentials = options[0]
            const input = { credentials }
            let errors = checkErrors(input)    
            if (errors) {
                signUp(input, user => {
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
