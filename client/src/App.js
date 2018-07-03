import React, { Component, Fragment } from 'react';
import './App.css';
import Header  from './Components/Header'
import HomePage from'./Components/HomePage'
import Register from './Components/Register';
import ProductPage from './Components/ProductPage';
import Footer from './Components/Footer'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import Welcome from './Components/Welcome';
import Login from './Components/Login'
import ProfilePage from './Components/ProfilePage';
import Inbox from './Components/Inbox'
import About from './Components/About';
import Showcase from './Components/Showcase';
import Category from './Components/Category';

class App extends Component {
  state={
    type:true,
    isLogged:true,
    user:{
      image:"carlos' image",
      name:"Carlos",
      lastName:"Di Matteo",
      username:"carlosdimatteo",
      code:"+297",
      phoneNumber:"04247751252",
      gender:"male",
      userType:"tourist",
      dateOfBirth:"29/08/1997",
      email:"carlosdima_97@hotmail.com"

  },
  showcase:{
        products:{
            title:"Products",
            categories:["Appliances","Vehicles","Clothes","Phones and SmartPhones","Other","All"],
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
            categories:["Cleaning","Yoga Classes","Accountant","Architect","Plumber","Programmer"],
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
            categories:["Pizza","Sushi","Ice cream","Spa","Restaurant"],
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
          phone:"+297-000000",
          reason:{
                  name:"Tacos de futbol negros",
                  condition:"Used",
                  price:"AWG 20"
          }
      },{
          image:"Manuel's Image",
          name:"Manuel Gonzalez",
          phone:"+297-000000",
          reason:{
                  name:"gomas de basket verdes",
                  condition:"Used",
                  price:"AWG 20"
          }
      },
      {   
          image:"Marta's Image",
          name:"Marta Sanchez",
          phone:"+297-0010101",
          reason:{
              name:"Masajista"
          }
      }
  ]
}
updateUser=(user)=>{
  this.setState({user:user});

}

  toggleLog=()=>{
    this.setState({isLogged:!this.state.isLogged})
  }
  toggleUserType=()=>{
    console.log(this.state.type)
    this.setState({type:!this.state.type})
  }
  homePage=()=>{
    return (<HomePage {...this.props} type={this.state.type}/>)
  }
  profilePage=()=>{
    return(<ProfilePage updateUser={this.updateUser} user={this.state.user} contacts={this.state.contacts}/>)
  }

  inbox=()=>{
    return(<Inbox user={this.state.user} contacts={this.state.contacts}/>)
  }

  header=()=>{
    return(<Header 
      {...this.props}
      toggleUserType={this.toggleUserType}
      toggleLog={this.toggleLog}
      isLogged={this.state.isLogged}
      user={this.state.user ? this.state.user:null}
      />)
  }

  showcase=(props)=>{
    return (<Showcase {...props} showcase={this.state.showcase[props.match.params.type]}  />)
  }

  productPage=(props)=>{
    console.log(props)
      
       return (<ProductPage {...props}/>)
  }

  category=()=>{

    return( <Category products={this.state.showcase.products.latest} latest={this.state.showcase.products.latest} />)

  }
  
  render() {
    return (
      <Fragment>
      <BrowserRouter>
      </BrowserRouter>
      <BrowserRouter>
        <div>
      <Route component={this.header}/>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route  exact path="/details/:item" component={(props)=>this.productPage(props)}/>
        <Route exact path="/home" component={this.homePage} type={this.state.type}/>
        <Route exact path="/profile" component={this.profilePage}/>
        <Route exact path="/inbox" component={this.inbox} />
        <Route exact path="/about" component={About}/>
        <Route exact path="/showcase/:type" component={(props)=>this.showcase(props)}/>
        <Route exact path="/showcase/products/vehicles" component={this.category}/>
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
