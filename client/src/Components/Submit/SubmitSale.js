import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import UserInfo from '../User/UserInfo';
import MultipleDatePicker from 'react-multiple-datepicker'
import { Link } from 'react-router-dom';
import { newOffer } from './helpers/Request';
import { fixDate } from './helpers';
import GetLocation from '../Map/GetLocation'
import loading from '../../images/loading.svg'
import Notification from '../../Helpers/Helpers'

class SubmitSale extends Component{
    date = React.createRef()
    file = React.createRef()

    state={
        values: {
            category:"",
            title:"",
            price:"",
            location:"",
            description:"",
        },
        error: {
            category:null,
            title:null,
            price:null,
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
            this.setState({uploading: true})
            const date = this.date.current.state.selectedDates
            const { category, title, price, location, description } = this.state.values
            const { files } = this.file.current
            const start = fixDate(date[0])
            const finish =fixDate(date[1])
            const body = new FormData()
            for (var i = 0; i < files.length; i++) {
                var filing = files[i];
                body.append('files[]', filing, filing.name);
            }
            body.append('description', description)
            body.append('category', category)
            body.append('title', title)
            body.append('address', JSON.stringify(this.state.geolocation))
            body.append('start', start)
            body.append('finish', finish)
            body.append('location', location) 
            body.append('price', price) 
            newOffer(body, response => {
                this.setState({ uploading: false, notification: {success:true, message:response} })
                if (response == "Sale uploaded") setTimeout(() => window.location.href = '../showcase/sales', 5000)
            })
        }
    }
    
    render(){
        const { error, values } = this.state
        return(
          <Grid container justify='center'>
                <Grid item xs={12} sm={8}><br/>
                <Typography variant="headline">
                Submit/Sale
                </Typography><br/>
                {this.state.uploading == false ? 
                        <Paper>
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    multiple
                                    ref={this.file}>
                                </input> 
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
                                                <MenuItem key={index}value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText error={error.category}> {error.category ? 'Fill category' : 'Select category' }</FormHelperText>
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
                                    onChange={this.handleChange}
                                    placeholder="Use key words to help users find this post easily..."
                                    ></TextField>
                                </Grid>
                            </Grid>
                            <Grid 
                                container 
                                direction="row" 
                                justify="center">
                                <Grid container direction="row" justify="center" spacing={8}>
                                    <Grid item xs={10}>
                                        <Grid 
                                            container 
                                            direction="row" 
                                            spacing={8}
                                            alignItems="center">
                                            <Grid item xs={2} sm={6} >
                                                <InputLabel >Post time</InputLabel>
                                                    <MultipleDatePicker
                                                        fullWidth margin="normal"
                                                        ref={this.date}
                                                        label="Select start and finish date"
                                                    />
                                                    <FormHelperText>Period that the post will be visible to users</FormHelperText>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <GetLocation fullWidth
                                                        name="geolocation"
                                                        margin="normal"
                                                        label="Add Geolocation"                                       
                                                        getLocation={this.getLocation}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
                                        <TextField
                                            fullWidth
                                            name="price"
                                            margin="normal"
                                            error={error.price}
                                            helperText={(error.price ? 'Price cannot be blank' : '')} 
                                            label="Price"
                                            onChange={this.handleChange}
                                            ></TextField>
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
                                        error={error.description}
                                        helperText={(error.description ? 'Description cannot be blank' : '')} 
                                        margin="normal"
                                        placeholder="Detail the product the best way possible for better user understanding and to ease the sale "
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
                        </Grid> 
                        }
                    <Notification success={this.state.notification.success} message={this.state.notification.message} closeNotification={this.closeNotification}/>        
                </Grid>
            </Grid>
        )
    }
}

export default SubmitSale
