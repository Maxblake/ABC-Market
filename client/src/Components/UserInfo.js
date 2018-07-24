import React,{Component} from 'react';
import {Button,Grid,Icon,Typography,Paper} from '@material-ui/core'

export default class UserInfo extends Component{


    render(){
        return(
            
            <Grid item xs={12}sm={8}>
            <Paper>
            <Grid container direction="row"
            justify="center">
            <Grid item xs={12} sm={6}>
                            <p>{this.props.user.image}</p>
                        </Grid> 
                        <Grid item xs={12} sm={6} >
                            {this.props.toggleEdit ?<Grid container 
                            direction="row"
                            justify="flex-end">
                                <Button mini variant="fab" color="secondary" onClick={this.props.toggleEdit}>
                                        <Icon>edit_icon</Icon>
                                </Button>
                            </Grid>:""}
                            <Grid container direction="row"
                            justify="center">
                            {Object.keys(this.props.user).map((key,index)=>(
                                
                                <Grid key ={index}item xs={12}>
                                {key!=="image" ? 
                                <Typography
                                variant="headline"
                                key={key}
                                name={key}>
                                {key[0].toUpperCase()+key.substr(1)} : {this.props.user[key]}
                                </Typography>:null}
                                <br/>
                                </Grid>
                                
                            ))}
                            </Grid>
                        </Grid> 
            
            </Grid>   
           
            </Paper> 
            </Grid>
        )


    }



}