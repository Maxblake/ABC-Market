import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import {Breadcrumbs} from 'react-breadcrumbs'
import loading from '../../images/loading.svg'
import { newService } from './helpers/Request';

class SubmitService extends Component{
    
    state={
        title:'',
        category:'',
        post_time:'',
        description:'',
        location:null,
        uploading: false
    }

    handleChange=(event)=>{
        console.log(event.target.name+"//"+event.target.value)
        this.setState({[event.target.name]:event.target.value});
    }

    create = () => {
        this.setState({uploading: true})
        const { title, category, post_time, description, location } = this.state
        newService(title, category, post_time, description, location, response => {
            this.setState({uploading: false})
            alert(response)
        })
    }

    render(){
        return(
            <Grid container justify='center'>
            <Grid item xs={12} sm={8}><br/>
            <Typography variant="headline">
            Submit/Service
            </Typography><br/>
            {this.state.uploading == false ? 
                    <Paper>
       
                    <Grid container direction="row" justify="center">
                            <Typography
                            variant="headline"
                            >
                            What service do you offer? 

                            </Typography>
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
                                        <MenuItem key={index} value={category}>{category}</MenuItem>
                                    ))}
                                    </Select>
                                    <FormHelperText>Select Category </FormHelperText>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            name="title"
                            margin="normal"
                            label="Title"
                            placeholder="Use key words to help users find you easily..."
                            onChange={this.handleChange}
                         ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={24}>
                        <Grid item xs={12} sm={3}>
                        <FormControl fullWidth margin="normal">
                                    <InputLabel >Post time</InputLabel>
                                    <Select
                                    
                                    value={this.state.post_time}
                                    onChange={this.handleChange}
                                        input={<Input name="post_time" />}
                                    >
                                        <MenuItem value={30}>30 days</MenuItem>
                                        <MenuItem value={60}>60 days</MenuItem>
                                        <MenuItem value={90}>90 days</MenuItem>
                                    </Select>
                                    <FormHelperText>Period that the post will be visible to users</FormHelperText>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            margin="normal"
                            placeholder="detail your service the best way possible for better user understanding  "
                            onChange={this.handleChange}
                      ></TextField>
                        </Grid>
                    </Grid>
                    <br/><br/> 
                    <Grid container direction="row" justify="center">
                        <Button
						variant="raised"
						color="secondary"
                        onClick={this.create}
						> Submit </Button>
                    </Grid>
                    
                  																			
                </Paper>
                : 
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    <img src={loading} />
                </Grid> }
            
            </Grid>
        
        
        </Grid>

        )
    }
}

export default SubmitService