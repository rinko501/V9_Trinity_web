/**
 * 
 */


import React, { Component } from 'react';
import {Carousel} from '3d-react-carousal';
import DataItem from './DataItem';
import RendererSelector from './RendererSelector';


class DataSlider extends Component {
  constructor(props) {
    super(props);

    // Init States
    this.state = {
      enableRendererSelector: false
    };


    // Set Refs
    this.rendererRef = React.createRef();

    
    // Handel Events
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onSelectRenderer = this.onSelectRenderer.bind(this);

    this.getApplicationList = this.getApplicationList.bind(this);

    // Variables
    this.slideCount = 0;
    this.selectedItem = null;
  }


  componentDidMount() {
    //TRI_Frontend.init();
  }

  componentDidUpdate(prevProps, prevState) {
    // Focus Renderer Selector
    if (this.state.enableRendererSelector !== prevState.enableRendererSelector && 
        this.state.enableRendererSelector) {
      window.scrollTo({
        top:this.rendererRef.current.offsetTop, 
        behavior: "smooth"
      });
    }
    
  }


  onSelectItem(item) {
    this.props.alert();

    this.setState({
      enableRendererSelector: true
    });

    if (this.selectedItem !== null) {
      this.selectedItem.setSelected();
    }

    this.selectedItem = item;

    console.log("selected dataset ", this.selectedItem.name, this.selectedItem.datasetName);
  }

  onSelectRenderer(gridLeaper) {

    if(this.selectedItem === null) {
      // Alert Message
      this.props.alert('please select a dataset first', 'danger');
    } else {
      this.props.onSelectRenderer(gridLeaper, this.selectedItem.datasetName);
    }
  }

  

  

  getApplicationList() {
    let list = [],
        imgUrl = "https://i.postimg.cc/",
        imgPath = "";

    this.slideCount = 0;

    imgPath = "zfSxjxFK/imagevis-body.png";
    list[this.slideCount] = {
        src: imgUrl + imgPath,
        altText: 'CT - UVF data',
        caption: 'UVF data',
        header: 'CT'
    };
    this.slideCount++;

    imgPath = "NMDPgdyB/bonsai.png";
    list[this.slideCount] = {
        src: imgUrl + imgPath,
        altText: 'bonsai - tiny bonsai tree',
        caption: 'tiny bonsai tree',
        header: 'bonsai'
    };
    this.slideCount++;

    imgPath = "Qt80ncfP/imagevis-fractal-back.png";
    list[this.slideCount] = {
        src: imgUrl + imgPath,
        altText: 'fractal - analytical data',
        caption: 'analytical data',
        header: 'fractal'
    };
    this.slideCount++;

    imgPath = "76KmvbcL/meshkov.png";
    list[this.slideCount] = {
        src: imgUrl + imgPath,
        altText: 'instability simulation - Richtmeyer-Meshkov',
        caption: 'Richtmeyer-Meshkov',
        header: 'instability simulation'
    };
    this.slideCount++;

    return list;
  }


  render() {

    if (this.props.nodeState.isConnected) {
      return null;
    }

    let items = this.getApplicationList();

    return (
      <div className="container" >
        <div id="data_panel">
          <Carousel slides={items.map((item) => {
            return (
              <DataItem item={item} 
                onSelectItem={this.onSelectItem} />
            );
          })}/>
          <RendererSelector enabled={this.state.enableRendererSelector} 
            onSelectRenderer={this.onSelectRenderer} 
            rendererRef={this.rendererRef}/>
        </div>
      </div>
    );
  }
}


export default DataSlider;