import React from "react";


class Sender extends React.Component {

  render() {
    return (
          <div className="message message-personal">
            <h2>
              {this.props.history}
            </h2>
          </div>
    )
	}
}

export default Sender;
