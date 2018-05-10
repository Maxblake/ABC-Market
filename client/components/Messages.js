import React from "react";
import Sender from "./Sender";
import io from 'socket.io-client';

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
      <div className="messages">
        <div className="messages-content"></div>
          <Sender history={this.props.history} socket={ this.props.socket }/>
      </div>
    )
	}
}

export default Messages;
