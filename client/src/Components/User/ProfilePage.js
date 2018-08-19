import React,{Component} from 'react';
import { Grid, Typography } from '@material-ui/core';
import GridListComp from '../Product/GridListComp'
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';
import Auth, { Session } from '../../Provider/Auth';
import { userProduct, userContacts } from './Request';

export default class ProfilePage extends Component {
    state={
        editMode:true,
        products:[],
        contacts:[],
        loadedProd: false,
        loadedContacts: false
    }

    componentWillMount() {
       userProduct(response => {
            if(response != null) {
                this.setState({
                    products: this.state.products.concat(response),
                    loadedProd: true 
                })
            }
        })

        userContacts(response => {
            if(response != null) {
                this.setState({
                    contacts: this.state.contacts.concat(response),
                    loadedContacts: true
                })
            }
        })


    }

    toggleEdit=()=>{
        this.setState({editMode:!this.state.editMode})
        console.log(this.state.editMode)
    }

    
    render(){
        return(
            <Grid container justify="center">
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    <h1>My Account</h1>
                </Grid>


                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    {this.state.editMode ?
                        <UserInfo user={this.props.user} key={this.props.user.person_id} toggleEdit={this.toggleEdit}/> :
                        <UserEdit user={this.props.user} updateUser={this.props.updateUser} toggleEdit={this.toggleEdit} />
                    }
                </Grid>
                <Typography variant="display2" >
                    Uploads
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center">
                    <br/>
                    {this.state.loadedProd ?
                        <GridListComp 
                            type="product" 
                            edit={true} 
                            product={this.state.products}
                        />
                        : null
                    }
                </Grid>
                <br/>
                <Typography variant="display2">
                    Latest Contacts
                </Typography>
                <Grid 
                    container 
                    direction="row"
                    justify="center">
                    {this.state.loadedContacts ?
                        <GridListComp 
                            type="contact"
                            sendMsg={true} 
                            contacts={this.state.contacts}
                        />
                        : null
                    }
                </Grid>

                    
            </Grid>
        )
    }

}