/**
 * 
 */

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import BgColorPanel from './BgColorPanel';
import LightingPanel from './LightingPanel';
import IsosurfacePanel from './IsosurfacePanel';

class VisPanel extends Component {
    constructor(props) {
      super(props);

      // Init States
      this.state = { selectedToolbarItem: null };

      // Set Refs
      this.canvasRef = React.createRef();

      // Handel Events
      this.drawImage = this.drawImage.bind(this);
      this.setRotate = this.setRotate.bind(this);
      this.selectToolbarItem = this.selectToolbarItem.bind(this);

      // Vareiables
      this.canvas = null;
      this.ctx = null;
    }

    drawImage(source) {
      let node = this.canvasRef.current;
      if (node === null) {
        return;
      }
      node.drawImage(source);
    }

    setRotate(isRotate) {
      this.props.visControlConnector.setRotate(isRotate);
    }

    selectToolbarItem(selectedId) {
      this.setState({
        selectedToolbarItem: selectedId
      });
    }

    render() {

      let toolForm;

      if (!this.props.nodeState.isConnected) {
        return null;
      }

      if ('item-BgColor' === this.state.selectedToolbarItem) {
        toolForm = <BgColorPanel />;
      }
      else if ('item-Lightning' === this.state.selectedToolbarItem) {
        toolForm = <LightingPanel />;
      }
      else if ('item-Isosurface' === this.state.selectedToolbarItem) {
        toolForm = <IsosurfacePanel />;
      }
      

      return (
        <div id="vis_panel" className="vis-panel">
          <Container fluid>
            <Row>
              <Col xs="auto">
                <Toolbar 
                  setRotate={this.setRotate}
                  selectToolbarItem={this.selectToolbarItem}
                />
              </Col>
              <Col xs="auto">
                <Canvas ref={this.canvasRef} 
                  id="visCanvas" 
                  className="vis-canvas" 
                  width="800" 
                  height="800" 
                  visControlConnector={this.props.visControlConnector} />    
              </Col>
              <Col xs="auto" className="col-tool-form">{toolForm}</Col>
            </Row>
          </Container>
        </div>
      );
    }
}


export default VisPanel;