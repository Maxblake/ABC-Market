import React,{Component} from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import ContactButton from './ContactButton'
import Chat from '../Containers/Chat'
import { withRouter } from 'react-router'
const queryString = require('query-string');

    class Inbox extends Component{

    state={
            chat:false,
            chatContactName:""
    }


    componentDidMount(){
        console.log(this.props)
    }


    handleClick=(contact)=>{
        // if(contact){
        // this.setState({chat:!this.state.chat,
        // chatContactName:contact.name});
        // }else{
        //     this.setState({chat:!this.state.chat,
        //         chatContactName:""});
        // }
    }
    
    chat = contact => {
        const { name, id }= contact
        this.props.history.push({
            pathname:`/inbox/${contact.id}`,
            state: { name,
                     reciever: contact.id 
                    }
        })
    }

    render(){
        return (
            <Grid container justify="center">
                <Grid container direction="row"
                justify="center">
                <Typography variant="display2">
                {this.props.user.name[this.props.user.name.length-1]==="s" ? this.props.user.name+"'":
                this.props.user.name+"'s"} Inbox
                </Typography>
                
                </Grid>
                <br/><br/>
                <Grid container direction="row"
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