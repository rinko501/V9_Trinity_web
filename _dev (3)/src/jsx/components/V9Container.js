/**
 * 
 */

import React, { Component } from 'react';
import DataSlider from './DataSlider';
import VisPanel from './VisPanel'
import AlertMessage from './AlertMessage'

import NodeConnector from '../Network/NodeConnector';
import StreamConnector from '../Network/StreamConnector';
import VisControlConnector from '../Network/VisControlConnector';

import TRI_Frontend from '../etc/TRI_Frontend';


class V9Container extends Component {
    constructor(props) {
      super(props);

      // Init States
      this.state = { 
        nodeState: {
          isConnected: false
        },
        alert: {
          visible: false, 
          color: 'info', 
          message: ''}
      };

      

      // Set Refs
      this.visPanelRef = React.createRef();

      // Handel Events
      this.onSelectRenderer = this.onSelectRenderer.bind(this);
      this.onAlertDismiss = this.onAlertDismiss.bind(this);
      this.alert = this.alert.bind(this);
      this.runRenderer = this.runRenderer.bind(this);
      this.displayImage = this.displayImage.bind(this);

      // Vareiables
      this.TRI_Frontend =  TRI_Frontend;
      this.nodeConnector = new NodeConnector(this);;
      this.streamConnector = new StreamConnector(this);;
      this.visControlConnector = new VisControlConnector(this);
    }


    alert(message='', color='info') {
      // Alert Message
      this.setState({
        alert: {visible: message.length > 0, color: color, message: message}
      });
    }

    runRenderer(visPort, controlPort) {
      this.TRI_Frontend.visPort = visPort;
      this.TRI_Frontend.controlPort = controlPort;
      this.setState({
        nodeState: {
          isConnected: true
        }
      });

      this.streamConnector.connect();
      this.visControlConnector.connect();
    }

    displayImage(source) {
      const node = this.visPanelRef.current;
      node.drawImage(source);
      this.visControlConnector.handelCameraAction();
    }


    onAlertDismiss() {
      this.alert();
    }

    onSelectRenderer(gridLeaper, datasetName) {
      this.alert();
      this.TRI_Frontend.gridLeaper = gridLeaper;
      this.TRI_Frontend.datasetName = datasetName;
      
      this.nodeConnector.connect();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
      if (this.nodeConnector !== null) {
        this.nodeConnector.disconnect();
      }
      if (this.streamConnector !== null) {
        this.streamConnector.disconnect();
      }
      if (this.visControlConnector !== null) {
        this.visControlConnector.disconnect();
      }
    }

    render() {

      return (
        <div>
          <DataSlider alert={this.alert} 
            nodeState={this.state.nodeState} 
            onSelectRenderer={this.onSelectRenderer} />
          <VisPanel ref={this.visPanelRef} 
            nodeState={this.state.nodeState}
            visControlConnector={this.visControlConnector} />
          <AlertMessage params={this.state.alert} 
            onAlertDismiss={this.onAlertDismiss}/>   
        </div>
      );
    }
}


export default V9Container;