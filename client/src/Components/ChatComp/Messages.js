import React from "react";
import Sender from "./Sender";
import io from 'socket.io-client';
var ScrollArea = require('react-scrollbar');

class Messages extends React.Component {

  componentDidMount() {
    const { socket, newMessage, id } = this.props;
    socket.emit('login', { id })
    socket.on('new message', data => {
      newMessage(data.message, data.user_id);
    })
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
