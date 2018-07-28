import React,{Fragment}from 'react';
import {Button,Typography,Toolbar,AppBar} from '@material-ui/core'
import{ Link } from 'react-router-dom'
import { withRouter } from 'react-router';

import { Session } from '../../Provider/Auth';
import { isLogged } from '../../Provider/Request';


class Header extends React.Component{
  
    state = {
        logged: false
    }

    componentDidMount() {
        this.props.session()
    }

    render(){
        const { session, user } = this.props;
        return (
            <div >
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            ABCMarket
                        </Typography>
                        
                        <Button component={ Link }to="/home" onClick={this.props.toggleUserType}color="inherit" >  Home</Button>
                        { (user != null) ?
                        <Fragment>
                            <Typography variant="button" color="inherit">
                            {user.name} 
                            </Typography>
                            <Session.Consumer>
                                {session => (
                                    <Button 
                                        style={{display:"block",float:"left"}}
                                        color="inherit"
                                        onClick={session.nullSession}
                                        component={ Link } to="/home" 
                                        >Logout
                                    </Button>
                                )}
                            </Session.Consumer>
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
                        : 
                        <Fragment>
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

export default withRouter(Header)