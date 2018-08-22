import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import UserInfo from '../User/UserInfo';
import MultipleDatePicker from 'react-multiple-datepicker'
import { Link } from 'react-router-dom';
import { newOffer } from './helpers/Request';
import { fixDate } from './helpers';

class SubmitSale extends Component{
    date = React.createRef()
    file = React.createRef()

    state={
        category:"",
        title:"",
        address:"",
        price:"",
        location:"",
        description:""
    }

    handleChange=(event)=>{
        console.log(event.target.name+"//"+event.target.value)
        this.setState({[event.target.name]:event.target.value});
    }

    create = () => {
        const date = this.date.current.state.selectedDates
        const { category, title, address, price, location, description } = this.state
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
        body.append('address', address)
        body.append('start', start)
        body.append('finish', finish)
        body.append('location', location) 
        body.append('price', price) 
        newOffer(body, response => {
            alert('New sale added!')
        })
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
                        <Grid 
                            container 
                            direction="row"
                            justify="center">
                            {/* <Grid item xs={8}>
                            <UserInfo user={this.state.user} key={this.state.user.id} /> 
                            </Grid> */}
                        </Grid>
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
                                onChange={this.handleChange}
                                placeholder="Use key words to help users find this post easily..."
                                ></TextField>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            direction="row" 
                            justify="center" 
                        >
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
                            <TextField 
                                    fullWidth
                                    name="address"
                                    margin="normal"
                                    label="Add Geolocation"
                                    onChange={this.handleChange}
                                />
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
                                        label="Price"
                                        onChange={this.handleChange}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel >Location</InputLabel>
                                            <Select
                                                value={this.state.location}
                                                onChange={this.handleChange}
                                                    input={<Input name="location" />}>
                                                    <MenuItem value={"Aruba"}>Aruba</MenuItem>
                                                    <MenuItem value={"Bonaire"}>Bonaire</MenuItem>
                                                    <MenuItem value={"Curacao"}>Curacao</MenuItem>
                                            </Select>
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

export default SubmitSale