import React from "react";


class MsgBox extends React.Component {
  message = React.createRef();

  sendMsg = (event) => {
    event.preventDefault();
    this.props.socket.emit('new message', this.message.current.value);
  };

  render() {
    return (
      <form className="message-box" onSubmit={this.sendMsg}>
        <textarea
          type="text"
          ref={this.message}
          className="message-input"
          placeholder="Type message...">
        </textarea>
        <button type="submit" className="message-submit">Send</button>
      </form>
    )
	}
}

export default MsgBox;
