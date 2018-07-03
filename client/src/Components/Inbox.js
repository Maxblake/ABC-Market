import React,{Component} from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import ContactButton from './ContactButton'

export default class Inbox extends Component{

    state={
            chat:false,
            chatContactName:""
    }


    componentDidMount(){
        console.log(this.props)
    }


    handleClick=(contact)=>{
        if(contact){
        this.setState({chat:!this.state.chat,
        chatContactName:contact.name});
        }else{
            this.setState({chat:!this.state.chat,
                chatContactName:""});
        }

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
                        {!this.state.chat ?
                        <Grid item xs={12}>
                        {this.props.contacts.map((contact)=>(
                            <div>
                            <ContactButton 
                            style={{height:120}}
                            key={contact.name}
                            type="contact" 
                            sendMsg={true}
                            handleClick={()=>this.handleClick(contact)}
                            contact={contact}/>
                            <br/>
                            </div>
                        ))}
                        </Grid>: 
                        <Grid item xs={12}>
                        <div>
                            <h1>Chat with : {this.state.chatContactName}</h1>
                            <Button color="secondary" onClick={this.handleClick}>Go Back</Button>
                        </div>
                        </Grid>
                                }
                                </Grid>

                    
                
                </Grid>
            
            </Grid>

        )



    }
}