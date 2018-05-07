import React from "react";
import Sender from "./Sender";
import io from 'socket.io-client';
import axios from 'axios'

class Messages extends React.Component {

  componentDidMount() {
    var url = '/value';
    axios.get(url).then((result) => {
      if (result.data.status != 400) {
        socket.emit('add user', result.data.status);
      } else {
        socket.emit('add user', 'motherfucker');
      }
    })
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
