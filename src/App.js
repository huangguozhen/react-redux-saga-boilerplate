import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { incrementAsync, incrementIfOdd } from './actions/counter';

class App extends Component {
  render() {
    const { counter, dispatch } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
          Clicked: {counter} times
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>{' '}
          <button onClick={() => dispatch(incrementIfOdd())}>Increment if odd</button>{' '}
          <button onClick={() => dispatch(incrementAsync())}>Increment async</button>
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const select = (state) => ({
  counter: state.counter
});

export default connect(select)(App);
