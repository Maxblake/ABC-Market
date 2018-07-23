import React,{Component} from 'react';
import { Grid, Typography } from '@material-ui/core';
import GridListComp from './GridListComp'
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';

export default class Watch extends Component{
        state={
            editMode:true,
            uploads:[
                {
                    image:"image",
                    name:"Franela manga corta",
                    condition:"New",
                    price:"200"
                },
                {
                    image:"TV image",
                    name:"Televisor Samsung 4K",
                    condition:"New",
                    price:"3000"
                },
                {
                    image:"TV image",
                    name:"Televisor Samsung 4K",
                    condition:"New",
                    price:"3000"
                }
            ]
       }

       toggleEdit=()=>{
           this.setState({editMode:!this.state.editMode})
           console.log(this.state.editMode)
       }

       
        render(){
            return(
                <Grid container justify="center">
                    
                    <Typography variant="display2">
                        {this.props.showcase.title}
                    </Typography>
                    <Grid container direction="row"
                        justify="center"
                        spacing={40}>
                                <Grid item xs={10}>
                                <TextField
                                    id="search"
                                    label="Search "
                                    fullWidth
                                    color="secondary"
                                    type="search"
                                    margin="normal"
                                    />
                                    </Grid>
                        </Grid>
                    <Grid container direction="row"
                    justify="center">
                    
                    
                    <br/>
                    <GridListComp type="product" edit={true} products={this.state.uploads}/>
                    </Grid>
                    <br/>
                    <Typography variant="display2">
                    Latest Contacts
                    </Typography>
                    <Grid container direction="row"
                    justify="center">
                    <GridListComp type="contact" sendMsg={true} contacts={this.props.contacts}/>
                    </Grid>

                        
                    </Grid>


            )
        }


}