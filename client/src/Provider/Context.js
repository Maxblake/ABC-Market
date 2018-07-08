import React, { Component } from 'react'

export const Session = React.createContext('test')

export class Context extends Component {
  state = {
    user:{
      name:"Cesar",    
    },
    setUser: (u) => {
      this.setState({
        user:{
          name:"Works"
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
