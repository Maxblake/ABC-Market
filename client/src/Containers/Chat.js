import React from 'react';
import ChatTitle from '../Components/ChatComp/ChatTitle'
import Messages from '../Components/ChatComp/Messages'
import MsgBox from '../Components/ChatComp/MsgBox'
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import { getSession, chatHistory } from '../Provider/Request';
require('./chat.css');

class Chat extends React.Component {
  
    state = {
        history: [],
        person_id: ''
    };
    
    componentWillMount() {
        getSession(response => {
            if (response != null) {
                this.setState({ person_id:response.person_id })
            }
        })
        this.socket = io.connect({ query: `trade=${this.props.match.params.id}` });
        this.initSocket();  
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    componentDidMount() {
        chatHistory(this.props.match.params.id, hist => {
            this.setState({ history:this.state.history.concat( hist )})
        })
    }
    
    newMessage = (msg, id) => {
        this.setState({ history:this.state.history.concat({ msg, id }) }); 
    }

    initSocket = () => {
        this.socket.on('connect', () => {
            this.socket.emit('joinroom', this.props.match.params.id)
        })
    }

    render () {
        const { state, props } = this;
        const { name } = props.location.state
        return (
            <div className="chat">
                <ChatTitle name={name}/>
                <Messages history={ state.history } newMessage={ this.newMessage } id={ state.person_id } socket={ this.socket }/>
                <MsgBox socket={ this.socket } />
            </div>
        )
    }
}

export default withRouter(Chat);
