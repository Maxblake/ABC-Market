import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import loading from '../../images/loading.svg'
import { newVehicle } from './helpers/Request';
import Notification from '../../Helpers/Helpers'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class SubmitVehicle extends Component{
    file = React.createRef();
    
    state={
        values: {
            brand:"",
            model:"",
            distance:"",
            year:"",
            fuel:"",
            negotiable:"",
            finance:"",
            interior:"",
            unique_owner:"",
            windows:"",
            steer:"",
            ac:"",
            post_time:"",
            location:"",
            description:""
        },
        error: {
            brand:null,
            model:null,
            distance:null,
            year:null,
            fuel:null,
            negotiable:null,
            finance:null,
            interior:null,
            unique_owner:null,
            windows:null,
            steer:null,
            ac:null,
            post_time:null,
            location:null,
            description:null
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
            const { brand, model, distance, year, fuel, negotiable, finance, interior, unique_owner, windows, steer, ac, post_time, location, description } = this.state.values
            const body = new FormData();
            const { files } = this.file.current;
            for (var i = 0; i < files.length; i++) {
                var filing = files[i];
                body.append('files[]', filing, filing.name);
            }
            body.append('brand', brand)
            body.append('model', model)
            body.append('distance', distance)
            body.append('year', year)
            body.append('fuel', fuel)
            body.append('negotiable', negotiable)
            body.append('finance', finance)
            body.append('interior', interior)
            body.append('unique_owner', unique_owner)
            body.append('windows', windows)
            body.append('steer', steer)
            body.append('ac', ac)
            body.append('post_time', post_time)
            body.append('location', location)      
            body.append('description', description)      
            newVehicle(body, response => {
                this.setState({ uploading: false, notification: {success:true, message:response} })
                if (response == "Vehicle uploaded") setTimeout(() => window.location.href = '../../showcase/products', 5000)
            })
        }
    }

    render(){
    const { error, values } = this.state
        return(
            <Grid container justify='center'>
                <Grid item xs={12} sm={8}><br/>
                    <Typography variant="headline">
                         Submit/Vehicle
                    </Typography><br/>
                    {this.state.uploading == false ? 
                    <Paper>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12}>
                                <Button
                                    color="primary" 
                                    type="file"
                                    multiple
                                    style={{justifyContent: 'center'}}
                                    ref={this.file}>
                                    Upload image
                                <CloudUploadIcon />
                                </Button>    
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                            <TextField
                                type="text"
                                name="brand"
                                label="Brand"
                                error={error.brand}
                                helperText={(error.brand ? 'Brand cannot be blank' : '')} 
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    type="text"
                                    name="model"
                                    label="Model"
                                    fullWidth
                                    error={error.model}
                                    helperText={(error.model ? 'Model cannot be blank' : '')} 
                                    margin="normal"
                                    onChange={this.handleChange}/>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    type="number"
                                    name="distance"
                                    label="Driven distance (Km)"
                                    error={error.distance}
                                    helperText={(error.distance ? 'Distance cannot be blank' : '')} 
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    type="number"
                                    name="year"
                                    label="Year"
                                    error={error.year}
                                    helperText={(error.year ? 'Year cannot be blank' : '')} 
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange}/>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Fuel type</InputLabel>
                                    <Select
                                        value={values.fuel}
                                        onChange={this.handleChange}
                                        input={<Input name="fuel" />}>
                                        <MenuItem value={"diesel"}>Diesel</MenuItem>
                                        <MenuItem value={"gasoline"}>Gasoline</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.fuel}>{error.fuel ? 'Fill fuel type' : 'Select fuel'}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Negotiable</InputLabel>
                                    <Select
                                        value={values.negotiable}
                                        onChange={this.handleChange}
                                        input={<Input name="negotiable" />}>
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.negotiable}>{error.negotiable ? 'Fill if price is negotiable' : 'Is the stated price negotiable?'}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Finance</InputLabel>
                                    <Select                                    
                                        value={values.finance}
                                        onChange={this.handleChange}
                                        input={<Input name="finance" />}>
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.finance}>{error.finance ? 'Fill is theres any kind of finance' : 'Do you offer any kind of finance'}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Interior material</InputLabel>
                                    <Select
                                        value={values.interior}
                                        onChange={this.handleChange}
                                        input={<Input name="interior" />}>
                                        <MenuItem value={"leather"}>Leather</MenuItem>
                                        <MenuItem value={"semi-leather"}>Semi-Leather</MenuItem>
                                        <MenuItem value={"fabric"}>Cotton Fabric</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.interior}>{error.interior ? 'Fill interior material of vehicle' : ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Unique Owner</InputLabel>
                                    <Select
                                        value={values.unique_owner}
                                        onChange={this.handleChange}
                                        input={<Input name="unique_owner" />}>
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.unique_owner}>{error.unique_owner ? 'Fill if you have been the only owner' : 'Have you been the only owner of the vehicle'}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                        <InputLabel >Windows</InputLabel>
                                        <Select
                                            value={values.windows}
                                            onChange={this.handleChange}
                                            input={<Input name="windows" />}>
                                            <MenuItem value={"electric"}>Electric</MenuItem>
                                            <MenuItem value={"manual"}>Manual</MenuItem>
                                        </Select>
                                        <FormHelperText error={error.windows}>{error.windows ? 'Fill windows field' : ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel >Pilot seat position</InputLabel>
                                    <Select                                    
                                        value={values.steer}
                                        onChange={this.handleChange}
                                        input={<Input name="steer" />}>
                                        <MenuItem value={"left"}>Left</MenuItem>
                                        <MenuItem value={"right"}>Right</MenuItem>
                                    </Select>
                                    <FormHelperText error={error.steer}>{error.steer ? 'Fill pilot seat position' : ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth margin="normal">
                                        <InputLabel >Air conditioning </InputLabel>
                                        <Select
                                            value={values.ac}
                                            onChange={this.handleChange}
                                            input={<Input name="ac" />}>
                                            <MenuItem value={"works"}>Working Perfectly</MenuItem>
                                            <MenuItem value={"regular"}>Works regularly</MenuItem>
                                            <MenuItem value={"notWork"}>Does not work</MenuItem>
                                            <MenuItem value={"not"}>Is not included</MenuItem>
                                        </Select>
                                        <FormHelperText error={error.ac}>{error.ac ? 'Fill air conditioning field' : 'Have you been the only owner of the vehicle'}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" spacing={8}>
                            <Grid item xs={10}>
                                <Grid container direction="row" justify="center" spacing={8} alignItems="center">
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
                                            <FormHelperText error={error.post_time}>{error.post_time ? 'Fill post time' : 'Period that the post will be visible to users'}</FormHelperText>
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
                                        <FormHelperText error={error.location}>{error.location ? 'Fill product origin' : 'Product origin'}</FormHelperText>
                                    </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" justify="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            multiline
                                            fullWidth
                                            rows={4}
                                            error={error.description}
                                            helperText={(error.description ? 'Description cannot be blank' : '')} 
                                            margin="normal"
                                            placeholder="detail the vehicle the best way possible for better user understanding and to ease the sale "
                                            onChange={this.handleChange}/>
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Grid>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                                <Grid container direction="row" justify="center">
                                    <Button variant="raised" color="secondary" onClick={this.create}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    <br/>																				
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

export default SubmitVehicle
