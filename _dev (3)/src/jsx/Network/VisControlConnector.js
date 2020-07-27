/**
 * 
 */
class VisControlConnector {

    constructor(V9) {
        this.V9 = V9;

        this.websocket = null;
        this.port = '';
        this.controlConnectionUri = '';
        this.righttime = null;
        this.lefttime = null;
        this.setSetUserViewMatrixNeeded = true;
        this.lastX = null;
        this.lastY = null;
        this.isMoving = false;
        this.deltaX = 0.0;
        this.deltaY = 0.0;
        this.stoppedSending = false;
        this.rotMode = true;
        this.zoomCounter = 0;
        this.zoomOutNeeded = true;
        this.currentTF = 0;
        this.tfCount = 0;
        this.resetCameraNeeded = true;
        this.resetSceneNeeded = true;
        this.changeBgNeeded = true;
        this.getBgcolorNeeded = true;
        this.isovalue = 0.0;
        this.enableClipping = true;
        this.slideminx = 0.0;
        this.slidemaxx = 400;
        this.slideminy = 0.0;
        this.slidemaxy = 400;
        this.slideminz = 0.0;
        this.slidemaxz = 400;
        this.clippz = 0.0;
        this.light_ambient = {
            "w": 25,
            "x": 25,
            "y": 25,
            "z": 255
        };
        this.light_diffuse = {
            "w": 255,
            "x": 255,
            "y": 255,
            "z": 255
        };
        this.light_specular = {
            "w": 255,
            "x": 255,
            "y": 255,
            "z": 255
        };
        this.lightx = 0.0;
        this.lighty = 0.0;
        this.lightz = -1.0;
        this.bgColorSet1 = {
            "x": 0,
            "y": 0,
            "z": 0
        };
        this.bgColorSet2 = {
            "x": 0,
            "y": 0,
            "z": 0
        };
        this.value_tran_num = 1 / 2560;
        this.color_tran_num = 1 / 256;
        this.enableLightning = true;
        this.checkState = false;
        this.setIsovalueNeeded = true;
        this.setBoundingBoxNeeded = true;
        this.setRescaleSceneNeeded = true;
        this.scalevalue = 0.0;
        this.clearViewPositionNeeded = true;

        //this.connect();
    }

    connect() {
        this.disconnect();

        this.port = this.V9.TRI_Frontend.controlPort;

        console.log("Initializing Vis Control Connection to port " + this.port);

        this.controlConnectionUri = "ws://" + this.V9.TRI_Frontend.procIP + ":" + this.port + "/";

        this.binaryType = "blob";

        this.websocket = new WebSocket(this.controlConnectionUri);
        this.websocket.onopen = (evt) => {
            this.onOpen(evt)
        };
        this.websocket.onclose = (evt) => {
            this.onClose(evt)
        };
        this.websocket.onmessage = (evt) => {
            this.onMessage(evt)
        };
        this.websocket.onerror = (evt) => {
            this.onError(evt)
        };
    }

    disconnect() {
        if (this.websocket === null) {
            return;
        }
        this.websocket.close();
    }

    onOpen(evt) {
        console.log("Websocket CONNECTED to " + this.controlConnectionUri);
        let request = {
            type: "StartRendering",
            req: {
                rid: 1,
                sid: 3,
                params: {}
            }
        };
        this.doSend(JSON.stringify(request));

        console.log("done sending init context request");
    }

    onClose(evt) {
        console.log("Websocket DISCONNECTED: Stream");
    }

    onMessage(evt) {
        var messageResult = {};

        try {
            messageResult = JSON.parse(evt.data);
            console.log(messageResult);
            console.log("incoming: " + messageResult.rep.params.result);
        } catch (error) {
            console.log("ERROR: Error while parsing Message response to JSON")
        }
        console.log("got sth in control channel:");

    }

    onError(evt) {
        console.log("Websocket Error: " + evt.data);
        // Alert Message
        this.V9.alert(this.V9.TRI_Frontend.failureMsg, 'danger');
    }

