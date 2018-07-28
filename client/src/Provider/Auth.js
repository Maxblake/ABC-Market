import React, { Component } from 'react'

export let Session = React.createContext()

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }  
 
    this.updateUser = (user) => {
      this.state = {
        user
      }
    } 
 
  }


  render() {
    return (
      <Session.Provider value={this.state.user}>
        {this.props.children}
      </Session.Provider>
    )
  }
}
