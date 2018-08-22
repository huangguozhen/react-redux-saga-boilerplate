// import io from 'socket.io-client'

export const scope = function (f, scope) {
  return function () {
    return f.apply(scope, arguments)
  }
}

export default class wsClient {
  connected = false;
  onMessage () {};

  constructor (uri, clientId) {
    this.uri = uri;
    this.clientId = clientId;
  }

  connect (connectOptions = {}) {
    if (this.connected) {
      throw new Error('already connected')
    }

    if (this.socket) {
      throw new Error('already connected')
    }

    this.connected = false;
    this.socket = new WebSocket('ws://ydsaas.demo.intoyun.com/v1/websocket')
    this.socket.onopen = scope(this._on_socket_open, this);
    this.socket.onclose = scope(this._on_socket_close, this);
    this.socket.onmessage = scope(this._on_socket_message, this);
    this.socket.onerror = scope(this._on_socket_error, this);
  }

  send (data) {
    if (!this.connected) {
      throw new Error('not connected')
    }

    this.socket.send(data)
  }

  _on_socket_open () {
    console.log('_on_socket_open')
  }

  _on_socket_close (event) {
    console.log('_on_socket_close')
    console.log(event)
  }

  _on_socket_error (error) {
    console.log('_on_socket_error')
    console.error(error)
  }

  _on_socket_message (payload) {
    console.log(payload)
    this.onMessage(payload.data)
  }
}
