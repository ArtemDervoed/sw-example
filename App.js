import React from 'react';
import { song } from './song';
import { randomInteger } from './randomInteger';

export default class App extends React.PureComponent {
  state = {
    response: '',
  }
  componentDidMount() {
    this.initWorker();
  }

  initWorker = () => {
    if ('serviceWorker' in navigator) {
      // Весь код регистрации у нас асинхронный.
      navigator.serviceWorker.register('./sw.js')
        .then(() => navigator.serviceWorker.ready.then((worker) => {
          worker.sync.register('syncdata');
        }))
        .catch((err) => console.log(err));
    }
  }

  handleMessage = (event) => {
    this.setState({ response: event.data })
  }

  handleClick = () => {
    this.msg = new MessageChannel();
    this.msg.port1.onmessage = this.handleMessage;
    const message = { time: new Date(), text: song[randomInteger(0, song.length - 1)]}
    navigator.serviceWorker.controller.postMessage(message, [this.msg.port2]);
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Clck me if you can</button>
        <div>{response}</div>
      </div>
    );
  }
}