import React from "react";
import Sender from "./Sender";
import io from 'socket.io-client';
var ScrollArea = require('react-scrollbar');

class Messages extends React.Component {

  componentDidMount() {
    const { socket, newMessage } = this.props;
    socket.emit('login')
    socket.on('new message', (data) => {
      newMessage(data.message, data.id);
    })
  }

  render() {
    return (
  
      <div 
        className="messages"
        ref="iScroll">
        <div className="messages-content"></div>
          <Sender emitter={ this.props.id } reciever = { this.props.reciever } history={this.props.history} socket={ this.props.socket }/>
      </div>

    )
	}
}

export default Messages;
