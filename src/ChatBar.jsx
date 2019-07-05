import React, {Component} from 'react';

class ChatBar extends Component {

  onKeyDownMessage = (e) => {
    if(e.key === "Enter") {

      e.preventDefault();
      let message = e.target.value;
      this.props.composeMessage(message);

      e.target.value = "";
    }
  }

  onKeyDownName = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let prevUserName = this.props.chatName.name;
      let currentUserName = e.target.value;
      this.props.changeUser(prevUserName, currentUserName);
    }
  }

  render() {
    return (
      <div>
        <form className="chatbar">
          <input name="nameField" className="chatbar-username" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.chatName.name} onKeyDown={this.onKeyDownName} />
          <input name="messageField" className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.onKeyDownMessage}/>
        </form>
      </div>
    );
  }
}

export default ChatBar;