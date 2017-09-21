import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var ChatApp = React.createClass({
  
  getInitialSate: function() {
    return {
      messages: [],
      socket: window.io('http://localhost:5000')
    }
  },
  
  componentDidMount: function(){
    this.state.socket.on('new-message', function(msg){
      console.log(msg);
      this.setState({
        messages: this.state.messages.push(msg)
      })
      
    });
    
  },
  
  submitMessage: function(){
    var message = document.getElementById('message').value;
    this.socket.emit('receive-message', message);
    console.log(message);
  },
  render() {
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
