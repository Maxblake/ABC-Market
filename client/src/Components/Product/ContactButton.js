import React,{Component} from 'react';
import { Grid, Typography, Paper, Button, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router'


const ContactButton = (props) => {
    const { code, title, type, trade_id, details } = props.contact
    const { profile_img, name, phonenumber } = details[0]
    return (
        <Grid item xs={12} sm={12}>
            <Paper>
                <Grid container direction="row">
                    <Grid item xs={3}>
                        <Avatar src={(profile_img == null) ?
                                'https://res.cloudinary.com/zingaring/image/upload/v1534155194/qjddlajvth5fw82alozg.png'
                                : profile_img
                            }>                           
                        </Avatar>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="headline">
                            {name}
                        </Typography><br/>
                        <Typography variant="headline">
                            {code}-{phonenumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subheading">
                            {title}
                        </Typography>
                        <Typography variant="subheading">
                            {type}
                        </Typography>
                        {props.sendMsg ? 
                            <Button variant="outlined"
                            color="secondary"
                            onClick={() => props.chat()}
                            > Send Message</Button> : ""
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default withRouter(ContactButton)