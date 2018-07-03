import React,{Fragment}from 'react';
import {Button,Typography,Toolbar,AppBar} from '@material-ui/core'
import{Link} from 'react-router-dom'

export default class Header extends React.Component{


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
          {user.username}
        </Typography>
        <Button 
          style={{display:"block",float:"left"}}
          color="inherit"
          onClick={this.props.toggleLog}
          component={Link} to="/login"
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
          onClick={this.props.toggleLog}
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