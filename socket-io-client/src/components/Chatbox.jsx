import React, { Component } from "react";
import socketIOClient from "socket.io-client";

export default class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: 1,
        avatar: "http://emilcarlsson.se/assets/mikeross.png"
      },
      isTyping: false,
      currentMessage: null,
      socket: socketIOClient("http://127.0.0.1:4001"),
      messages: [
        {
          text: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
          type: "sent",
          user: {
            id: 1,
            avatar: "http://emilcarlsson.se/assets/mikeross.png"
          }
        },
        {
          text: "When you're backed against the wall, break the god damn thing down.",
          type: "replies",
          user: {
            id: 2,
            avatar: "http://emilcarlsson.se/assets/harveyspecter.png"
          }
        },
        {
          text: "Excuses don't win championships.",
          type: "replies",
          user: {
            id: 2,
            avatar: "http://emilcarlsson.se/assets/harveyspecter.png"
          }
        },
        {
          text: "Oh yeah, did Michael Jordan tell you that?",
          type: "sent",
          user: {
            id: 1,
            avatar: "http://emilcarlsson.se/assets/mikeross.png"
          }
        }
      ]
    };

    this.messageOnTyping = this.messageOnTyping.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidMount() {
    this.state.socket.on("new message", messageData => {
      console.log("new message =" + messageData);

      this.setState(prevState => ({ messages: [...prevState.messages, messageData] }));
    });
  }

  submitMessage() {
    let submitData = {
      text: this.state.currentMessage,
      type: "sent",
      user: this.state.user
    };

    this.state.socket.send(submitData);
    this.setState(prevState => ({ messages: [...prevState.messages, submitData] }));
  }

  messageOnTyping(e) {
    let isTyping = e.target.value.length > 0 ? true : false;
    this.setState({ currentMessage: e.target.value, isTyping: isTyping });
  }

  handleOnBlur(e){
    // this.setState({ isTyping: false });
  }

  render() {
    return (
      <div className="content">
        <div className="contact-profile">
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
          <p>Harvey Specter {this.state.isTyping ? 'typing...' : ''}</p>
          <div className="social-media">
            <i className="fa fa-facebook" aria-hidden="true" />
            <i className="fa fa-twitter" aria-hidden="true" />
            <i className="fa fa-instagram" aria-hidden="true" />
          </div>
        </div>
        <div className="messages">
          <ul>
            {this.state.messages.map((message, key) => (
              <li key={key} className={message.type}>
                <img src={message.user.avatar} alt="" />
                <p>{message.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input type="text" placeholder="Write your message..." defaultValue={this.state.currentMessage} onBlur={this.handleOnBlur} onChange={this.messageOnTyping} />
            <i className="fa fa-paperclip attachment" aria-hidden="true" />
            <button className="submit" onClick={this.submitMessage}>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
