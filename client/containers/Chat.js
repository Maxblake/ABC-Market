import React from 'react';
import ChatTitle from '../components/ChatTitle'
import Messages from '../components/Messages'
import MsgBox from '../components/MsgBox'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
require('../assets/style/chat.css');

class Chat extends React.Component {
  componentDidMount() {
    this.initSocket();
  }

  newMessage = (msg, id) => {
    this.setState({ history:this.state.history.concat({ msg:msg, id:id })});
  }

  state = {
      history: [],
  };

  initSocket = () => {
    socket.on('connect', () => {
      socket.emit('joinroom', 1)
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
