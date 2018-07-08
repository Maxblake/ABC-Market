import React,{Fragment}from 'react';
import {Button,Typography,Toolbar,AppBar} from '@material-ui/core'
import{Link} from 'react-router-dom'
import { Session, Context } from '../Provider/Context';

export default class Header extends React.Component{

  logOut = () => {
    fetch('/logout', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      alert('Session closed')
      this.props.history.push('/')
    })
  }



render(){
  const {isLogged,user} = this.props;
  return (<div >
      <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          ABCMarket
        </Typography>
        
        <Button component={Link }to="/home" onClick={this.props.toggleUserType}color="inherit" >  Home</Button>
          {isLogged && user ?
        <Fragment>
        <Typography variant="button" color="inherit">
        {user.name}
        </Typography>
      <Button 
        style={{display:"block",float:"left"}}
        color="inherit"
        onClick={this.logOut}
        >Logout
        </Button>
        <Button 
        style={{display:"block",float:"left"}}
        color="inherit"
        component={Link} to="/profile"
        >My Account
        </Button>
        <Button 
        component={Link} to="/inbox"
        color="inherit">
        Inbox
        </Button>
        </Fragment>
        : <Fragment>
          
          <Button 
        style={{display:"block",float:"left"}}
        color="inherit"
        component={Link} to="/register"
        >Register
        </Button>
        <Button 
        style={{}} 
        color="inherit"
        component={Link} to="/login"
        >
        Login
        </Button> 
        </Fragment>
        }

      </Toolbar>
    </AppBar>
    </div>
  )
}

}