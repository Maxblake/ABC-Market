import React, { Component, Fragment } from 'react'
import './App.css'
import Header  from './Components/Extra/Header'
import HomePage from './Containers/HomePage'
import Register from './Components/Auth/Register'
import ProductPage from './Components/Product/ProductPage'
import Footer from './Components/Extra/Footer'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Welcome from './Components/Extra/Welcome'
import Login from './Components/Auth/Login'
import ProfilePage from './Components/User/ProfilePage'
import Inbox from './Components/Product/Inbox'
import About from './Components/Extra/About'
import Showcase from './Components/Product/Showcase'
import Category from './Components/Product/Category'
import Watch from './Components/Product/Watch';
import Submit from './Components/Submit/Submit';
import SubmitProduct from "./Components/Submit/SubmitProduct"
import SubmitVehicle from "./Components/Submit/SubmitVehicle"
import { fetching } from '../fetching/wrapper'
import Chat from './Containers/Chat'
import Remesa from './Components/Remesa'
import Auth,{ Session } from './Provider/Auth'

const auth = new Auth()

class App extends Component {
  state={
    ip: "",
  showcase:{
        products:{
            categories:["Appliances","Vehicles","Clothes","Phones and SmartPhones","All","Other"],
        },
        services:{
            categories:["Cleaning","Yoga Classes","Accountant","Architect","Plumber","Other"],
        },
        places:{
            categories:["Pizza","Sushi","Ice cream","Spa","Restaurant"],
        },
        sales:{
            categories:["Supermarket","Ice cream","General Store","Other"],
        } 
    }
}

    header = () => {
        return(
            <Session.Consumer> 
                {({user, refreshSession}) => (
                    <Header 
                        session={refreshSession}
                        user={user}
                    />
                )}
            </Session.Consumer>
        )
    }

    homePage=(props)=>{
        return(
            <Session.Consumer>
                {session => (
                    <HomePage 
                        {...props}
                        user={session} /> 
                )}              
            </Session.Consumer>
        )
    }

    profilePage=()=>{
        return(
            <Session.Consumer>
                {session => (
                    <ProfilePage 
                        user={session.user} 
                        contacts={this.state.contacts}
                    />
                )}
            </Session.Consumer>
        )
    }

    inbox=()=>{
        return(
            <Session.Consumer>
                {session => (
                    <Inbox
                        user={session.user}
                        contacts={this.state.contacts}
                    /> 
                )}
            </Session.Consumer>
        )
    }
    
    
    chat = () => {
        return(
            <Chat 
                ip={this.state.ip} 
            />
        ) 
    }


    showcase=(props)=>{
        return (<Showcase {...props} showcase={this.state.showcase[props.match.params.type]}  />)
    }

    productPage=()=>{
        return (<ProductPage />)
    }

    category=(props)=>{
        return( <Category {...props} products={this.state.showcase.products.latest} latest={this.state.showcase.products.latest} />)
    }


    watch=(props)=>{
            return (<Watch {...props}  />)
    }
    submit=(props)=>{
        return (<Submit {...props} showcase={this.state.showcase[""+props.match.params.type+"s"]}  />)
}

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <div>
                     <Route component={this.header} />
                        <Switch>
                            <Route exact path="/submit/:type" component={this.submit}/>
                            <Route exact path="/submit/product/product" component={SubmitProduct}/>
                            <Route exact path="/submit/product/vehicle" component={SubmitVehicle}/>
                            <Route exact path="/" component={Welcome}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route path="/details/:item" component={ProductPage}/>
                            <Route exact path="/home/:userType" component={this.homePage}/>
                            <Route exact path="/profile" component={this.profilePage}/>
                            <Route exact path="/inbox" component={this.inbox} />
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/inbox/:id" component={this.chat} />
                            <Route exact path="/showcase/:type" component={(props)=>this.showcase(props)}/>
                            <Route exact path="/showcase/:type/:category" component={this.category}/>
                            <Route exact path="/showcase/:type/Search" component={this.watch}/>
                            <Route exact path="/remesas" component={Remesa}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            <br/><br/><br/>
            <Footer footer/>
            </Fragment>
        
        );
    }
}

export default App;
