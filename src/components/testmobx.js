import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {observable, action} from 'mobx';

var appState = observable({
  timer: 0
});

appState.resetTimer = action(function reset() {
  appState.timer = 0;
});

setInterval(action(function tick() {
  appState.timer += 1;
}), 1000);

@observer
class TimerView extends React.Component {
  render() {
    return (
      <button onClick={this.onReset}>
        Seconds passed: {this.props.appState.timer}
      </button>
    );
  }

  onReset () {
    this.props.appState.resetTimer();
  }
};

ReactDOM.render(<TimerView appState={appState} />, document.getElementById('app'));