    doSend(message) {
        //console.log("Sent: " + message);
        this.websocket.send(message);
    }


    onDown(e) {
        e.preventDefault();
        //console.log(e);
        var e = event || window.event || arguments.callee.caller.arguments[0];

        this.isRotating = true;
        if (e.type == "touchstart" && e.keyCode == 40) {
            this.lastX = e.originalEvent.touches[0].pageX;
            this.lastY = e.originalEvent.touches[0].pageY;
            console.log("ondown rotating touchmove lastx:" + this.lastX + ",lasty:" + this.lastY);

            //not neccessary for web opened with computer

            /*  var angleY, angleX;
    
                e = e || window.event;
                var x1 = e.clientX - canvas3d.offsetLeft - centerX;
                var y1 = e.clientY - canvas3d.offsetTop - centerY;

                var xc = 0, yc = 0;
                var date = new Date();
                var dc = 10000;

                cubeList.forEach(function(cube) {
                    cube.inertia = false;
                });*/
        }
        if (e.keyCode == 40) {
            this.lastX = 5;
            this.lastY = 0;
            console.log("keycode 40:" + this.lastX + ",lasty:" + this.lastY);
            //not neccessary for web opened with computer

        } else {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            console.log("ondown else lastx:" + this.lastX + ",lasty:" + this.lastY);
        }
    }

    onMove(e) {
        if (this.isRotating) {
            //calculate deltas. mouse movement to the right and up is positive

            if (e.type == "touchmove") {
                this.deltaX = e.originalEvent.touches[0].pageX - this.lastX;
                this.deltaY = this.lastY - e.originalEvent.touches[0].pageY;

                this.lastX = e.originalEvent.touches[0].pageX;
                this.lastY = e.originalEvent.touches[0].pageY;
                console.log("rotating touchmove deltax:" + this.deltaX + ",detlay:" + this.deltaY + ",lastx:" + this.lastX + ",lasty:" + this.lastY);
                
                //touchmove e.type actually didn't work
                /*
                                    e = e || window.event;
                                    var x2 = e.clientX - canvas3d.offsetLeft - centerX;
                                    var y2 = e.clientY - canvas3d.offsetTop - centerY;
                                    var date2 = new Date();

                                    xc = x2 - x1;
                                    yc = y2 - y1;

                                    angleY = xc * 0.008;
                                    angleX = yc * 0.008;

                                    cubeList.forEach(function(cube) {
                                        cube.rotate(angleX, angleY);
                                    });

                                    x1 = x2;
                                    y1 = y2;
                                    date = date2;*/

            } else {
                this.deltaX += e.clientX - this.lastX;
                this.deltaY += this.lastY - e.clientY;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                console.log("else deltax:" + this.deltaX + ",detlay:" + this.deltaY + ",lastx:" + this.lastX + ",lasty:" + this.lastY);

            }

            //buildSendMessage(deltaX,deltaY,0);
            if (this.stoppedSending) {
                this.stoppedSending = false;
                this.sendRotation();
            }
        }
    }

    onUp(e) {
        this.isRotating = false;

        /*    window.onmousemove = null;
            var date2 = new Date();
            var dc = (date2 - date) || 1;

            cubeList.forEach(function(cube) {
                cube.inertia = true;
                cube.toAngle = {
                    x: yc / dc,
                    y: xc / dc
                };
            });*/
    }

    onKeydown(e) {
        console.log(e);
    }


    sendingWasStopped() {
        this.stoppedSending = true;
    }

    zoomIn() {
        this.zoomOutNeeded = false;
        document.activeElement.blur();
        this.zoomCounter = 20;
        this.sendZoomIn();
    }

    needsZoom() {
        if (this.zoomCounter != 0) {
            return true;
        } else {
            return false;
        }
    }

    needsZoomOut() {
        return this.zoomOutNeeded;
    }

