import React,{Component,Fragment} from 'react';
import ContactButton from './ContactButton'
import ProductDisplay from './ProductDisplay'
import { Grid,GridList,GridListTile,ListSubheader, Typography } from '@material-ui/core';



export default class GridListComp extends Component{




    render(){

        return (
                    <Fragment>
                {this.props.type==="product" ? 
                <GridList cellHeight={100}
                style={{maxWidth:800,height:200}}
                cols={1}>
                
                {this.props.products.map((product,index)=>(
                    <GridListTile  cols={1}>
                    
                    <ProductDisplay
                        {...this.props}
                        key={index}
                            product={product}
                            edit={this.props.edit}
                            />
                    </GridListTile>
                    ))}
                </GridList>:null
            }
            {this.props.type==="contact" ? 
            <GridList cellHeight={150}
            style={{maxWidth:800,height:200}}
            cols={1}>
            
                
            {this.props.contacts.map((contact,index)=>(
                <GridListTile key={index} cols={1}>
                <ContactButton
                    {...this.props}
                        contact={contact}
                        sendMsg={this.props.sendMsg}
                        />
                </GridListTile>
                ))}
            </GridList>:null
        }
        </Fragment>

        )
    }
}