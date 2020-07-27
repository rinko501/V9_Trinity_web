/**
 * 
 */

import React from 'react';
import SwatchSliderControl from './SwatchSliderControl';

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
              <h5>Isosurface</h5>
              <h6>Select settings for isosurface and clearview ... </h6>
            </div>
            <div className="control">
                <SwatchSliderControl colorPicker title="Isosurface Color & Isovalue"/>
            </div>
            <div className="control">
                <SwatchSliderControl colorPicker title="Focus Color & Isovalue"/>
            </div>
            <div className="control">
                <SwatchSliderControl title="Focus Size"/>
            </div>
            <div className="control">
                <SwatchSliderControl title="Context Scale"/>
            </div>
            <div className="control">
                <SwatchSliderControl title="Border"/>
            </div>
        </div>
      );
  }
}

export default BgColorPanel;
