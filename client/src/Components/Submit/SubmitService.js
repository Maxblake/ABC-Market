import React,{Component} from 'react'
import { Grid,Button, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';

class SubmitService extends Component{


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
                            >User Info</Typography>
                        </Grid>
                    </Grid>
                    
                  																			
                </Paper>
            
            
            </Grid>
        
        
        </Grid>

        )
    }
}

export default SubmitService