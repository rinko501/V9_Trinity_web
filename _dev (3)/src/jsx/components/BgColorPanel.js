/**
 * 
 */

import React from 'react';
import { SketchPicker } from 'react-color';

class BgColorPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    //this.props.onAlertDismiss();
  }

  render() {

    return (
        <div className="tool-form">
            <div className="title">
              <h5>Background Color</h5>
              <h6>Select background color from color-picker ... </h6>
            </div>
            <div className="content">
                <SketchPicker width='auto'/>
            </div>
        </div>
      );
  }
}

export default BgColorPanel;
