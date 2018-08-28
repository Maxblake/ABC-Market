import React from "react";


const MsgBox = (props) => {
    let message = React.createRef();

    const sendMsg = (event) => {
        props.socket.emit('new message', message.current.value);
    };

    return (
        <div className="message-box">
            <textarea
                type="text"
                ref={message}
                className="message-input"
                placeholder="Type message...">
            </textarea>
            <button onClick={sendMsg} className="message-submit">Send</button>
        </div>
    )
}

export default MsgBox;
