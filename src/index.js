import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var ChatApp = React.createClass({

  getInitialState: function() {
    return {
      messages: [],
      socket: window.io('http://localhost:5000'),
      user: ''
    }
  },

  componentDidMount: function(){
    var self = this;
    this.state.socket.on('receive-message', function(msg){
      console.log(msg);
      var messages = self.state.messages;
        messages.push(msg);
      self.setState({
        messages: messages
      });
      console.log(self.state.messages)

    });
  },

  submitMessage: function(){
    var body = document.getElementById('message').value;
    var message = {
      body: body,
      user: this.state.user
    }
    this.state.socket.emit('new-message', message);
    console.log(message);
  },

  submitUserName: function(){
    var user = document.getElementById('user').value;
    this.setState({ user: user});
  },

  render() {
    var i = 0;
    var messages = this.state.messages.map(function(msg) {
      return (
        <li> <strong> {msg.user} </strong><span> {msg.body} </span> </li>
      );
     i++
   });
    var self = this;
      return (
          <div>
            <ul>
              {messages}
            </ul>
            <input id="message" type="text"/>
              <button onClick={() => self.submitMessage()}> send </button>
              <br/>
              <input id="user" type="text" placeholder="choose a username"/>
              <button onClick={() => self.submitUserName()}> submit </button>
          </div>
      )
    }
  });


ReactDOM.render(
  <ChatApp />,
  document.getElementById('root'));
