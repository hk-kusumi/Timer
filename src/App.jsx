import React, { Component } from 'react';
import MyTimer from './MyTimer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App-Container'>
        <div className='App'>
          <MyTimer />
        </div>
      </div>
    );
  }
}

export default App;
