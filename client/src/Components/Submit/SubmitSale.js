import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import UserInfo from '../UserInfo';

import { Link } from 'react-router-dom';

class SubmitSale extends Component{

    state={
        user:{id:1},
        category:"",
        time:0,
        location:""
    }

    handleChange=(event)=>{
        console.log(event.target.name+"//"+event.target.value)
            this.setState({[event.target.name]:event.target.value});
      }

    render(){
        return(
                <Grid container justify='center'>
                    {/* <Breadcrumb data={this.props.location.pathname} /> */}
                    <Grid item xs={12} sm={8}><br/>
                    <Typography variant="headline">
                    Submit/Sale
                    </Typography><br/>
                        <Paper>
                            <Grid container direction="row"
                            justify="center"
                            >
                                <Grid item xs={8}>
                                <UserInfo user={this.state.user} key={this.state.user.id} /> 
                                </Grid>
                            </Grid>
                            
                            <Grid container direction="row" justify="center" spacing={24}>
                                <Grid item xs={12} sm={3}>
                                <FormControl fullWidth margin="normal">
                                            <InputLabel >Category</InputLabel>
                                            <Select
                                            
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                                input={<Input name="category" />}
                                            >
                                            {this.props.showcase.categories.map((category,index)=>(
                                                <MenuItem key={index}value={category}>{category}</MenuItem>
                                            ))}
                                            </Select>
                                            <FormHelperText>Select Category </FormHelperText>
                                        </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    margin="normal"
                                    label="Name"
                                    placeholder="Use key words to help users find this post easily..."
                                    ></TextField>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center"
                            alignItems="center">
                            <Grid item xs={12} sm={4}>
                            <Typography variant="subheading">
                            
                            Whats for sale?</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth
                                    id="subject"
                                    margin="normal"
                                    label="Subject"
                                />
                            </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center" spacing={24}>
                            <Grid item xs={12} sm={5}>
                            <TextField 
                                    fullWidth
                                    id="calendary"
                                    margin="normal"
                                    label="Date range picker"
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                            <TextField 
                                    fullWidth
                                    id="location"
                                    margin="normal"
                                    label="Add Geolocation"
                                />
                            </Grid>
                            </Grid>
                            
                    <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={10}>
                            <Grid container direction="row" justify="center" spacing={8}
                            alignItems="center"
                            >
                            <Grid item xs={12} sm={6} >
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Post time</InputLabel>
                                    <Select
                                    
                                    value={this.state.time}
                                    onChange={this.handleChange}
                                        input={<Input name="time" />}
                                    >
                                        <MenuItem value={30}>30 days</MenuItem>
                                        <MenuItem value={60}>60 days</MenuItem>
                                        <MenuItem value={90}>90 days</MenuItem>
                                    </Select>
                                    <FormHelperText>Period that the post will be visible to users</FormHelperText>
                                </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Location</InputLabel>
                                    <Select
                                    
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                        input={<Input name="location" />}
                                    >
                                        <MenuItem value={"Aruba"}>Aruba</MenuItem>
                                        <MenuItem value={"Bonaire"}>Bonaire</MenuItem>
                                        <MenuItem value={"Curacao"}>Curacao</MenuItem>
                                    </Select>
                                    <FormHelperText>Product origin </FormHelperText>
                                </FormControl>
                                </Grid>
                            
                            </Grid>
                            </Grid>
                        
                    </Grid>
                    <Grid container direction="row" justify="center">
                    <Grid item xs={10}>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            margin="normal"
                            placeholder="detail the product the best way possible for better user understanding and to ease the sale "
                        ></TextField>
                    </Grid>
                    </Grid>
                            
                            <br/><br/> 
                            <Grid container direction="row" justify="center">
                                <Button
                                variant="raised"
                                color="secondary"
                                > Submit </Button>
                            </Grid>
                            
                                                                                                    
                        </Paper>
                    
                    
                    </Grid>
                
                
                </Grid>

        )
    }
}

export default SubmitSale