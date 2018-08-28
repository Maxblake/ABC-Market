import React,{Component,Fragment} from 'react';
import ContactButton from './ContactButton'
import ProductDisplay from './ProductDisplay'
import { GridList,GridListTile } from '@material-ui/core';
import { withRouter } from 'react-router';
import { latestArticle, latestService, latestPlace, latestOffer } from './Request';

class GridListComp extends Component{

    state = {
        products: []
    }

    componentDidMount() {
        if (this.props.product != undefined) {
            this.setState({ products: this.state.products.concat(this.props.product)})
        } else {
            const { type } = this.props.match.params
            switch(type) {
                case 'products':
                    latestArticle(products => {
                        this.setState({ products })
                    })
                break
                case 'services':
                    latestService(products => {
                        this.setState({ products })
                    })
                break
                case 'places':
                    latestPlace(products => {
                        this.setState({ products })
                    })
                break
                case 'sales':
                    latestOffer(products => {
                        this.setState({ products })
                    })
                break
            }
        }
    }

    chat = contact => {
        const { name, trade_id }= contact
        this.props.history.push({
            pathname:`/inbox/${trade_id}`,
            state: { name }
        })
    }

    render(){
        return (
            <Fragment>
                {this.state.products != [] ? 
                    <GridList
                        cellHeight={100}
                        style={{maxWidth:800,height:200}}
                        cols={1}>
                
                        {this.state.products.map((product,index)=>(
                            <GridListTile  key={ index } cols={1}>
                                <ProductDisplay
                                    product={product}
                                    edit={this.props.edit}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                    : null
                }
                {this.props.type ==="contact" ? 
                    <GridList 
                        cellHeight={150}
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
                </GridList>
                    : null
                }
        </Fragment>

        )
    }
}

export default withRouter(GridListComp)