import React,{Component} from 'react'
import GridListComp from './GridListComp'
import { Paper, Grid, Typography, Button, TextField } from '@material-ui/core';
import Link from 'react-router-dom/Link';

export default class Showcase extends Component{

    state={
        places:["Aruba","Bonaire","Curacao","All"],
        currentCategories:[],
        index: 0,
        start: true,
        last: false,
    }

    componentDidMount() {
        const { index, currentCategories } = this.state
        let categories = []
        this.setState({ index:3 })
        for (var i= 0; i<3; i++) {
            categories.push(this.props.showcase.categories[i])
        }
        this.setState({ currentCategories:currentCategories.concat(categories)})    
    }


    
    showCategories = (operation) => {
        const { index } = this.state
        const { categories } = this.props.showcase
        let currentCategories = []
        if (operation == '+') {
            this.setState({ start:false })
            for (var i= +index; i<+index+3; i++) {
               (categories[i] != undefined) ? currentCategories.push(categories[i]) : null
            }
            this.setState({ currentCategories })
        } else {
            this.setState({ last:false })
            for (var i= +index; i<+index+3; i++) {
                (categories[i] != undefined) ? currentCategories.push(categories[i]) : null
            }
        }
            this.setState({ currentCategories })
    }   

    checkButton = (button) => {
        if (button == '-') {
            setTimeout(() => this.props.showcase.categories[0] == this.state.currentCategories[0] ? this.setState({ start: true, index:3 }) : this.setState({index:this.state.index-3}), 10)
        } else {
            setTimeout(() => this.props.showcase.categories[this.props.showcase.categories.length - 1] == this.state.currentCategories[this.state.currentCategories.length - 1] ? 
            this.setState({ last: true, index:this.state.index-3 }) : this.setState({index:this.state.index+3}), 10)
        }
    }



    render(){
        return(
            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                    <Paper>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={12}>
                                <Grid container direction="row" justify="center">
                                <Typography  variant="display2">
                                    {/* {this.props.showcase.title} */}
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid> 
                        <br/>
                        <br/>
                        <Grid container direction="row" justify="center" spacing={24}>
                            {this.state.places.map((place)=>(
                                <Grid item xs={3}key={place}>
                                    <Grid container direction="row" justify="center">
                                        <Button variant="outlined">{place}</Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container direction="row"
                        justify="center"
                        spacing={40}>  
                            <Grid item xs={5}>
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        
                                        component={Link}
                                        to={`${this.props.location.pathname}/all`}
                                        fullWidth
                                        variant="outlined">
                                        Watch
                                    </Button>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        fullWidth
                                        component={Link}
                                        to={`/submit/${this.props.match.params.type.replace(/s$/,"")}`}
                                        variant="outlined">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Button size="small"  disabled={this.state.last} justify="left" onClick={() => {this.showCategories('+'); this.checkButton('+')}}>
                            >
                            </Button>
                        <Grid 
                            container 
                            direction="row"
                            justify="center"
                            spacing={24}>  
                            
                            {this.state.currentCategories.map((category,index)=>(
                                <Grid item key={ index } xs={4}>
                                   <Grid 
                                        container
                                        direction="row"
                                        justify="center">
                                        <Button 
                                            component={Link}
                                            to={`${this.props.location.pathname}/${category}`}
                                            variant="outlined">
                                            {category}
                                        </Button>
                                   </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Button  
                            size="small"    
                            disabled={this.state.start} 
                            onClick={() => {this.showCategories('-'); this.checkButton('-')}}>
                            {'<'}
                        </Button>
                        <br/>
                        <br/>
                        <Grid 
                            container 
                            direction="row"
                            justify="center">
                            <Typography 
                                variant="display1" >
                                Latest
                            </Typography>
                        </Grid>
                        <Grid 
                            container 
                            direction="row"
                            justify="center">
                            <Grid item xs={12} sm ={10}>
                                <Paper>
                                    <GridListComp />
                                </Paper>        
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}