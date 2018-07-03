import React,{Component} from 'react';
import {Button,Grid,Icon,TextField,Paper,FormControl,FormHelperText,FormLabel,RadioGroup,FormControlLabel,Select,MenuItem,InputLabel,Radio,Input, withStyles} from '@material-ui/core'

export default class UserInfo extends Component{

    state={
        user:this.props.user
    }
    onUserChange=(event)=>{
        console.log(this.state.user[event.target.name])
        console.log(event.target.name+"///"+event.target.value);
        let newUser={...this.state.user}
        newUser[event.target.name]=event.target.value
        console.log(this.state.user[event.target.name]+" updates to : "+newUser[event.target.name])
                this.setState({user:newUser})
    }

    render(){
        return(
            
            <Grid item xs={12}sm={8}>
            <Paper>
            <Grid container direction="row"
            justify="center">
            <Grid item xs={12} sm={5}>
                            <p>{this.state.user.image}</p>
                        </Grid> 
                        <Grid item xs={12} sm={7} >
                            <Grid container 
                            direction="row"
                            justify="flex-end">
                                <Button mini variant="fab" color="secondary" onClick={this.props.toggleEdit}>
                                        <Icon>edit_icon</Icon>
                                </Button>
                            </Grid>
                            <Grid container direction="row"
                            justify="center">
                            {Object.keys(this.state.user).map((key)=>(
                                
                                <Grid item xs={12}>
                                {key==="code" ? 
                                     <FormControl >
                                     <InputLabel >Code</InputLabel>
                                     <Select
                                        value={this.state.user.code}
                                        onChange={this.onUserChange}
                                        input={<Input name="code" />}
                                     >
                                       <MenuItem value={"+297"}>+297</MenuItem>
                                       <MenuItem value={"+298"}>+298</MenuItem>
                                       <MenuItem value={"+299"}>+299</MenuItem>
                                     </Select>
                                     <FormHelperText>Phone Code</FormHelperText>
                                   </FormControl>  :null 
                                }
                                {key==="phoneNumber" ?
                                <TextField
                                onChange={this.onUserChange}
                                fullWidth
                                type="number"
                                margin="normal"
                                key={key}
                                name={key}
                                label={key[0].toUpperCase()+key.substr(1)}
                                defaultValue={this.state.user[key]}
                                >
                                </TextField>:null}
                                {key==="dateOfBirth" ?
                                        <TextField
                                        fullWidth
                                          id="dateOfBirth"
                                          label="Date of Birth"
                                          type="date"
                                          defaultValue={this.state.user.dateOfBirth}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          name="dateOfBirth"
                                          value={this.state.user.dateOfBirth}
                                        onChange={this.onUserChange}
                                        />
                                        :null}
                                {key==="email" ?
                                <TextField
                                onChange={this.onUserChange}
                                fullWidth
                                margin="normal"
                                key={key}
                                name={key}
                                type="email"
                                label={key[0].toUpperCase()+key.substr(1)}
                                defaultValue={this.state.user[key]}
                                >
                                </TextField>:null}
                            
                                {key==="userType" ?
                                        <FormControl component="fieldset" required >
                                        <FormLabel component="legend">Type</FormLabel>
                                        <RadioGroup
                                          name="userType"
                                          value={this.state.user.userType}
                                          onChange={this.onUserChange}
                                        >
                                          <FormControlLabel value="tourist" control={<Radio />} label="tourist" />
                                          <FormControlLabel value="local" control={<Radio color="primary"/>} label="local" />
                                          
                                        </RadioGroup>
                                      </FormControl>:null
                            }
                                {key==="gender" ? 
                                        <FormControl component="fieldset" required >
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup
                                          name="gender"
                                          value={this.state.user.gender}
                                          onChange={this.onUserChange}
                                        >
                                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                                          <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                                          
                                        </RadioGroup>
                                      </FormControl>:null
                            }
                                {key==="name"||key==="username"||key==="lastName" ? 
                                <TextField
                                onChange={this.onUserChange}
                                fullWidth
                                margin="normal"
                                key={key}
                                name={key}
                                label={key[0].toUpperCase()+key.substr(1)}
                                defaultValue={this.state.user[key]}
                                >
                                </TextField>:null}
                                <br/>
                                </Grid>
                                
                            ))}
                            
                            <Button variant="raised" color="secondary" onClick={()=>{this.props.updateUser(this.state.user);this.props.toggleEdit()}}>
                            Update
                            </Button>
                            </Grid>
                        </Grid> 
            
            </Grid>   
           
            </Paper> 
            </Grid>
        )


    }



}