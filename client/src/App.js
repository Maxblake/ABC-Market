import React, { Component, Fragment } from 'react'
import './App.css'
import Header  from './Components/Extra/Header'
import HomePage from './Containers/HomePage'
import Register from './Components/Auth/Register'
import ProductPage from './Components/Product/ProductPage'
import Footer from './Components/Extra/Footer'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
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
import {fetching} from '../fetching/wrapper'
import Chat from './Containers/Chat'

import Auth, { Session } from './Provider/Auth'
import { isLogged } from './Provider/Request';

const auth = new Auth()

class App extends Component {
  state={
    type:true,
    isLogged:false,
    ip: "",
  showcase:{
        products:{
            title:"Products",
            categories:["Appliances","Vehicles","Clothes","Phones and SmartPhones","Other","All","Other"],
            latest:[
                {
                    image:"this is an image of the TV",
                    name:"Televisor 4k",
                    brand:"Samsung",
                    condition:"New",
                    price:3000,
                    description:"this is a fucking great TV"
                },
                {
                    image:"T-shirt Image",
                    name:"black T-Shirt",
                    condition:"New",
                    price:20,
                    description:"this is a black t-shirt"
                },
                {
                    image:"TV image",
                    name:"Samsung 4K TV ",
                    condition:"New",
                    price:2000,
                    description:"this is a great TV"
                },
                {
                    image:"Soccer Cleats image",
                    name:"green soccer cleats",
                    condition:"New",
                    price:200,
                    description:"Very nice cleats"
                }
            ]
        },
        services:{
            title:"Services",
            categories:["Cleaning","Yoga Classes","Accountant","Architect","Plumber","Programmer","Other"],
            latest:[
                {
                    image:"Plumber image",
                    name:"Jose",
                    service:"Plumber",
                    price:"20 per hour",
                    phoneNumber:"+297-0020304",
                    description:"Covering all your plumbing needs!"
                },
                {
                    image:"Cleaning image",
                    name:"Maria",
                    service:"Cleaning",
                    price:"20 per hour",
                    phoneNumber:"+297-0030405",
                    description:"I'll leave everything as tidy as possible"
                },
                {
                    image:"Programmer image",
                    name:"Carlos",
                    service:"Programmer",
                    price:"20 per hour",
                    phoneNumber:"+297-0040506",
                    description:"Any language , any app, I gotcha!"
                }
            ]
        },
        places:{
            title:"Places",
            categories:["Pizza","Sushi","Ice cream","Spa","Restaurant","Other"],
            latest:[
                
                    {
                        image:"Pizza Hut image",
                        name:"Pizza Hut",
                        contactNumber:"+297-01020304",
                        description:"Best pizza in Aruba"
                    },
                    {
                        image:"Sushi image",
                        name:"Sushi House",
                        contactNumber:"+298-09080700",
                        description:"From the sea to your plate"
                    },
                    {
                        image:"Spa image",
                        name:"Lesbia Wong Spa",
                        contactNumber:"+297-09040503",
                        description:"come relax "
                    }
                
            ]
        },
        sales:{
            title:"On Sale",
            categories:["Supermarket","Ice cream","General Store","Other"],
            latest:[
                {
                    image:"Sale image",
                    name:"Zara",
                    contactNumber:"+298-08070605",
                    description:"40% off all menswear"
                },
                {
                    image:"Sale image",
                    name:"FootLocker",
                    contactNumber:"+299-03070201",
                    description:"90% off if you buy just one shoe"
                }
            ]
        } 
    },
  contacts:[{
          image:"Ernesto's Image",
          name:"Ernesto Gonzalez",
          id:1,
          phone:"+297-000000",
          reason:{
                  name:"Tacos de futbol negros",
                  condition:"Used",
                  price:"AWG 20"
          }
      },{
          image:"Manuel's Image",
          name:"Manuel Gonzalez",
          id:3,
          phone:"+297-000000",
          reason:{
                  name:"gomas de basket verdes",
                  condition:"Used",
                  price:"AWG 20"
          }
      },
      {   
          image:"Marta's Image",
          id:4,
          name:"Marta Sanchez",
          phone:"+297-0010101",
          reason:{
              name:"Masajista"
          }
      }
  ]
}
 
    toggleUserType=()=>{
        console.log(this.state.type)
        this.setState({ type:!this.state.type })
    }

    homePage=()=>{
        return (<HomePage {...this.props} type={this.state.type}/>)
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
    
    header = () => {
        return(
            <Session.Consumer> 
                {session => (
                    <Header 
                        session={session.refreshSession}
                        user={session.user}
                    />
                )}
            </Session.Consumer>
        )
    }
    
    chat = () => {
        return(
            <Session.Consumer>
                {session => (
                    <Chat 
                        ip={this.state.ip} 
                        user={session.user.person_id} 
                    />
                )}
            </Session.Consumer>
        ) 
    }


    showcase=(props)=>{
        return (<Showcase {...props} showcase={this.state.showcase[props.match.params.type]}  />)
    }

    productPage=(props)=>{
        return (<ProductPage {...props}/>)
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
                    <Route component={this.header}/>
                    <Switch>
                        <Route exact path="/submit/:type" component={this.submit}/>
                        <Route exact path="/submit/product/product" component={SubmitProduct}/>
                        <Route exact path="/submit/product/vehicle" component={SubmitVehicle}/>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/details/:item" component={(props)=>this.productPage(props)}/>
                        <Route exact path="/home" component={this.homePage} type={this.state.type}/>
                        <Route exact path="/profile" component={this.profilePage}/>
                        <Route exact path="/inbox" component={this.inbox} />
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/inbox/:id" component={this.chat} />
                        <Route exact path="/showcase/:type" component={(props)=>this.showcase(props)}/>
                        <Route exact path="/showcase/:type/:category" component={this.category}/>
                        <Route exact path="/showcase/:type/Search" component={this.watch}/>
                    </Switch>
                    </div>
                </BrowserRouter>
                <br/><br/><br/>
                <Footer footer/>
            </Fragment>
        )
    }
}

export default App;
