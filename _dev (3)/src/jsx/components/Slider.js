/**
 * 
 */

import React from 'react';
import 'nouislider';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    // Set Refs
    this.sliderRef = React.createRef();
  }

  setColor(color) {
    $(this.sliderRef.current).find('.noUi-connect').css(
        'background', 
        `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`
    );
  }


  componentDidMount() {
    let min = this.props.min ? this.props.min : 0;
    let max = this.props.max ? this.props.max : 100;

    noUiSlider.create(this.sliderRef.current, {
        start: 50,
        behaviour: 'snap',
        connect: [true, false],
        range: {
            'min': min,
            'max': max
        }
    });
  }


  render() {

    return (
        <div className="sselector">
            <div ref={this.sliderRef} />
        </div>
      );
  }
}

export default Slider;
