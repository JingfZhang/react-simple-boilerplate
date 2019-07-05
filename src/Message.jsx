import React, {Component} from 'react';

class Message extends Component {
  render() {
    //check the type of message that is going to be rendered
    if (this.props.singleMessage.type === "postMessage"){
      return (
        <div className="message" >
          <span className="message-username" style={{color:this.props.singleMessage.color}}>{this.props.singleMessage.username}</span>
          <span className="message-content">{this.props.singleMessage.content}</span>
        </div>
      );
    } else if (this.props.singleMessage.type === "postNotification") {
      return (
        <div className="message system">
          <span className="notification-content">{this.props.singleMessage.content}</span>
        </div>
      );
    }
  }
}

export default Message;