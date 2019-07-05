import React, {Component} from 'react';

class ChatBar extends Component {
  //onKeyDown function for message input field
  onKeyDownMessage = (e) => {
    //verify if the button pressed is Enter
    if(e.key === "Enter") {

      e.preventDefault();
      let message = e.target.value;

      //call composeMessage to compose the message
      this.props.composeMessage(message);

      //Set the input field to empty after composing a message
      e.target.value = "";
    }
  }

  //onKeyDown function for name input field
  onKeyDownName = (e) => {
    //verify if the button pressed is Enter
    if (e.key === "Enter") {
      e.preventDefault();

      let prevUserName = this.props.chatName.name;
      let currentUserName = e.target.value;
      //call changeUser function to change the user's name
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