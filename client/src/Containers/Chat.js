import React from 'react';
import ChatTitle from '../Components/ChatComp/ChatTitle'
import Messages from '../Components/ChatComp/Messages'
import MsgBox from '../Components/ChatComp/MsgBox'
import { withRouter } from 'react-router';
import io from 'socket.io-client';

class Chat extends React.Component {
  
  
  componentWillMount() {
    this.socket = io.connect(`${this.props.ip}:3000`,{ query: `trade=${this.props.match.params.id}` });
    this.initSocket();  
  }

  
  newMessage = (msg, id) => {
    this.setState({ history:this.state.history.concat({ msg:msg, id:id }) });
  }

  state = {
      history: [],
  };

  initSocket = () => {
    this.socket.on('connect', () => {
      this.socket.emit('joinroom', this.props.match.params.id)
    })
  }

  render () {
    const { sendMessage, state } = this;
    return (
      <div className="chat">
        <ChatTitle name={this.props.location.state.name}/>
        <Messages history={ state.history } newMessage={ this.newMessage } socket={ this.socket }/>
        <MsgBox newMessage={ this.newMessage } socket={ this.socket } />
      </div>
    )
  }
}

export default withRouter(Chat);
