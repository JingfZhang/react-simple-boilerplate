import React, {Component} from 'react';

class ChatBar extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    let name;
    if (e.target.nameField.value) {
      name = e.target.nameField.value;
    } else {
      name = "Anonymous";
    }
    let message = e.target.messageField.value;

    this.props.composeMessage(name, message);

    e.target.messageField.value = "";


  }

  render() {
    return (
      <div>
        <form className="chatbar" onSubmit={this.onSubmit}>
          <input name="nameField" className="chatbar-username" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.chatName.name}/>
          <input name="messageField"className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default ChatBar;