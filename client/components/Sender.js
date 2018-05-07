import React from "react";


class Sender extends React.Component {
  render() {
    var id = this.props.socket.id;
    return (
      this.props.history.map((msgs, i) => {
          console.log(msgs)
          console.log(msgs.id)
          console.log(this.props.socket.id)
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
