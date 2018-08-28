import React from "react";


const Sender = (props) => {
    return (
        props.history.map((msgs, i) => {
            return (
            <div key={i} className={(msgs.id === props.sender) ? 'message message-personal new' : 'message message new' }>
                <h2 key={i}> {msgs.msg} </h2>
            </div>
            )
        })
    )
}

export default Sender;
