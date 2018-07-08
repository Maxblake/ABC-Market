import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';


class SubmitProduct extends Component{
    state={
        state:"",
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
            Submit/Product
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
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <TextField
                            fullWidth
                            id="title"
                            margin="normal"
                            label="Title"
                            placeholder="Use key words to help users find your product easily..."
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                    <Grid item xs={5}>
                            <TextField
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            type="number"
                            margin="normal"
                            ></TextField>
                        </Grid>
                        <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="price"
                            label="Price"
                            type="number"
                            margin="normal"
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">State</FormLabel>
                                    <RadioGroup
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleChange}
                                    >
                                    <FormControlLabel value="new" control={<Radio />} label="New" />
                                    <FormControlLabel value="used" control={<Radio/>} label="Used" />
                                    
                                    </RadioGroup>
                                </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <TextField
                            fullWidth
                            id="ytLink"
                            label="Youtube Link"
                            defaultValue="http://"
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
					<br/>
                    <Grid container direction="row" justify="center">
                        <Button
						variant="raised"
						color="secondary"
						> Submit </Button>
                    </Grid>
					<br/>																				
                </Paper>
            
            
            </Grid>
        
        
        </Grid>
        )}

}

export default SubmitProduct