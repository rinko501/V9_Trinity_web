/**
 * 
 */

import React, { Component } from 'react';

class RendererSelector extends Component {
    constructor(props) {
        super(props);

        this._onSelectRenderer = this._onSelectRenderer.bind(this);
    }

    _onSelectRenderer(gridLeaper) {
        this.props.onSelectRenderer(gridLeaper);
    }

    render() {

        if (!this.props.enabled) {
            return null;
        }

        return (  
            <div className='renderer-selector' ref={this.props.rendererRef}>
                <button className='btn btn-danger btn-medium' onClick={this._onSelectRenderer.bind(this, false)}>
                    <i className="fa fa-picture-o fa-fw" aria-hidden="true"></i> raycaster 
                </button>
                <button className='btn btn-danger btn-medium' onClick={this._onSelectRenderer.bind(this, true)}>
                    <i className="fa fa-picture-o fa-fw" aria-hidden="true"></i> grid leaper 
                </button>
            </div>
        );
    }
}


export default RendererSelector;