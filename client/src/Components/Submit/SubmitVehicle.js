import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';

class SubmitVehicle extends Component{
    state={
        fuel:"",
        negotiable:"",
        financing:"",
        interior:"",
        onlyOwner:"",
        windows:"",
        steer:"",
        ac:"",
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
            
            <Grid item xs={12} sm={8}><br/>
            <Typography variant="headline">
            Submit/Vehicle
            </Typography><br/>
                <Paper>
                    <Grid container direction="row"
                    justify="center"
                    >
                        <Grid item xs={12}>
                            <Typography
                            variant="headline"
                            >Multer pls</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={12} sm={5}>
                        <TextField
                        type="text"
                        id="make"
                        label="Make"
                        fullWidth
                        margin="normal"
                        > </TextField>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <TextField
                        type="text"
                        id="model"
                        label="Model"
                        fullWidth
                        margin="normal"
                        > </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={12} sm={5}>
                        <TextField
                        type="number"
                        id="driven"
                        label="Driven distance (Km)"
                        fullWidth
                        margin="normal"
                        > </TextField>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <TextField
                        type="number"
                        id="year"
                        label="Year"
                        fullWidth
                        margin="normal"
                        > </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                    <Grid item xs={12} sm={5}>
                    <FormControl fullWidth margin="normal">
                            <InputLabel >Fuel type</InputLabel>
                            <Select
                            
                            value={this.state.fuel}
                            onChange={this.handleChange}
                                input={<Input name="fuel" />}
                            >
                                <MenuItem value={"diesel"}>Diesel</MenuItem>
                                <MenuItem value={"gasoline"}>Gasoline</MenuItem>
                            </Select>
                            <FormHelperText></FormHelperText>
                                </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <FormControl fullWidth margin="normal">
                            <InputLabel >Negotiable</InputLabel>
                            <Select
                            
                            value={this.state.negotiable}
                            onChange={this.handleChange}
                                input={<Input name="negotiable" />}
                            >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                            <FormHelperText>Is the stated price negotiabe?</FormHelperText>
                                </FormControl>
                    </Grid>
                    
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Financing</InputLabel>
                                <Select
                                
                                value={this.state.financing}
                                onChange={this.handleChange}
                                    input={<Input name="financing" />}
                                >
                                    <MenuItem value={"Yes"}>Yes</MenuItem>
                                    <MenuItem value={"No"}>No</MenuItem>
                                </Select>
                                <FormHelperText>Do you offer any kind of financing?</FormHelperText>
                                    </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Interior material</InputLabel>
                                <Select
                                
                                value={this.state.interior}
                                onChange={this.handleChange}
                                    input={<Input name="interior" />}
                                >
                                    <MenuItem value={"leather"}>Leather</MenuItem>
                                    <MenuItem value={"semi-leather"}>Semi-Leather</MenuItem>
                                    <MenuItem value={"fabric"}>Cotton Fabric</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                                    </FormControl>
                        </Grid>
                    
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Unique Owner</InputLabel>
                                <Select
                                
                                value={this.state.onlyOwner}
                                onChange={this.handleChange}
                                    input={<Input name="onlyOwner" />}
                                >
                                    <MenuItem value={"Yes"}>Yes</MenuItem>
                                    <MenuItem value={"No"}>No</MenuItem>
                                </Select>
                                <FormHelperText>have you been the only owner of the vehicle</FormHelperText>
                                    </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Windows</InputLabel>
                                <Select
                                
                                value={this.state.windows}
                                onChange={this.handleChange}
                                    input={<Input name="windows" />}
                                >
                                    <MenuItem value={"electric"}>Electric</MenuItem>
                                    <MenuItem value={"manual"}>Manual</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                                    </FormControl>
                        </Grid>
                    
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Pilot seat position</InputLabel>
                                <Select
                                
                                value={this.state.steer}
                                onChange={this.handleChange}
                                    input={<Input name="steer" />}
                                >
                                    <MenuItem value={"left"}>Left</MenuItem>
                                    <MenuItem value={"right"}>Right</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                                    </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                                <InputLabel >Air conditioning </InputLabel>
                                <Select
                                
                                value={this.state.ac}
                                onChange={this.handleChange}
                                    input={<Input name="ac" />}
                                >
                                    <MenuItem value={"works"}>Working Perfectly</MenuItem>
                                    <MenuItem value={"regular"}>Works regularly</MenuItem>
                                    <MenuItem value={"notWork"}>Does not work</MenuItem>
                                    <MenuItem value={"not"}>Is not included</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                                    </FormControl>
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
                    <Grid item xs={12} sm={10}>
                    <Grid container direction="row" justify="center">
                    <Button variant="raised" color="secondary">Submit</Button>
                    </Grid>
                    </Grid>
                    </Grid>
					<br/>																				
                </Paper>
            
            
            </Grid>
        
        
        </Grid>
        

        )
    }
}

export default SubmitVehicle