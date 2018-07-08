import React,{Component} from 'react';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { withRouter } from 'react-router'


class ContactButton extends Component{
    render(){

        return (

            
                <Grid item xs={12} sm={12}>
                <Paper >
                    <Grid container direction="row"
                    >
                        <Grid item xs={3}>
                            <Typography>
                                {this.props.contact.image}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography variant="headline"
                        >
                            {this.props.contact.name}
                        </Typography><br/>
                        <Typography variant="headline"
                        >
                            {this.props.contact.phone}
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {Object.keys(this.props.contact.reason).map((key)=>(
                                <Typography 
                                key={key}
                                variant="subheading">
                                {key}:{ this.props.contact.reason[key]}
                                </Typography>
                            ))}
                            {this.props.sendMsg ? 
                            <Button variant="outlined"
                            color="secondary"
                            onClick={() => this.props.chat()}
                            > Send Message</Button>:""
                        }
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>

        )
    }
}

export default withRouter(ContactButton)