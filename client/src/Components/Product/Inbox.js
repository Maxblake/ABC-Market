import React,{Component} from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import ContactButton from './ContactButton'
import Chat from '../../Containers/Chat'
import { withRouter } from 'react-router'
const queryString = require('query-string');

    class Inbox extends Component{

    state={
        chat:false,
        chatContactName:""
    }


    componentDidMount(){

    }
    
    chat = contact => {
        const { name, id } = contact
        this.props.history.push({
            pathname:`/inbox/${id}`,
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
                        {this.props.contacts.map((contact)=>(
                            <div>
                            <ContactButton 
                                style={{height:120}}
                                key={contact.id}
                                id={contact.id}
                                type="contact" 
                                sendMsg={true}
                                chat={()=>this.chat(contact)}
                                contact={contact}/>
                            <br/>
                            </div>
                        ))}
                        </Grid>
                    </Grid>
                </Grid>    
            </Grid>
        )
    }
}

export default withRouter(Inbox)