import React,{Component} from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import ContactButton from './ContactButton'
import Chat from '../../Containers/Chat'
import { withRouter } from 'react-router'
import { userContacts } from '../User/Request';
const queryString = require('query-string');

    class Inbox extends Component{

    state={
        contacts:[],
        chat:false,
        chatContactName:""
    }

    componentDidMount(){
        userContacts(response => {
            if(response != null) {
                this.setState({
                    contacts: this.state.contacts.concat(response),
                    loadedContacts: true
                })
            }
        })
    }
    
    chat = contact => {
        const { name, trade_id } = contact
        this.props.history.push({
            pathname:`/inbox/${trade_id}`,
            state: { name }
        })
    }

    render(){
        return (
            <Grid container justify="center">
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    <Typography variant="display2">
                        Inbox
                    </Typography>
                </Grid>
                <br/><br/>
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    <Grid item xs={12} sm={8}>
                        <Grid item xs={12}>
                        {this.state.loadedContacts == true ? 
                            this.state.contacts.map(contact=>(
                                <div>
                                <ContactButton 
                                    style={{height:120}}
                                    key={contact.trade_id}
                                    type="contact" 
                                    sendMsg={true}
                                    chat={()=>this.chat(contact)}
                                    contact={contact}/>
                                <br/>
                                </div>
                            ))
                            : null
                        }
                        </Grid>
                    </Grid>
                </Grid>    
            </Grid>
        )
    }
}

export default withRouter(Inbox)
