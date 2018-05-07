import React from 'react';
import ChatTitle from '../components/ChatTitle'
import Messages from '../components/Messages'
import MsgBox from '../components/MsgBox'
import io from 'socket.io-client';
import axios from 'axios'
const socket = io.connect('http://localhost:3000');
const queryString = require('query-string');
require('../assets/style/chat.css');

class Chat extends React.Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    this.initSocket();
    socket.io.opts.query = `room=${query.room}`
  }

  newMessage = (msg, id) => {
    this.setState({ history:this.state.history.concat({ msg:msg, id:id }) });
  }

  state = {
      history: [],
  };

  initSocket = () => {
    const query = queryString.parse(this.props.location.search);
    socket.on('connect', () => {
      socket.emit('joinroom', query.room)
      })
  }

  render () {
    const { sendMessage, state } = this;
    return (
      <div className="chat">
        <ChatTitle />
        <Messages history={ state.history } newMessage={ this.newMessage } socket={ socket }/>
        <MsgBox newMessage={ this.newMessage } socket={ socket } />
      </div>
    )
  }
}

export default Chat;
