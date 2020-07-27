/**
 * 
 */
class NodeConnector {

  constructor(V9) {
    this.wsUri = '';
    this.requestType = '';
    this.websocket = null;

    this.V9 = V9;

    console.log("Initializing Websocket Connection");

    //this.connect();
  }

  connect() {
    this.disconnect();

    this.wsUri =
      "ws://" + this.V9.TRI_Frontend.procIP + ":" + this.V9.TRI_Frontend.procPort + "/";

    this.requestType = 'InitRenderer';

    this.websocket = new WebSocket(this.wsUri);
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
    console.log("Websocket CONNECTED to " + this.wsUri);
    console.log("sending init renderer request");
    this.sendRequest(this.requestType);
    console.log("done sending init renderer request");
  }

  onClose(evt) {
    console.log("Websocket DISCONNECTED: Node");
  }

  onMessage(evt) {
    let messageResult = {};
    try {
      messageResult = JSON.parse(evt.data);
    } catch (error) {
      console.log("ERROR: Error while parsing Message response to JSON")
    }
    console.log("result:");
    console.log(messageResult);
    console.log(messageResult.rep.params);

    if (this.requestType === messageResult.type && messageResult.rep.params !== undefined) {
      console.log('ready to render');
      this.V9.runRenderer(messageResult.rep.params.visport, messageResult.rep.params.controlport);
    } else {
      // Alert Message
      this.V9.alert('something wrong. Please check the console of your browser for detail.', 'danger');
    }
  }

  onError(evt) {
    console.log("Websocket Error: " + evt.data);
    // Alert Message
    this.V9.alert(this.V9.TRI_Frontend.failureMsg, 'danger');
  }

  sendRequest(requestType, parameter) {
    let requestTypes = ["InitRenderer"];
    if (requestTypes.indexOf(requestType) !== -1) {
      // look like type: InitRenderer; rid: 1; sid: 0; params: { protocol: tcp.prefixed; rendertype: SimpleRenderer; fileid: FractalData@3; ioendpoint: tcp.prefixed:127.0.0.1:6678; streamingparams: { xres: 800; yres: 600 } }
      console.log("Sending: " + requestType);
      let ioString = "" + this.V9.TRI_Frontend.ioIP + ":" + this.V9.TRI_Frontend.ioPort;
      console.log("io endpoint: " + ioString);

      let rendertype = this.V9.TRI_Frontend.gridLeaper ? 'GridLeapingRenderer' : 'SimpleRenderer';
      let request = {
        type: requestType,
        req: {
          rid: 1,
          sid: 0,
          params: {
            protocol: 'tcp.ws',
            rendertype: rendertype,
            fileid: this.V9.TRI_Frontend.datasetName,
            ioendpoint: 'tcp.prefixed:' + ioString,
            streamingparams: {
              xres: this.V9.TRI_Frontend.xRes,
              yres: this.V9.TRI_Frontend.yRes,
            }
          }
        }
      };
      let message = JSON.stringify(request);

      console.log("Sent from nodeconnector: " + message);
      this.websocket.send(message);

      this.V9.TRI_Frontend.gridLeaper = false;
    }
  }
}

export default NodeConnector;