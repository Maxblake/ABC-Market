import React from "react";

class ChatTitle extends React.Component {
  render() {
    return (
      <div className="chat-title">
        <h1>{this.props.name}</h1>
        <h2>Last seen: 4 minutes ago</h2>
      </div>
    )
	}
}

export default ChatTitle;
