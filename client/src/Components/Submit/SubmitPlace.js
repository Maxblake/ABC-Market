import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import UserInfo from '../User/UserInfo';
import { Link } from 'react-router-dom';
import { newPlace } from './helpers/Request';
import GetLocation  from '../Map/GetLocation';
import loading from '../../images/loading.svg'
import Notification from '../../Helpers/Helpers'

class SubmitPlace extends Component{
    file = React.createRef();

    state={
        values: {
            category:'',
            title:'',
            specialty:'',
            schedule:'',
            link:'',
            post_time:'',
            location:'',
            description:'',
        },
        error: {
            category:null,
            title:null,
            specialty:null,
            schedule:null,
            geolocation: null,
            link:null,
            post_time:null,
            location:null,
            description:null,
        },
        geolocation: {},
        uploading: false,
        notification: {
            success: false,
            message: ''
        }
    }

    handleChange=(element)=>{
        let error = {...this.state.error}
        let values = {...this.state.values}
        
        if (element.target.value == '') {
          error[element.target.name] = true
        } else {
          error[element.target.name] = false
        }
        values[element.target.name] = element.target.value
        this.setState({ error, values })
    }

    closeNotification = () => {
        this.setState({ notification: {
            success: false
        }})
    }

    getLocation = (lat, long) => {
        const  { geolocation } = this.state
        geolocation.lat = lat
        geolocation.long = long
        this.setState({ geolocation })
    }

    checkInput = () => {
        let check = true
        let error = { ...this.state.error }
        Object.keys(error).map(err => {
            if (error[err] == null || error[err]) { 
                check = false
                this.setState(prevState => ({
                    error: { 
                        ...prevState.error,
                        [err]:true 
                    }  
                }))
            }
        })
        return check
    }
    
    create = () => {
        if (this.checkInput()) {
            this.setState({ uploading: true })
            const { title, category, specialty, schedule, link, post_time, location, description } = this.state.values
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
            body.append('address', JSON.stringify(this.state.geolocation))
            body.append('link', link)
            body.append('post_time', post_time)
            body.append('location', location)      
            newPlace(body, response => {
                this.setState({ uploading: false, notification: {success:true, message:response} })
                if (response == "Sale uploaded") setTimeout(() => window.location.href = '../showcase/places', 5000)
            })
        }
    }
    render(){
        const { error, values } = this.state
        return(
            <Grid container justify='center'>
                <Grid item xs={12} sm={8}><br/>
                <Typography variant="headline">
                Submit/Place
                </Typography><br/>
                {this.state.uploading == false ? 
                    <Paper>
                        <Grid container direction="row" justify="center" spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Category</InputLabel>
                                        <Select
                                            value={values.category}
                                            onChange={this.handleChange}
                                            error={error.category}
                                            input={<Input name="category" />}
                                            >
                                            {this.props.showcase.categories.map((category,index)=>(
                                                <MenuItem key={index}value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText error={error.category}>{error.category ? 'Fill category' : 'Select category'}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    fullWidth
                                    name="title"
                                    margin="normal"
                                    label="Title"
                                    error={error.title}
                                    helperText={(error.title ? 'Title cannot be blank' : '')} 
                                    placeholder="Use key words to help users find this post easily..."
                                    onChange={this.handleChange}>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            direction="row" 
                            justify="center"
                            alignItems="center">
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subheading">
                                    Whats your specialty?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth
                                    name="specialty"
                                    margin="normal"
                                    error={error.specialty}
                                    helperText={(error.specialty ? 'Specialty cannot be blank' : '')} 
                                    label="Specialty"
                                    onChange={this.handleChange}/>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={24}>
                            <Grid item xs={12} sm={5}>
                                <TextField 
                                    fullWidth
                                    name="schedule"
                                    margin="normal"
                                    error={error.schedule}
                                    helperText={(error.schedule ? 'Work hours cannot be blank' : '')} 
                                    label="Work Hours"                                        
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <GetLocation fullWidth
                                    name="geolocation"
                                    margin="normal"
                                    label="Add Geolocation"                                       
                                    getLocation={this.getLocation}/>
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
                                    margin="normal"/>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={10}>
                                <Grid 
                                    container 
                                    direction="row" 
                                    justify="center" 
                                    spacing={8}
                                    alignItems="center">
                                    <Grid item xs={12} sm={6} >
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel >Post time</InputLabel>
                                            <Select
                                                value={values.post_time}
                                                onChange={this.handleChange}
                                                input={<Input name="post_time" />}>
                                                <MenuItem value={30}>30 days</MenuItem>
                                                <MenuItem value={60}>60 days</MenuItem>
                                                <MenuItem value={90}>90 days</MenuItem>
                                            </Select>
                                            <FormHelperText error={error.post_time}> {error.post_time ? 'Fill post time' : 'Period that the post will be visible to users' }</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel >Location</InputLabel>
                                                <Select
                                                    value={values.location}
                                                    onChange={this.handleChange}
                                                    input={<Input name="location" />}>
                                                    <MenuItem value={"Aruba"}>Aruba</MenuItem>
                                                    <MenuItem value={"Bonaire"}>Bonaire</MenuItem>
                                                    <MenuItem value={"Curacao"}>Curacao</MenuItem>
                                                </Select>
                                                <FormHelperText error={error.location}> {error.location ? 'Fill location' : 'Product origin' }</FormHelperText>
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
                                    error={error.description}
                                    helperText={(error.description ? 'Description cannot be blank' : '')} 
                                    onChange={this.handleChange}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                            <input
                                type="file"
                                multiple
                                ref={this.file}>
                            </input> 
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
                    </Grid> 
                    }        
                    <Notification success={this.state.notification.success} message={this.state.notification.message} closeNotification={this.closeNotification}/>        
                </Grid>            
            </Grid>
        )
    }
}

export default SubmitPlace