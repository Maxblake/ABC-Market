import React,{Component} from 'react';
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'


export default class HomePage extends Component{

        

        render(){
            return (

                <div>
                    <br/><br/>
                    <Grid container 
                    justify="center">
                    
                    <Grid item xs={8}>
                    <Paper>
                    <Grid container
                    direction="row"
                    justify="center"
                    spacing={40}
                    >
                        <Grid item xs={12} >
                        <Typography
                        fullWidth
                        variant="display2"
                        >{this.props.type ? "LOCAL":"TOURIST"}</Typography>
                        </Grid>
                        <Grid item >
                        <Button variant="outlined"
                        
                        onClick={this.changeLanguage}
                        >Spanish</Button>
                        </Grid>
                        <Grid item >
                        <Button variant="outlined"
                        onClick={this.changeLanguage}
                        >English</Button>
                        </Grid>
                        <Grid item >
                        <Button variant="outlined"
                        onClick={this.changeLanguage}
                        >Dutch</Button>
                        </Grid>
                    </Grid>  {/*Button row */}
                    <br/>
                    <Grid container 
                    direction="row"
                    justify="center"
                    spacing={40}
                    >
                        <Grid item xs={8}>
                        <Button fullWidth
                        variant="raised"
                        color="primary"
                        component={Link }
                        to="/about"
                        >ABOUT US / CONTACT</Button>
                        </Grid>
                        {this.props.type ?
                        <Grid item xs={8}>
                        <Button fullWidth
                        variant="raised"
                        color="primary"
                        component={Link}
                        to="/showcase/products"
                        >PRODUCTS</Button>
                        </Grid> :""}
                        </Grid>
                        <br/><br/><br/>
                    <Grid container 
                    direction="row"
                    justify="center"
                    spacing={40}
                    alignItems="flex-start">
                        <Grid container
                        direction="column"
                         xs={6}
                        spacing={40}>
                            <Grid item  >
                            <Button fullWidth
                            variant="raised"
                            color="primary"
                            component={Link }
                            to="/showcase/services"
                            >SERVICES</Button>
                            </Grid>
                            <Grid item  >
                            <Button fullWidth
                            variant="raised"
                            color="primary"
                            component={Link }
                            to="/showcase/places"
                            >PLACES</Button>
                            </Grid>
                            <Grid item  >
                            <Button fullWidth
                            variant="raised"
                            color="primary"
                            component={Link }
                            to="/showcase/sales"
                            >FOR SALE!!</Button>
                            </Grid>
                            {this.props.type ?
                            <Grid item  >
                            <Button fullWidth
                            variant="raised"
                            color="primary"
                            component={Link }
                            to="/remesas"
                            >REMESAS</Button>
                            </Grid>:""}
                            </Grid>
                            <Grid item xs={2}>
                            <Paper>
                                <Typography variant="caption">
                                 ADS:
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi adipisci impedit quibusdam reprehenderit vitae est placeat totam voluptatibus illo voluptate optio doloremque eos, vel dolores aliquam maiores natus qui possimus.
                                </Typography>
                            </Paper>
                            </Grid>
                        
                        </Grid>
                        
                    
                    
                    
                   </Paper>
                   </Grid>
                    </Grid>
                    </div>

                

            )
        }


}