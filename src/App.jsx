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

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
  }

  composeMessage = (message) => {
    let name;
    if(this.state.currentUser.name !== ""){
      name = this.state.currentUser.name;
    } else {
      name = "Anonymous"
    }
    const newMessage = {type: "postMessage", username: name, content: message, color: this.state.color};
    this.webSocket.send(JSON.stringify(newMessage));
  }

  changeUser = (oldName, newName) => {
    let nameContent;

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

    this.webSocket.onopen = () => {
      console.log("Connected to server, client");
      console.log(this.state);
    }

    this.webSocket.onmessage = (event) => {
      console.log('client recieved message', event.data);

      let messageFromServer = JSON.parse(event.data);

      if (messageFromServer.type === "numberOfUser") {
        this.setState({messages: [...this.state.messages, messageFromServer.systemMessage], numberOfUser: messageFromServer.number})
      } else {
        this.setState({
          messages: [...this.state.messages, messageFromServer]
        });
      }
      // if (messageFromServer.type === "postMessage") {

      // } else if (messageFromServer.type === "postNotification") {
      //   this.setState({
      //     messages: [...this.state.messages, messageFromServer]
      //   })
      // }

    }


    console.log("componentDidMount");

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-count">{this.state.numberOfUser} Users Online</span>
        </nav>
        <MessageList messageList={this.state.messages}/>
        <ChatBar composeMessage={this.composeMessage} changeUser={this.changeUser} chatName={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
