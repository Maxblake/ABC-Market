import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserInfo from '../User/UserInfo';
import {Breadcrumbs} from 'react-breadcrumbs'
import loading from '../../images/loading.svg'
import { newService } from './helpers/Request';
import Notification from '../../Helpers/Helpers'

class SubmitService extends Component{
    
    state={
        values: {
            title:'',
            category:'',
            post_time:'',
            description:'',
            location:'',
        },
        error: {
            title:null,
            category:null,
            post_time:null,
            description:null,
        },
        uploading: false,
        notification: {
            success: false,
            message: ''
        }
    }

    handleChange=(element)=>{
        let error = {...this.state.error}
        let values = {...this.state.values}
        error[element.target.name] = (element.target.value == '') ? true : false
        values[element.target.name] = element.target.value
        this.setState({ error, values })
    }

    closeNotification = () => {
        this.setState({ notification: {
            success: false
        }})
    }

    checkInput = () => {
        let check = true
        let error = { ...this.state.error }
        Object.keys(error).map(err => {
            if (error[err] == null || error[err])   { 
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
            this.setState({uploading: true})
            newService(this.state.values, response => {
                this.setState({ uploading: false, notification: { success:true, message:response } })
                if (response == "Service uploaded") setTimeout(() => window.location.href = '../showcase/sales', 5000)
            })
        }
    }

    render(){
        const { error, values } = this.state
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
                                        variant="headline">
                                        What service do you offer? 
                                    </Typography>
                            </Grid>
                            <Grid container direction="row" justify="center" spacing={24}>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel >Category</InputLabel>
                                            <Select
                                                value={values.category}
                                                onChange={this.handleChange}
                                                input={<Input name="category" />}
                                            >
                                            {this.props.showcase.categories.map((category,index)=>(
                                                <MenuItem key={index} value={category}>{category}</MenuItem>
                                            ))}
                                            </Select>
                                            <FormHelperText error={error.category}> {error.category ? 'Fill category' : 'Select category' }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        name="title"
                                        margin="normal"
                                        error={error.title}
                                        helperText={(error.title ? 'Title cannot be blank' : '')} 
                                        label="Title"
                                        placeholder="Use key words to help users find you easily..."
                                        onChange={this.handleChange}/>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center" spacing={24}>
                                <Grid item xs={12} sm={3}>
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
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        error={error.description}
                                        helperText={(error.description ? 'Description cannot be blank' : '')} 
                                        margin="normal"
                                        placeholder="detail your service the best way possible for better user understanding  "
                                        onChange={this.handleChange}/>
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

export default SubmitService