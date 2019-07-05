import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {name : ""},
      color: this.getRandomColor(),
      messages:[],
      numberOfUser: 0
    }
  }
  //function that generate a random color for each client, used in state.
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
  }

  //function that takes a message and generate an object including name message type and send to server
  composeMessage = (message) => {
    let name;
    //if the client doesn't have a name show them as anonymous in the chat
    if(this.state.currentUser.name !== ""){
      name = this.state.currentUser.name;
    } else {
      name = "Anonymous"
    }
    const newMessage = {type: "postMessage", username: name, content: message, color: this.state.color};
    this.webSocket.send(JSON.stringify(newMessage));
  }

  //function that changes the user's name and send to server to notify all connected clients
  changeUser = (oldName, newName) => {
    let nameContent;
    //if the client doesn't have a name show them as anonymous when updating name
    if(oldName !== "") {
      nameContent = `***${oldName} has changed their name to ${newName}***`;
    } else {
      nameContent = `***Anonymous has changed their name to ${newName}***`;
    }
    const nameChange = {type: "postNotification", username: newName, content: nameContent};
    this.webSocket.send(JSON.stringify(nameChange));

    this.setState({currentUser: {name: newName}});

  }

  componentDidMount() {
    this.webSocket = new WebSocket ("ws://localhost:3001");

    //When reciving messages from server
    this.webSocket.onmessage = (event) => {

      let messageFromServer = JSON.parse(event.data);
      //identify what is the type of the message recieved from server
      if (messageFromServer.type === "numberOfUser") {
        this.setState({messages: [...this.state.messages, messageFromServer.systemMessage], numberOfUser: messageFromServer.number})
      } else {
        this.setState({
          messages: [...this.state.messages, messageFromServer]
        });
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-count">{this.state.numberOfUser} Users Online</span>
        </nav>
        //pass messages state to MessageList.jsx as a prop
        <MessageList messageList={this.state.messages}/>
        //pass composeMessage function, changeUser function and currentUser state to ChatBar.jsx as props
        <ChatBar composeMessage={this.composeMessage} changeUser={this.changeUser} chatName={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
