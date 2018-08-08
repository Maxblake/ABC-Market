import React,{Component,Fragment} from 'react';
import ContactButton from './ContactButton'
import ProductDisplay from './ProductDisplay'
import { GridList,GridListTile } from '@material-ui/core';
import { withRouter } from 'react-router';



class GridListComp extends Component{


    chat = contact => {
        const { name, id }= contact
        this.props.history.push({
            pathname:`/inbox/${contact.id}`,
            state: { name }
        })
    }

    render(){

        return (
                    <Fragment>
                {this.props.type==="product" ? 
                <GridList cellHeight={100}
                style={{maxWidth:800,height:200}}
                cols={1}>
                
                {this.props.products.map((product,index)=>(
                    <GridListTile  key={ index} cols={1}>
                    
                    <ProductDisplay
                        {...this.props}
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
                        chat={()=>this.chat(contact)}
                        />
                </GridListTile>
                ))}
            </GridList>:null
        }
        </Fragment>

        )
    }
}

export default withRouter(GridListComp)
