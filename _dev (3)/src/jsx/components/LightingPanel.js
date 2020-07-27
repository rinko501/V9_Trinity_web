/**
 * 
 */

import React from 'react';
import * as THREE from 'three';
import * as WHS from 'whs';
import SwatchSliderControl from './SwatchSliderControl';

class LightingPanel extends React.Component {
  constructor(props) {
    super(props);

    // Set Refs
    this.containerRef = React.createRef();

    
    // Handel Events
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {

    this.app = new WHS.App([
      new WHS.ElementModule({
        container: this.containerRef.current
      }),
      new WHS.SceneModule(),
      new WHS.CameraModule({
        position: {
          y: 10,
          z: 50
        }
      }),
      new WHS.RenderingModule({
        bgColor: 0x000000,
    
        renderer: {
          antialias: true,
          shadowmap: {
            type: THREE.PCFSoftShadowMap
          }
        }
      }, {shadow: true}),
      new WHS.OrbitControlsModule(),
      new WHS.ResizeModule()
    ]);
    
    // Sphere
    const sphere = new WHS.Sphere({ // Create sphere comonent.
      geometry: {
        radius: 30,
        widthSegments: 32,
        heightSegments: 32
      },
    
      material: new THREE.MeshPhongMaterial({
        color: 0xE2E2E2
      }),
    
      position: new THREE.Vector3(0, 0, 0)
    });
    
    sphere.addTo(this.app);
    
    
    // Lights
    new WHS.PointLight({
      light: {
        intensity: 0.5,
        distance: 100
      },
    
      shadow: {
        fov: 90
      },
    
      position: new THREE.Vector3(0, 10, 32)
    }).addTo(this.app);
    
    new WHS.AmbientLight({
      light: {
        intensity: 0.4
      }
    }).addTo(this.app);
    
    // Disable Zoom
    this.app.manager.modules.controls.controls.enableZoom = false;

    // Start the app
    this.app.start();

  }

  componentWillUnmount(){
    this.app.stop();
  }

  onDismiss() {
    //this.props.onAlertDismiss();
  }

  render() {

    return (
        <div className="tool-form">
            <div className="title">
              <h5>Lighting Settings</h5>
              <h6>Move the following 3D-Module to change the lighting position ...</h6>
            </div>
            <div className="content" ref={this.containerRef} />
            <div className="control">
                <SwatchSliderControl colorPicker  title="Ambient Color & Intensity"/>
            </div>
            <div className="control">
                <SwatchSliderControl colorPicker title="Diffuse Color & Intensity"/>
            </div>
            <div className="control">
                <SwatchSliderControl colorPicker title="Higlight Color & Intensity"/>
            </div>
        </div>
      );
  }
}

export default LightingPanel;
