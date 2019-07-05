import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    //iterate through the messages in messages state of App and render in page
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