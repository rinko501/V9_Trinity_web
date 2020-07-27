/**
 * 
 */

import React, { Component } from 'react';

class DataItem extends Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false, selected: false };

        this._onLoad = this._onLoad.bind(this);
        this.SelectItem = this._onSelectItem.bind(this);

        // Set Dataset Name
        this.datasetName = '';
        this.name = this.props.item.header;
        if(this.name == "CT") {
            this.datasetName = "UVFData@./WholeBody-SCANLINE-132-lz4.uvf";
        }
        else if(this.name == "bonsai") {
            this.datasetName = "UVFData@./Bonsai-SCANLINE-132-lz4.uvf";
        }
        else if(this.name == "fractal") {
            this.datasetName = "UVFData@./Mandelbulb1k-SCANLINE-132-lz4.uvf";
        }
        else if(this.name == "instability simulation") {
            this.datasetName = "UVFData@./RichtmyerMeshkov-SCANLINE-132-lz4.uvf";
        }
    }

    _onLoad() {
        this.setState({
            loaded: true
        });
    }

    _onSelectItem() {
        this.props.onSelectItem(this);
        this.setSelected(true);
    }

    setSelected(isSelected) {
        this.setState({
            selected: isSelected
        });
    }

    render() {
        const isSelected = this.state.selected;
        let button;

        if (isSelected) {
            button = <button className='btn btn-lg btn-success' onClick={this._onSelectItem.bind(this)}>
                        <i className="fa fa-check fa-2x" aria-hidden="true"></i>
                    </button>;
        } else {
            button = <button className='btn btn-lg btn-danger' onClick={this._onSelectItem.bind(this)}>Select</button>;
        }

        return (
            <div className="carousel-item d-block">
                <img src={this.props.item.src} alt={this.props.item.altText} onLoad={this._onLoad} />
                {this.state.loaded &&
                <div className="carousel-caption">
                    <h3>{this.props.item.header}</h3>
                    <p>{this.props.item.caption}</p>
                    <p>{button}</p>
                </div>
                }
            </div>
        );
    }
}


export default DataItem;