import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var ChatApp = React.createClass({

  getInitialState: function() {
    return {
      messages: [],
      socket: window.io('http://localhost:5000')
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
      })
      console.log(self.state.messages)

    });

  },

  submitMessage: function(){
    var message = document.getElementById('message').value;
    this.state.socket.emit('new-message', message);
    console.log(message);
  },
  render() {
    var i = 0;
    var messages = this.state.messages.map(function(msg) {
      return (
        <li key={i}> {msg} </li>
      );
     i++
    })
    var self = this;
      return (
          <div>
            <ul>
            </ul>
            <input id="message" type="text"/>
              <button onClick={self.submitMessage}> send </button>
          </div>
      )
    }
  });


ReactDOM.render(
  <ChatApp />,
  document.getElementById('root'));
