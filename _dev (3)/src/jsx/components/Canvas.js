/**
 * 
 */

import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
      super(props);

      // Set Refs
      this.canvasRef = React.createRef();

      // Handel Events
      this.drawImage = this.drawImage.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove  = this.onMouseMove .bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onKeyDown  = this.onKeyDown.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove   = this.onTouchMove.bind(this);
      this.onTouchEnd  = this.onTouchEnd.bind(this);

      // Vareiables
      this.canvas = null;
      this.ctx = null;
      this.img = null;
    }

    drawImage(source) {
      if (this.ctx === null) {
        return;
      }

      this.img.src = window.URL.createObjectURL(source);

      this.img.onload = () => {
        console.log("drawing...");
        //this is the control of canvas onload(like how to load the volume to the specific canvas)
        this.ctx.drawImage(this.img, 0, 0); //the main canvas"#myCanvas"
  
        window.URL.revokeObjectURL(this.img.src);
      }
    }

    componentDidMount() {
        this.img = new window.Image();
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
    }

    componentDidUpdate() {

    }


    onMouseDown(evt) {
        this.props.visControlConnector.onDown(evt);
    }

    onMouseMove(evt) {
        this.props.visControlConnector.onMove(evt);
    }

    onMouseUp(evt) {
        this.props.visControlConnector.onUp(evt);
    }

    onKeyDown(evt) {
        this.props.visControlConnector.onKeydown(evt);
    }

    onTouchStart(evt) {
        this.props.visControlConnector.onDown(evt);
    }

    onTouchMove(evt) {
        this.props.visControlConnector.onMove(evt);
    }

    onTouchEnd(evt) {
        this.props.visControlConnector.onUp(evt);
    }


    render() {

      return (
        <canvas ref={this.canvasRef} 
            id={this.props.id} 
            className={this.props.className} 
            width={this.props.width} 
            height={this.props.height}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onKeyDown={this.onKeyDown}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd} />       
      );
    }
}


export default Canvas;