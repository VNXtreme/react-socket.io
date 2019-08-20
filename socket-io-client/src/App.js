import React, { Component } from 'react'
import Sidebar from './components/Sidebar';
import Chatbox from './components/Chatbox';

export default class App extends Component {
  render() {
    return (
      <div id="frame">
        <Sidebar></Sidebar>
        <Chatbox></Chatbox>
      </div>
    )
  }
}
