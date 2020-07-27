/**
 * 
 */
class StreamConnector {

  constructor(V9) {
    this.V9 = V9;

    this.websocket = null;
    this.port = '';
    this.rot = 0.0;
    this.url = null;
    this.visConnectionUri = '';
    this.binaryType = '';

    if (this.V9.TRI_Frontend.img == null) {
      this.V9.TRI_Frontend.img = new Image();
    }

    this.img = this.V9.TRI_Frontend.img;

    //this.connect();
  }

  connect() {
    this.disconnect();

    this.port = this.V9.TRI_Frontend.visPort;

    console.log("Initializing Stream Connection to port " + this.port);

    this.visConnectionUri = "ws://" + this.V9.TRI_Frontend.procIP + ":" + this.port + "/";

    this.binaryType = "blob";

    this.websocket = new WebSocket(this.visConnectionUri);
    this.websocket.onopen = (evt) => {
      this.onOpen(evt)
    };
    this.websocket.onclose = (evt) => {
      this.onClose(evt)
    };
    this.websocket.onmessage = (evt) => {
      this.onMessage(evt)
    };
    this.websocket.onerror = (evt) => {
      this.onError(evt)
    };
  }

  disconnect() {
    if (this.websocket === null) {
      return;
    }
    this.websocket.close();
  }

  onOpen(evt) {
    console.log("Websocket CONNECTED to " + this.visConnectionUri);
    console.log("not doing enything with vis stream");
  }

  onClose(evt) {
    console.log("Websocket DISCONNECTED: Stream");
  }

  onMessage(evt) {
    console.log("result:");
    console.log(evt.data);

    this.V9.displayImage(evt.data);
  }

  onError(evt) {
    console.log("Websocket Error: " + evt.data);
    // Alert Message
    this.V9.alert(this.V9.TRI_Frontend.failureMsg, 'danger');
  }
}

export default StreamConnector;