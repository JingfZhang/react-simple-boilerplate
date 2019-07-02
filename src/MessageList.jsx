import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {

    let messageItem = this.props.messageList.map((oneMessage) => {
          return (<Message key={oneMessage.id} singleMessage={oneMessage} />);
    })

    return (
      <div className="system">
        {messageItem}
      </div>
    );
  }
}

export default MessageList;