/**
 * 
 */

import React from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
import Slider from './Slider';

class SwatchSliderControl extends React.Component {
  constructor(props) {
    super(props);

    // Init States
    this.state = {
        displayColorPicker: false,
        color: {
            r: '226',
            g: '226',
            b: '226',
            a: '1',
        }
    };

    // Set Refs
    this.sliderRef = React.createRef();
  
    // Handel Events
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color, event) {
    this.setState({ color: color.rgb });
    this.sliderRef.current.setColor(color.rgb);
  }

  render() {
    
    let colorPicker;

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '24px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            colorAlt: {
                width: '36px',
                height: '24px',
                background: 'transparent',
            },
            swatchAlt: {
                padding: '5px',
                background: 'transparent',
                display: 'inline-block',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    if (this.props.colorPicker) {
        return (
            <div>
                <h6>{this.props.title}</h6>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker &&
                <div style={ styles.popover } >
                    <div style={ styles.cover } onClick={ this.handleClose } />
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div>
                }
                <Slider ref={this.sliderRef} />
            </div>
        );
    } else {
        return (
            <div>
                <h6>{this.props.title}</h6>
                <div style={ styles.swatchAlt }>
                    <div style={ styles.colorAlt } />
                </div>
                <Slider ref={this.sliderRef} />
            </div>
        );
    }
  }
}

export default SwatchSliderControl;
