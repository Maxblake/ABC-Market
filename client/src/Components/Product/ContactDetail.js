import React,{Component,Fragment} from 'react'
import {Button,Grid,Collapse,TextField,Typography,Paper} from '@material-ui/core'


export default class ContactDetail extends Component{

    state = {
        message: "",
    }    

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    }

    componentDidMount=()=>{
        let toRender=[];
        let i = 0;
        for(const key in this.props.seller){
            toRender[i]=<Typography key={key}variant="subheading">
            ${key} : ${this.props.seller[key]} 
            </Typography>
            i++
        }
        return toRender;
    }
    render(){
        return (
            <Fragment>
                <Paper>
                    <Grid 
                        container
                        direction="row"
                        alignItems="center">
                        <Grid item xs={6} sm={3}>
                            <img src="" alt=""/>
                            image:

                        </Grid>
                        <Grid item xs={6} sm={6}>
                        
                            <Typography variant="subheading">
                                name: {this.props.seller.name}   lastName: {this.props.seller.lastname}
                            </Typography>
                            <Typography variant="subheading">
                                gender: {this.props.seller.gender}
                            </Typography>
                            <Typography variant="subheading">
                                phone number: {this.props.seller.code}-{this.props.seller.phoneNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant="raised" color="secondary" 
                            onClick={this.props.messageToggle}
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Collapse in={this.props.msg}>
                    <Paper>
                        <Grid  container
                        direction="row"
                        justify="center"
                        > 
                            <Grid item xs={12} sm={9}>
                                <TextField
                                label="Message"
                                multiline
                                name="message"
                                fullWidth
                                onChange={this.handleChange} 
                                rows="4"/>
                            </Grid> 
                            <Grid item xs={12} sm={3}>
                                <Button 
                                    variant="raised" 
                                    color="secondary"
                                    onClick={() => this.props.sendMessage(this.state.message)}
                                >Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Collapse>
            </Fragment>
        )
    }
}
