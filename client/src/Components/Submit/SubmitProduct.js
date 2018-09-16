import React,{Component} from 'react'
import { Grid, Paper, Typography,TextField,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Select,MenuItem,InputLabel,Input,FormHelperText,Button} from '@material-ui/core';
import Auth, { Session } from '../../Provider/Auth';
import loading from '../../images/loading.svg'
import { newArticle } from './helpers/Request';
const auth = new Auth()

class SubmitProduct extends Component{
    file = React.createRef();
   
    state={
        values: {
            description:'',
            category:'',
            title:'',
            stock:'',
            price:'',
            used:'',
            link:'',
            post_time:'',
            location:'',
        },
        error: {
            description:null,
            category:null,
            title:null,
            stock:null,
            price:null,
            used:null,
            link:null,
            post_time:null,
            location:null,
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

    closeNotification = () => {
        this.setState({ notification: {
            success: false
        }})
    }

    create = () => {
        if (this.checkInput()) {
            this.setState({uploading: true})
            const { description, title, stock, price, used, link, post_time, location, category } = this.state.values
            const body = new FormData();
            const { files } = this.file.current;
            for (var i = 0; i < files.length; i++) {
                var filing = files[i];
                body.append('files[]', filing, filing.name);
            }
            body.append('description', description)
            body.append('title', title)
            body.append('stock', stock)
            body.append('price', price)
            body.append('used', used)
            body.append('link', link)
            body.append('post_time', post_time)
            body.append('location', location)      
            body.append('category', category)      
            newArticle(body, response => {
                this.setState({ uploading: false, notification: {success:true, message:response} })
                if (response == "Article uploaded") setTimeout(() => window.location.href = '../../showcase/products', 5000)
            })
        }
    }

    render(){
        const { values, error} = this.state
        return(
        <Grid container justify='center'>
            <Grid item xs={12} sm={8}>
            <br/>
            <Typography variant="headline">
                Submit/Product
            </Typography><br/>
            {this.state.uploading == false ? 
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
                    <Grid container direction="row" justify="center" spacing={8}>
                    <Grid item xs={5}>
                            <TextField
                                fullWidth
                                name="title"
                                margin="normal"
                                label="Title"
                                error={error.title}
                                helperText={(error.title ? 'Title cannot be blank' : '')} 
                                placeholder="Use key words to help users find your product easily..."
                                onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Price"
                                type="number"
                                error={error.price}
                                helperText={(error.price ? 'Price cannot be blank' : '')} 
                                margin="normal"
                                onChange={this.handleChange}/>
                        </Grid>
                    </Grid>



                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={5}>
                            <TextField
                            fullWidth
                            name="stock"
                            label="Quantity"
                            type="number"
                            error={error.stock}
                            helperText={(error.stock ? 'Quantity cannot be blank' : '')} 
                            margin="normal"
                            onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={values.category}
                                    onChange={this.handleChange}
                                    input={<Input name="category" />}>
                                    {this.props.showcase.categories.map((category,index)=>(
                                        <MenuItem key={index} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            <FormHelperText error={error.category}>{(error.category ? 'Fill category' : '')}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">State</FormLabel>
                                <RadioGroup
                                    name="used"
                                    value={values.used}
                                    onChange={this.handleChange}>
                                <FormControlLabel value="false" control={<Radio />} label="New" />
                                <FormControlLabel value="true" control={<Radio/>} label="Used" />                
                                </RadioGroup>
                                {error.used ? 
                                <FormHelperText error={error.used} >Fill condition</FormHelperText>
                                :null}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={10}>
                            <TextField
                            fullWidth
                            name="link"
                            label="Youtube Link"
                            defaultValue="http://"
                            margin="normal"
                            onChange={this.handleChange}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={8}>
                        <Grid item xs={10}>
                            <Grid container direction="row" justify="center" spacing={8} alignItems="center">
                                <Grid item xs={12} sm={6} >
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Post time</InputLabel>
                                        <Select
                                            value={values.post_time}
                                            onChange={this.handleChange}
                                            input={<Input name="post_time" />}>
                                            <MenuItem value={30}>30 days</MenuItem>
                                            <MenuItem value={60}>60 days</MenuItem>
                                            <MenuItem value={90}>90 days</MenuItem>
                                        </Select>
                                    <FormHelperText error={error.post_time}>{(error.post_time ? 'Fill post time' : 'Period that the post will be visible to users')}</FormHelperText>
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
                                        <FormHelperText error={error.location}>{(error.location ? 'Fill location' : 'Product origin')}</FormHelperText>
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
                                placeholder="detail the product the best way possible for better user understanding and to ease the sale "
                                onChange={this.handleChange}/>
                        </Grid>
                    </Grid>
					<br/>
                    <Grid container direction="row" justify="center">
                        <Button
                            variant="raised"
                            color="secondary"
                            onClick={this.create}> Submit </Button>
                    </Grid>
					<br/>																				
                </Paper>
                : 
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                <img src={loading} />
                </Grid> }  
            <Notification success={this.state.notification.success} message={this.state.notification.message} closeNotification={this.closeNotification} />          
            </Grid>         
        </Grid>
    )}  
}

export default SubmitProduct