    zoomOut() {
        this.zoomOutNeeded = true;
        document.activeElement.blur();
        this.zoomCounter = 20;
        this.sendZoomOut(); //zoom out is getting smaller
    }

    sendZoomIn() {
        this.zoomCounter--;
        if (this.zoomCounter > 0) {
            let request = {
                type: "ZoomCamera",
                req: {
                    rid: 108,
                    sid: 1,
                    params: {
                        zoom: 1.007
                    }
                }
            };
            this.doSend(JSON.stringify(request));
            //TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"zoom": 1.007},"rid":108,"sid":1},"type":"ZoomCamera"}');
        }
    }

    sendZoomOut() {
        this.zoomCounter--;
        if (this.zoomCounter > 0) {
            let request = {
                type: "ZoomCamera",
                req: {
                    rid: 108,
                    sid: 1,
                    params: {
                        zoom: 0.993
                    }
                }
            };
            this.doSend(JSON.stringify(request));
            //TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"zoom": 0.993},"rid":108,"sid":1},"type":"ZoomCamera"}');
        }
    }


    handelCameraAction() {
        if (this.needsZoom()) {
    
            if (this.needsZoomOut()) {
                this.sendZoomOut();
            } else {
                this.sendZoomIn();
            }
    
        } else {
            if (this.needsRotation()) {
    
                //console.log("need rot");
                this.sendRotation();
            } else {
                //console.log("refining");
                let request = {
                    type: "ProceedRendering",
                    req: {
                        rid: 1,
                        sid: 3,
                        params: {}
                    }
                };
                this.doSend(JSON.stringify(request));
                //this.V9.VisControlConnector.doSend('{"type": "ProceedRendering", "req": { "rid": 1, "sid": 3, "params": {} } }');
                this.sendingWasStopped();
    
            }
        }
          
    }


    setRotate(isRotate) {
        this.rotMode = isRotate;
    }

    needsRotation() {

        if (Math.abs(this.deltaX) < 0.0001 && Math.abs(this.deltaY) < 0.0001) {
            return false;
        } else {
            return true;
        }
    }

    sendRotation() {

        if (!this.needsRotation()) {
            this.stoppedSending = true;
        } else {

            if (this.rotMode) {
                let request = {
                    type: "RotateCamera",
                    req: {
                        rid: 108,
                        sid: 1,
                        params: {
                            rotation: {
                                x: this.deltaY * (-0.01),
                                y: this.deltaX * 0.01,
                                z: 0
                            }
                        }
                    }
                };
                this.doSend(JSON.stringify(request));
                //this.doSend('{"req":{"params":{"rotation":{"x": ' + deltaY * (-0.01) + ',"y":' + deltaX * 0.01 + ',"z":0}},"rid":108,"sid":1},"type":"RotateCamera"}');
                //TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"rotation":{"x": ' + deltaY * (-0.01) + ',"y":' + deltaX * 0.01 + ',"z":0}},"rid":108,"sid":1},"type":"RotateScene"}');
                console.log("rdeltax:" + this.deltaY * (-0.01) + "---rdeltay:" + this.deltaX * 0.01);

            } else {
                let request = {
                    type: "MoveCamera",
                    req: {
                        rid: 108,
                        sid: 1,
                        params: {
                            direction: {
                                x: this.deltaX * 0.001,
                                y: this.deltaY * 0.001,
                                z: 0
                            }
                        }
                    }
                };
                this.doSend(JSON.stringify(request));
                //TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"direction":{"x": ' + deltaX * (0.001) + ',"y":' + deltaY * 0.001 + ',"z":0}},"rid":108,"sid":1},"type":"MoveCamera"}');
                console.log("mdeltax''':" + this.deltaX * (0.001) + "---mdeltay''':" + this.deltaY * 0.001);
            }
            this.deltaX = 0.0;
            this.deltaY = 0.0;
        }

    }
}

export default VisControlConnector;