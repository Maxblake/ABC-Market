import React from "react";


class Sender extends React.Component {
  render() {
    return (
      this.props.history.map((msgs, i) => {
          return (
              <div key={i} className={this.props.socket.id === msgs.id ? 'message message-personal new' : 'message message new' }>
                <h2 key={i}> {msgs.msg} </h2>
              </div>
          )
      })
    )
	}
}

export default Sender;
