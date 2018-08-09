import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import UserInfo from '../User/UserInfo';

import { Link } from 'react-router-dom';

class SubmitPlace extends Component{
    file = React.createRef();

    state={
        category:'',
        title:'',
        specialty:'',
        schedule:'',
        geolocation:'',
        link:'',
        post_time:'',
        location:'',
        description:''
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }

    
    create = () => {
        const { title, category, specialty, schedule, geolocation, link, post_time, location, description } = this.state
        const body = new FormData();
        const { files } = this.file.current;
        for (var i = 0; i < files.length; i++) {
            var filing = files[i];
            body.append('files[]', filing, filing.name);
        }
        body.append('description', description)
        body.append('category', category)
        body.append('title', title)
        body.append('specialty', specialty)
        body.append('schedule', schedule)
        body.append('address', geolocation)
        body.append('link', link)
        body.append('post_time', post_time)
        body.append('location', location)      
        fetch('/product/place/new', {
            method: 'POST',
            credentials: 'include',
            body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        }).catch(err => {
            alert('connection error')
            console.log(err)
        })
    }
    render(){
    return(
            <Grid container justify='center'>
                {/* <Breadcrumb data={this.props.location.pathname} /> */}
                <Grid item xs={12} sm={8}><br/>
                <Typography variant="headline">
                Submit/Place
                </Typography><br/>
                    <Paper>
                    <Grid container direction="row"
                    justify="center"
                    >
                        <Grid item xs={12}>
                           <input
                            type="file"
                            multiple
                            ref={this.file}>
                           </input> 
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
                                name="title"
                                margin="normal"
                                label="Title"
                                placeholder="Use key words to help users find this post easily..."
                                onChange={this.handleChange}
                                ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={4}>
                        <Typography variant="subheading">
                        
                        Whats your specialty?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth
                                name="specialty"
                                margin="normal"
                                label="Specialty"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={24}>
                        <Grid item xs={12} sm={5}>
                        <TextField 
                                fullWidth
                                name="schedule"
                                margin="normal"
                                label="Work Hours"                                        
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <TextField 
                                fullWidth
                                name="geolocation"
                                margin="normal"
                                label="Add Geolocation"                                       
                                onChange={this.handleChange}

                            />
                        </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center">
                    <Grid item xs={10}>
                        <TextField
                        fullWidth
                        name="link"
                        label="Youtube Link"
                        defaultValue="http://"
                        onChange={this.handleChange}
                        margin="normal"></TextField>
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
                        name="description"
                        label="Description"
                        multiline
                        fullWidth
                        rows={4}
                        margin="normal"
                        placeholder="detail the product the best way possible for better user understanding and to ease the sale "
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
                
                
                </Grid>
            
            
            </Grid>

        )
    }
}

export default SubmitPlace