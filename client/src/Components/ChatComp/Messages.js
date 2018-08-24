import React from "react";
import Sender from "./Sender";
import io from 'socket.io-client';

class Messages extends React.Component {

    componentDidMount() {
        const { socket, newMessage } = this.props;
        socket.on('new message', data => {
            newMessage(data.message, data.user_id);
        })
    }

    componentDidUpdate(prevProps) {
        const { socket, id } = this.props
        if (id !== prevProps.id) {
            socket.emit('login', { id })
        }  
    }

    render() {
        const { id, history, socket } = this.props
        return (
            <div 
                className="messages">
                <div className="messages-content"></div>
                <Sender sender={ id }  history={ history } socket={ socket }/>
            </div>
        )
    }
}

export default Messages;
