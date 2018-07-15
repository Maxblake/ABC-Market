import React from 'react';
import ChatTitle from '../Components/ChatComp/ChatTitle'
import Messages from '../Components/ChatComp/Messages'
import MsgBox from '../Components/ChatComp/MsgBox'
import { withRouter } from 'react-router';
import io from 'socket.io-client';
require('./chat.css');

class Chat extends React.Component {
  

  state = {
      history: [],
      user_id:0
  };
  
  componentWillMount() {
    this.socket = io.connect(`${this.props.ip}:3000`,{ query: `trade=${this.props.match.params.id}` });
    this.initSocket();  
  }

  componentDidMount() {
    console.log(this.props.user)
    this.setState({ 
      user_id: this.props.user
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
    const { name, reciever } = props.location.state
    return (
      <div className="chat">
        <ChatTitle name={name}/>
        <Messages history={ state.history } newMessage={ this.newMessage } id={ state.user_id } reciever = { reciever } socket={ this.socket }/>
        <MsgBox socket={ this.socket } />
      </div>
    )
  }
}

export default withRouter(Chat);
