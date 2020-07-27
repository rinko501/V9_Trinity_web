/****************************************************************
 * Copyright (C) Jürgen Grüninger 2016 and failed to copy by Andrey Krekhov
 * The content of this file may not be copied and/or distributed
 * without the expressed permission of the copyright owner.
 *
 ****************************************************************/

if (typeof TRI_Frontend === 'undefined') {

    var TRI_Frontend = {

        ioIP: '127.0.0.1',
        ioPort: '6678',
        procIP: '127.0.0.1',
        procPort: '8679',
        xRes: 800,
        yRes: 800,

        connectFadeoutTimeout: undefined,
        slideCount: 0,
        dataSelected: false,
        datasetName: undefined,
        requirementPanelCount: 0,
        applicationTypes: [],
        deviceTypes: [],
        deviceDict: undefined,
        selectedApplicationName: undefined,
        selectedApplicationDescription: undefined,
        proposalRequestsCount: 0,
        proposalRequestsNeeded: 0,
        proposals: [],
        password: '',
        gridLeaper: false,
        //simple: false,
        canvas: undefined,
        canvasmini: undefined,
        canvascopy: undefined,
        img: undefined,
        ctx: undefined,
        imgmini: undefined,
        ctxmini: undefined,
        imgcopy: undefined,
        ctxcopy: undefined,
        init: function () {
            TRI_Frontend.canvas = document.getElementById('myCanvas');
            TRI_Frontend.canvasmini = document.getElementById('myCanvasmini');
            TRI_Frontend.canvascopy = document.getElementById('myCanvascopy');
            TRI_Frontend.img = new Image();
            TRI_Frontend.imgmini = new Image();
            TRI_Frontend.imgcopy = new Image();
            TRI_Frontend.ctx = TRI_Frontend.canvas.getContext('2d');
            TRI_Frontend.ctxmini = TRI_Frontend.canvasmini.getContext('2d');
            TRI_Frontend.ctxcopy = TRI_Frontend.canvascopy.getContext('2d');
            TRI_Frontend.canvasmini.style.width = '26%';
            TRI_Frontend.canvasmini.style.height = '24%';
            // ...then set the internal size to match
            TRI_Frontend.canvasmini.width = TRI_Frontend.canvasmini.offsetWidth;
            TRI_Frontend.canvasmini.height = TRI_Frontend.canvasmini.offsetHeight;

            TRI_Frontend.canvascopy.style.width = '70%';
            TRI_Frontend.canvascopy.style.height = '70%';
            // ...then set the internal size to match
            TRI_Frontend.canvascopy.width = TRI_Frontend.canvascopy.offsetWidth;
            TRI_Frontend.canvascopy.height = TRI_Frontend.canvascopy.offsetHeight;

            TRI_Frontend.canvas.style.width = '100%';
            TRI_Frontend.canvas.style.height = '100%';
            // ...then set the internal size to match
            TRI_Frontend.canvas.width = TRI_Frontend.canvas.offsetWidth;
            TRI_Frontend.canvas.height = TRI_Frontend.canvas.offsetHeight;

            $("#myCanvas,#myCanvasmini,#myCanvascopy,#cutCanvas,#cas").on("touchstart mousedown", function (e) {
                TRI_Frontend.VisControlConnector.onDown(e);
            });

            $("#myCanvas,#myCanvasmini,#myCanvascopy,#cas").on("touchmove mousemove", function (e) {
                TRI_Frontend.VisControlConnector.onMove(e);
                $("#cutxCanvas,#cutyCanvas").hide();
                $("#cutxCanvas,#cutyCanvas").css({
                    display: "none"
                });
            });
            $("#myCanvas,#myCanvasmini,#myCanvascopy,#cas").on("touchend mouseup", function (e) {
                TRI_Frontend.VisControlConnector.onUp(e);
            });
            $("#myCanvas,#myCanvasmini,#myCanvascopy,#cas").on("keydown", function (e) {
                TRI_Frontend.VisControlConnector.onKeydown(e);
            });

            // window.addEventListener('keydown', TRI_Frontend.VisControlConnector.onKeydown(e), true);
            //$("#myCanvas,#myCanvasmini,#myCanvascopy,#cas").addEventListener('keydown', TRI_Frontend.VisControlConnector.onKeydown(e),true);
            $("#myCanvas,#myCanvasmini,#myCanvascopy,#cas").focus();
        },

        connectLeaper: function () {
            TRI_Frontend.gridLeaper = true;
            //TRI_Frontend.simple = true;
            TRI_Frontend.connect();
        },

        connect: function () {
            "use strict";
            /*
                    canvas.width = $("#x_res").val();
                    canvas.height = $("#y_res").val();
                    canvasmini.width = $("#x_res").val();
                    canvasmini.height = $("#y_res").val();
                    canvascopy.width = $("#x_res").val();
                    canvascopy.height = $("#y_res").val();
            */

            if (!TRI_Frontend.dataSelected) {
                $("#div_connect_failure").fadeIn('slow', 'please select a dataset first');
            } else {
                TRI_Frontend.NodeConnector.initWS();
                //TRI_Frontend.password = $("#connect_password").val();
            }
        },


        buildApplicationList: function () {
            //clear list
            $("#panel_requirements").hide();

            TRI_Frontend.slideCount = 0;
            var slides = $("#carousel_slides").children();
            slides[0].classList.add("active");
            var indicators = $("#carousel_indicators").children();
            indicators[0].classList.add("active");
            for (var i = 1; i < slides.length; i++) {
                slides[i].remove();
                indicators[i].remove();
            }

            var applicationsArray = ["bla", "blub"];
            console.log("Building applicatons list "); + image;

            var imgpath = "zfSxjxFK/imagevis-body.png";
            TRI_Frontend.addApplicationSlide("CT", "UVF data", imgpath);

            imgpath = "NMDPgdyB/bonsai.png";
            TRI_Frontend.addApplicationSlide("bonsai", "tiny bonsai tree", imgpath);

            imgpath = "Qt80ncfP/imagevis-fractal-back.png";
            TRI_Frontend.addApplicationSlide("fractal", "analytical data", imgpath);

            imgpath = "76KmvbcL/meshkov.png";
            TRI_Frontend.addApplicationSlide("instability simulation", "Richtmeyer-Meshkov", imgpath);

            $("#apps").show();
            window.scrollTo(0, document.body.scrollHeight);

        },

        getApplicationList: function () {
            var list = [],
                imgUrl = "https://i.postimg.cc/",
                imgPath = "";

            TRI_Frontend.slideCount = 0;

            imgPath = "zfSxjxFK/imagevis-body.png";
            list[TRI_Frontend.slideCount] = {
                src: imgUrl + imgPath,
                altText: 'CT - UVF data',
                caption: 'UVF data',
                header: 'CT'
            };
            TRI_Frontend.slideCount++;

            imgPath = "NMDPgdyB/bonsai.png";
            list[TRI_Frontend.slideCount] = {
                src: imgUrl + imgPath,
                altText: 'bonsai - tiny bonsai tree',
                caption: 'tiny bonsai tree',
                header: 'bonsai'
            };
            TRI_Frontend.slideCount++;

            imgPath = "Qt80ncfP/imagevis-fractal-back.png";
            list[TRI_Frontend.slideCount] = {
                src: imgUrl + imgPath,
                altText: 'fractal - analytical data',
                caption: 'analytical data',
                header: 'fractal'
            };
            TRI_Frontend.slideCount++;

            imgPath = "76KmvbcL/meshkov.png";
            list[TRI_Frontend.slideCount] = {
                src: imgUrl + imgPath,
                altText: 'instability simulation - Richtmeyer-Meshkov',
                caption: 'Richtmeyer-Meshkov',
                header: 'instability simulation'
            };
            TRI_Frontend.slideCount++;

            return list;
        },

        hideConnectMessage: function () {
            TRI_Frontend.connectFadeoutTimeout = setTimeout(function () {
                    $("#div_connect_success").fadeOut('slow');
                    $("#div_connect_failure").fadeOut('slow');
                },
                5000
            );

        },

        addApplicationSlide: function (name, description, image) {
            // WORKAROUND for Bootstrap Carousel
            // First slide needs "active" as additional class and needs to be present during webpage generation -> keep it in html and modify first item
            if (TRI_Frontend.slideCount == 0) {
                $("#carousel_slides").find("h1")[0].innerHTML = name;
                $("#carousel_slides").find("p")[0].innerHTML = description;
                $("#carousel_slides").find("img")[0].src = "https://i.postimg.cc/" + image;


                var linknode = $("#carousel_slides").find("a")[0];
                linknode.setAttribute("onclick", "TRI_Frontend.applicationSelected('" + name + "','" + description + "')");
            } else {
                var parameterString = "\"" + name + "\",\"" + description + "\"";
                //TODO: Insert correct image
                $("#carousel_slides").append("<div class='item'> \
                    <img id='bigscreen' src='https://i.postimg.cc/" + image + "' alt='Chania'> \
                    <style>    \
                     #bigscreen{\
                     cursor: pointer;\
                     transition: all 3.9s;\
                     }\
                     #bigscreen:hover{\
                     transform: scale(1.2); }       \
                     </style>\
                                    <div class='container'> \
                                        <div class='carousel-caption'> \
                                            <h1>" + name + "</h1> <p>" + description + "</p> <p> \
                            <a class='btn btn-lg btn-danger' role='button' href='#render start' onclick='TRI_Frontend.applicationSelected(" + parameterString + ")'>Select</a></p> \
                        </div> \
                    </div> \
                </div>");
                $("#carousel_indicators").append("<li data-target='#applicationCarousel' data-slide-to='" + TRI_Frontend.slideCount + "'></li>");
            }

            TRI_Frontend.slideCount++;
        },

        applicationSelected: function (name, description) {

            TRI_Frontend.dataSelected = true;

            if (name == "CT") {
                TRI_Frontend.datasetName = "UVFData@./WholeBody-SCANLINE-132-lz4.uvf";
            }

            if (name == "bonsai") {
                TRI_Frontend.datasetName = "UVFData@./Bonsai-SCANLINE-132-lz4.uvf";
            }

            if (name == "fractal") {
                TRI_Frontend.datasetName = "UVFData@./Mandelbulb1k-SCANLINE-132-lz4.uvf";
            }


            if (name == "instability simulation") {
                TRI_Frontend.datasetName = "UVFData@./RichtmyerMeshkov-SCANLINE-132-lz4.uvf";
            }

            console.log("selected dataset " + name, TRI_Frontend.datasetName);
            //empty requirements, reset requirements row counter and disable start ui button
            /*
         $("#panel_requirements").hide();
         MUI_MasterUI.requirementPanelCount = 0;
         $("#container_requirements").empty();
         $('#btnStartUI').prop('disabled', true);
         MUI_MasterUI.proposalRequestsCount = 0;
         MUI_MasterUI.proposalRequestsNeeded = 0;
         MUI_MasterUI.proposals = [];
    
         //send Requirements request
         MUI_MasterUI.selectedApplicationName = name;
         MUI_MasterUI.selectedApplicationDescription = description;
    
         if (MUI_MasterUI.applicationTypes)
         {
             for (var i = 0; i<MUI_MasterUI.applicationTypes.length; i++)
             {
                 if (MUI_MasterUI.applicationTypes[i].id == MUI_MasterUI.selectedApplicationName)
                 {
                     console.log("Building requirements list");
                     //query proposals
                     MUI_MasterUI.queryMuiProposals(MUI_MasterUI.applicationTypes[i].requirements, MUI_MasterUI.selectedApplicationDescription);
                     //MUI_MasterUI.buildRequirementList(MUI_MasterUI.applicationTypes[i].requirements);
                     break;
                 }
             }
         }*/
        },


        hidePanel: function () {
            TRI_Frontend.connectFadeoutTimeout = setTimeout(function () {

                    $("#connect_panel").fadeOut('fast');
                },
                500
            );

        },



        setBgColor: function () {


        }






    };
























    // NodeConnector handles the WS connection and defines the behaviour
    TRI_Frontend.NodeConnector = (function () {

        var messageDict = undefined;
        var parameterDict = undefined;
        var websocket = undefined;


        return {
            wsUri: "",


            initWS: function () {
                console.log("Initializing Websocket Connection");
                //messageDict = new TRI_Frontend.Dictionary();
                //parameterDict = new TRI_Frontend.Dictionary();
                TRI_Frontend.NodeConnector.wsUri =
                    "ws://" + TRI_Frontend.procIP + ":" + TRI_Frontend.procPort + "/";

                websocket = new WebSocket(TRI_Frontend.NodeConnector.wsUri);
                websocket.onopen = function (evt) {
                    TRI_Frontend.NodeConnector.onOpen(evt)
                };
                websocket.onclose = function (evt) {
                    TRI_Frontend.NodeConnector.onClose(evt)
                };
                websocket.onmessage = function (evt) {
                    TRI_Frontend.NodeConnector.onMessage(evt)
                };
                websocket.onerror = function (evt) {
                    TRI_Frontend.NodeConnector.onError(evt)
                };

            },

            onOpen: function (evt) {
                console.log("Websocket CONNECTED to " + TRI_Frontend.NodeConnector.wsUri);
                $("#div_connect_success").fadeIn('slow', TRI_Frontend.hidePanel);
                console.log("sending init renderer request");
                TRI_Frontend.NodeConnector.sendRequest("InitRenderer");
                console.log("done sending init renderer request");
            },

            onClose: function (evt) {
                console.log("Websocket DISCONNECTED");
            },

            onMessage: function (evt) {
                //console.log("message");
                //console.log(evt.data);

                var messageResult = {};

                try {
                    messageResult = JSON.parse(evt.data);
                } catch (error) {
                    console.log("ERROR: Error while parsing Message response to JSON")
                }
                console.log("result:");
                console.log(messageResult);
                console.log(messageResult.rep.params);


                if (messageResult.rep.params !== undefined) {
                    TRI_Frontend.StreamConnector.initWS(messageResult.rep.params.visport);

                    TRI_Frontend.VisControlConnector.initWS(messageResult.rep.params.controlport);
                }
            },

            onError: function (evt) {
                console.log("Websocket Error: " + evt.data);
                $("#div_connect_failure").fadeIn('slow', TRI_Frontend.hideConnectMessage);
            },

            doSend: function (message) {
                console.log("Sent from nodeconnector: " + message);
                websocket.send(message);
            },

            sendRequest: function (requestType, parameter) {
                var requestTypes = ["InitRenderer"];
                if (requestTypes.indexOf(requestType) !== -1) {
                    // look like type: InitRenderer; rid: 1; sid: 0; params: { protocol: tcp.prefixed; rendertype: SimpleRenderer; fileid: FractalData@3; ioendpoint: tcp.prefixed:127.0.0.1:6678; streamingparams: { xres: 800; yres: 600 } }
                    console.log("Sending: " + requestType);
                    var ioString = "" + TRI_Frontend.ioIP + ":" + TRI_Frontend.ioPort;
                    console.log("io endpoint: " + ioString);

                    if (TRI_Frontend.gridLeaper) {
                        TRI_Frontend.NodeConnector.doSend('{"type": "InitRenderer",  "req": { "rid": 1, "sid": 0, "params": { "protocol": "tcp.ws", "rendertype": "GridLeapingRenderer", "fileid": "' + TRI_Frontend.datasetName + '", "ioendpoint": "tcp.prefixed:' + ioString + '", "streamingparams": { "xres": ' + TRI_Frontend.xRes + ', "yres": ' + TRI_Frontend.yRes + ' } } } }');
                    } else {

                        TRI_Frontend.NodeConnector.doSend('{"type": "InitRenderer",  "req": { "rid": 1, "sid": 0, "params": { "protocol": "tcp.ws", "rendertype": "SimpleRenderer", "fileid": "' + TRI_Frontend.datasetName + '", "ioendpoint": "tcp.prefixed:' + ioString + '", "streamingparams": { "xres": ' + TRI_Frontend.xRes + ', "yres": ' + TRI_Frontend.yRes + ' } } } }');
                        //TRI_Frontend.NodeConnector.doSend('{"type": "InitRenderer",  "req": { "rid": 1, "sid": 0, "params": { "protocol": "tcp.ws", "rendertype": "SimpleRenderer", "fileid": "'+ TRI_Frontend.datasetName + '", "ioendpoint": "tcp.prefixed:'  + ioString + '", "streamingparams": { "xres": 100, "yres": 100 } } } }');


                        //TRI_Frontend.NodeConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "GetBackgroundColors" }');

                    }

                    TRI_Frontend.gridLeaper = false;
                    //else{

                    // TRI_Frontend.NodeConnector.doSend('{"type": "InitRenderer",  "req": { "rid": 1, "sid": 0, "params": { "protocol": "tcp.ws", "rendertype": "SimpleRenderer", "fileid": "'+ TRI_Frontend.datasetName + '", "ioendpoint": "tcp.prefixed:'  + ioString + '", "streamingparams": { "xres": ' + $("#x_res").val() + ', "yres": ' + $("#y_res").val() + ' } } } }');

                    //}



                }

            }
        };

    })();



    // NodeConnector handles the WS connection and defines the behaviour
    TRI_Frontend.VisControlConnector = (function () {
        "use strict";
        var websocketControl = undefined;
        var port = undefined;
        var righttime = undefined;
        var lefttime = undefined;
        var setSetUserViewMatrixNeeded = true;
        var lastX = undefined;
        var lastY = undefined;
        var isRotating = false;
        var deltaX = 0.0;
        var deltaY = 0.0;
        var stoppedSending = false;
        var rotMode = true;
        var zoomCounter = 0;
        var zoomOutNeeded = true;
        var currentTF = 0;
        var tfCount = 0;
        var resetCameraNeeded = true;
        var resetSceneNeeded = true;
        var changeBgNeeded = true;
        var getBgcolorNeeded = true;
        var isovalue = 0.0;
        var enableClipping = true;
        var slideminx = 0.0;
        var slidemaxx = 400;
        var slideminy = 0.0;
        var slidemaxy = 400;
        var slideminz = 0.0;
        var slidemaxz = 400;
        var clippz = 0.0;
        var light_ambient = {
            "w": 25,
            "x": 25,
            "y": 25,
            "z": 255
        };
        var light_diffuse = {
            "w": 255,
            "x": 255,
            "y": 255,
            "z": 255
        };
        var light_specular = {
            "w": 255,
            "x": 255,
            "y": 255,
            "z": 255
        };
        var lightx = 0.0;
        var lighty = 0.0;
        var lightz = -1.0;
        var bgColorSet1 = {
            "x": 0,
            "y": 0,
            "z": 0
        };
        var bgColorSet2 = {
            "x": 0,
            "y": 0,
            "z": 0
        };
        var value_tran_num = 1 / 2560;
        var color_tran_num = 1 / 256;
        var enableLightning = true;
        var checkState = false;
        var setIsovalueNeeded = true;
        var setBoundingBoxNeeded = true;
        var setRescaleSceneNeeded = true;
        var scalevalue = 0.0;
        var clearViewPositionNeeded = true;
        return {

            controlConnectionUri: "",




            onMove: function (e) {

                if (isRotating) {
                    //calculate deltas. mouse movement to the right and up is positive




                    if (e.type == "touchmove") {
                        deltaX = e.originalEvent.touches[0].pageX - lastX;
                        deltaY = lastY - e.originalEvent.touches[0].pageY;

                        lastX = e.originalEvent.touches[0].pageX;
                        lastY = e.originalEvent.touches[0].pageY;
                        console.log("rotating touchmove deltax:" + deltaX + ",detlay:" + deltaY + ",lastx:" + lastX + ",lasty:" + lastY);
                        $("#cutxCanvas,#cutyCanvas").hide();
                        $("#cutxCanvas,#cutyCanvas").css({
                            display: "none"
                        });
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
                        deltaX += e.clientX - lastX;
                        deltaY += lastY - e.clientY;
                        lastX = e.clientX;
                        lastY = e.clientY;
                        console.log("else deltax:" + deltaX + ",detlay:" + deltaY + ",lastx:" + lastX + ",lasty:" + lastY);

                    }


                    //buildSendMessage(deltaX,deltaY,0);
                    if (stoppedSending) {
                        stoppedSending = false;
                        TRI_Frontend.VisControlConnector.sendRotation();

                    }
                }

            },



            onKeydown: function (e) {



                var e = event || window.event || arguments.callee.caller.arguments[0];

                if (e && e.keyCode == 40) { //下

                    deltaX += 0;
                    deltaY += -5;
                    TRI_Frontend.VisControlConnector.sendRotation();


                }
                if (e && e.keyCode == 37) { //左
                    deltaX += -5;
                    deltaY += 0;
                    TRI_Frontend.VisControlConnector.sendRotation();
                }
                if (e && e.keyCode == 39) { //右
                    deltaX += 5;
                    deltaY += 0;
                    TRI_Frontend.VisControlConnector.sendRotation();
                }
                if (e && e.keyCode == 38) { // 上
                    deltaX += 0;
                    deltaY += 5;
                    TRI_Frontend.VisControlConnector.sendRotation();
                }






            },



            switchMode: function () {
                //rotMode = !rotMode;
                /*  if (rotMode) {
                      rotMode = false;
                      $("#rotate").text('move mode');
                      //$("#rotate").unfo;
                      document.activeElement.blur();
    
                      console.log("setting text to rotate");
                  } else {
                      rotMode = true;
                      $("#rotate").text('rotation mode');
                      console.log("setting text to move");
                      document.activeElement.blur();
                  }*/

                if ($("#toggle--neon").is(':checked')) {
                    rotMode = false;

                    console.log("setting text to rotate");

                } else {
                    rotMode = true;

                    console.log("setting text to move");
                }





            },

            sendingWasStopped: function () {
                stoppedSending = true;


            },



            prevTF: function () {
                document.activeElement.blur();
                console.log("previous tf");
                currentTF--;
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "GetDefault1DTransferFunctionCountProc" }');
            },

            nextTF: function () {
                document.activeElement.blur();
                console.log("next tf");
                currentTF++;
                TRI_Frontend.VisControlConnector.doSend('{"type": "GetDefault1DTransferFunctionCountProc", "req": {"params" : null, "rid" : 0, "sid" : 0 } }');









            },


            sendTFRequest: function () {
                if (currentTF == tfCount) { // jump to first tf
                    currentTF = 0;
                }
                if (currentTF == -1) { // jump to last tf
                    currentTF = tfCount - 1;
                }

                console.log("requesting tf with index " + currentTF);
                console.log("total amount: " + tfCount);
                TRI_Frontend.VisControlConnector.doSend('{"type": "GetDefault1DTransferFunctionProc", "req": { "rid": 1, "sid": 3, "params": {"index":' + currentTF + '} } }');
            },

            zoomIn: function () {
                zoomOutNeeded = false;
                document.activeElement.blur();
                zoomCounter = 20;
                TRI_Frontend.VisControlConnector.sendZoomIn();


            },

            needsZoom: function () {
                if (zoomCounter != 0) {
                    return true;
                } else {
                    return false;
                }
            },

            needsZoomOut: function () {
                return zoomOutNeeded;
            },

            zoomOut: function () {
                zoomOutNeeded = true;
                document.activeElement.blur();
                zoomCounter = 20;
                TRI_Frontend.VisControlConnector.sendZoomOut(); //zoom out is getting smaller



            },

            sendZoomIn: function () {
                zoomCounter--;
                if (zoomCounter > 0) {

                    TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"zoom": 1.007},"rid":108,"sid":1},"type":"ZoomCamera"}');
                }
            },

            sendZoomOut: function () {
                zoomCounter--;
                if (zoomCounter > 0) {
                    TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"zoom": 0.993},"rid":108,"sid":1},"type":"ZoomCamera"}');
                }
            },



            resetCamera: function () {
                resetCameraNeeded = true;
                TRI_Frontend.VisControlConnector.sendResetCamera();
            },

            needsResetCamera: function () {
                return resetCameraNeeded;
            },
            sendResetCamera: function () {
                TRI_Frontend.VisControlConnector.doSend('{"type": "ResetCamera", "req": { "rid": 0, "sid": 0, "params": {} } }');

            },


            resetScene: function () {
                resetSceneNeeded = true;
                TRI_Frontend.VisControlConnector.sendResetScene();
                TRI_Frontend.VisControlConnector.sendResetCamera();
            },

            needsResetScene: function () {
                return resetSceneNeeded;
            },
            sendResetScene: function () {

                if (name == "CT") {
                    TRI_Frontend.datasetName = "UVFData@./WholeBody-SCANLINE-132-lz4.uvf";
                }

                if (name == "bonsai") {
                    TRI_Frontend.datasetName = "UVFData@./Bonsai-SCANLINE-132-lz4.uvf";
                }

                if (name == "fractal") {
                    TRI_Frontend.datasetName = "UVFData@./Mandelbulb1k-SCANLINE-132-lz4.uvf";
                }


                if (name == "instability simulation") {
                    TRI_Frontend.datasetName = "UVFData@./RichtmyerMeshkov-SCANLINE-132-lz4.uvf";
                }
                var ioString = "" + TRI_Frontend.ioIP + ":" + TRI_Frontend.ioPort;

                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "ResetScene" }');
                TRI_Frontend.NodeConnector.doSend('{"type": "InitRenderer",  "req": { "rid": 1, "sid": 0, "params": { "protocol": "tcp.ws", "rendertype": "SimpleRenderer", "fileid": "' + TRI_Frontend.datasetName + '", "ioendpoint": "tcp.prefixed:localhost:6678", "streamingparams": { "xres": ' + TRI_Frontend.xRes + ', "yres": ' + TRI_Frontend.yRes + ' } } } }');

            },




            invert: function () {

                $("input[type='checkbox'].invert").each(function () {
                    $(this).prop("checked", !this.checked);
                });


            },





            Set1DTransferFunction: function () {
                setBoundingBoxNeeded = true;


                var x = $("#func-1d-x")[0].value;
                var y = $("#func-1d-y")[0].value;
                var color = "";
                var checked = $('input[type=checkbox]:checked.invert');
                checked.each(function () {
                    var isCheck = this.value;
                    color += isCheck + ",";
                });
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "GetDefault1DTransferFunctionCountProc" }');

                TRI_Frontend.VisControlConnector.send1DTransferFunction();
                TRI_Frontend.VisControlConnector.sendTFRequest();


            },

            needs1DTransferFunction: function () {
                return setBoundingBoxNeeded;
            },
            send1DTransferFunction: function () {

                //TRI_Frontend.NodeConnector.doSend('{ "req" : { "params" : { "tf" : { "colorData" : [255,0,0,0], "vValueBBox" : { "x" : 1, "y" : 0 } } }, "rid" : 0, "sid" : 0 }, "type" : "Set1DTransferFunction" }');
                TRI_Frontend.NodeConnector.doSend('{ "req" : { "params" : { "tf" : { "colorData" : [1,0,1,0], "vValueBBox" : { "x" : 0, "y" : 1 } } }, "rid" : 0, "sid" : 0 }, "type" : "Set1DTransferFunction" }')



            },







            setBoundingBox: function () {
                setBoundingBoxNeeded = true;
                TRI_Frontend.VisControlConnector.sendBoundingBox();

            },

            needsBoundingBox: function () {
                return setBoundingBoxNeeded;
            },
            sendBoundingBox: function () {
                TRI_Frontend.NodeConnector.doSend(' { "req" : { "params" : { "mode" : "BBM_DATASET" }, "rid" : 0, "sid" : 0 }, "type" : "SetBoundingBoxMode" }');

            },

            setSetUserViewMatrix: function () {
                setSetUserViewMatrixNeeded = true;
                TRI_Frontend.VisControlConnector.sendSetUserViewMatrix();

            },

            needsSetUserViewMatrix: function () {
                return setSetUserViewMatrixNeeded;
            },
            sendSetUserViewMatrix: function () {
                TRI_Frontend.NodeConnector.doSend(' { "req" : { "params" : { "m" : { "m11" : 1, "m12" : 1, "m13" : 1, "m14" : 1, "m21" : 1, "m22" : 1, "m23" : 1, "m24" : 1, "m31" : 1, "m32" : 1, "m33" : 1, "m34" : 1, "m41" : 1, "m42" : 1, "m43" : 1, "m44" : 1 } }, "rid" : 0, "sid" : 0 }, "type" : "SetUserViewMatrix" }');

            },


            setRescaleScene: function () {

                setRescaleSceneNeeded = true;


                scalevalue = $("#amount-rescale")[0].value;

                setInterval(function () {
                    $("#show-amount-rescale").text($("#amount-rescale").val());

                }, 0.01)


                TRI_Frontend.VisControlConnector.sendRescaleScene();


            },

            needsRescaleScene: function () {
                return setRescaleSceneNeeded;
            },
            sendRescaleScene: function () {
                TRI_Frontend.NodeConnector.doSend('{ "req" : { "params" : { "scale" : ' + scalevalue + ' }, "rid" : 0, "sid" : 0 }, "type" : "RescaleScene" }');

            },


            clearViewPosition: function () {
                clearViewPositionNeeded = true;

                TRI_Frontend.VisControlConnector.sendclearViewPosition();
            },

            needsClearViewPosition: function () {
                return clearViewPositionNeeded;
            },
            sendclearViewPosition: function () {

                console.log("vNormalizedWindowPos : { x : 0.5, y : 0.5 } }");
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "vNormalizedWindowPos" : { "x" : 0.5, "y" : 0.5 } }, "rid" : 0, "sid" : 0 }, "type" : "SetClearViewPosition" }');

            },



            guidance: function () {

                (function ($) {
                    $.guidance = function (json, fn) {
                        //json.obj  设置跟随对象		必选参数
                        //json.title 设置提示消息		必选参数
                        //json.url  设置下一步链接		可选参数
                        //json.style 定义样式		可选参数  默认有背景
                        json.url = json.url || "javascript:;";
                        json.style = json.style || {};
                        json.title = json.title || 'trinity guidance';
                        json.style.bgImg = json.style.bgImg || "url(img/questionmark.png)";
                        json.style.point1 = json.style.point1 || 'url(img/pointer.png)';
                        json.style.point2 = json.style.point2 || 'url(img/pointer2.png)';
                        var index = 0;
                        if (json.obj.length > 0) {
                            window.closeAll = function () {
                                $('#maskBg').remove();
                                window.closeAll = null;
                            }
                            var $viewG = $('<div id="maskBg">\
                    <div id="mask"></div>\
                    <div id="maskTitle">\
                        <div id="pointer"></div>\
                        <div id="mianWarn">\
                            <p id="warnData"></p>\
                            <a href="javascript:;" id="nextStep">next</a>\
                            <a href="javascript:;" id="outPointer" onclick = "closeAll()">exit</a>\
                            <a href="javascript:;" id="closeMaskWarn" onclick = "closeAll ()">×</a>\
                        </div>\
                    </div>\
                </div>');
                            var viewW = $(document.body).width();
                            var viewH = $(document.body).height();
                            $viewG.css({
                                'height': viewH + 'px',
                                'width': viewW + 'px'
                            });
                            if ($('#maskBg').length <= 0) {
                                $(document.body).append($viewG);
                                $('#warnData').css('background-image', json.style.bgImg);

                            }

                            function mainWarn(posObj) {
                                var iW = posObj.innerWidth();
                                var iH = posObj.innerHeight();
                                var iL = posObj.offset().left;
                                var iT = posObj.offset().top;
                                $('#mask').css({
                                    'width': iW + 'px',
                                    'height': iH + 'px',
                                    'border-width': iT + 'px' + ' ' + (viewW - iL - iW) + 'px' + ' ' + (viewH - iH - iT) + 'px' + ' ' + iL + 'px'
                                });
                                if (iL < 400) {
                                    $('#maskTitle').css({
                                        'left': iL + iW - 30 + 'px',
                                        'top': iT + iH + 10 + 'px'
                                    });
                                    $('#pointer').css('background-image', json.style.point1);
                                } else if ((viewW - iL - iW) < 400) {
                                    $('#maskTitle').css({
                                        'left': iL - 400 + 'px',
                                        'top': iT + iH + 10 + 'px'
                                    });
                                    $('#pointer').css('background-image', json.style.point2);
                                } else {
                                    $('#maskTitle').css({
                                        'left': iL + iW - 30 + 'px',
                                        'top': iT + iH + 10 + 'px'
                                    });
                                    $('#pointer').css('background-image', json.style.point1);
                                }

                            }
                            if ($.isArray(json.obj)) {
                                mainWarn(json.obj[index]);
                                $('#warnData').text(json.title[index]);
                                $('#nextStep').bind('click', function () {

                                    index++;
                                    if (index == json.obj.length) {
                                        closeAll();
                                        return;
                                    }
                                    mainWarn(json.obj[index]);
                                    $('#warnData').text(json.title[index]);
                                });
                            } else {
                                mainWarn(json.obj);
                                $('#warnData').text(json.title);
                                if (fn) {
                                    $('#nextStep').bind('click', fn);
                                } else {
                                    $('#nextStep').bind('click', function () {
                                        closeAll();
                                    });
                                }

                            }
                        }
                    }
                })(jQuery);


                $(function () {
                    var arrObj = [$('#toggle--neonlabel'), $('#navguidance'), $('#myCanvas'), $('#foldnavguidance')];
                    var arrTitle = ['click to change rotate or move modle ', 'this is function tools, click to open parameter editor', 'use your mouse to drag model here', 'click here to open mini tool bar'];
                    $.guidance({
                        obj: arrObj,
                        title: arrTitle
                    });
                });


            },


            cutVolume: function () {


                $("#slider-range-x").slider({
                    range: true,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    values: [0.0, 1.0],
                    slide: function (event, ui) {
                        $("#amount-x").val(+ui.values[0] + " - " + ui.values[1]);

                        slideminx = 400 * (ui.values[0]);
                        slidemaxx = 400 * (ui.values[1]);

                        console.log("slideminx:" + slideminx);
                        var cutcanvas = document.getElementById("cutxCanvas");
                        var context = cutcanvas.getContext("2d");

                        function drawHorizontalLine(y) {
                            context.beginPath();
                            //context.rect(0,0,cutcanvas.width,y);
                            context.moveTo(0, y);
                            context.lineTo(cutcanvas.width, y);
                            context.stroke();
                            context.strokeStyle = "red";
                            context.closePath();
                        }

                        function drawVerticalLine(x) {
                            context.beginPath();
                            //context.rect(x,0,x,cutcanvas.height);
                            context.moveTo(x, 0);
                            context.lineTo(x, cutcanvas.height);
                            context.stroke();
                            context.strokeStyle = "red";
                            context.closePath();
                        }

                        context.clearRect(0, 0, cutcanvas.width, cutcanvas.height);
                        drawVerticalLine(slidemaxx);
                        drawVerticalLine(slideminx);
                        //drawVerticalLine(location.x);
                        console.log("slideminx:" + slideminx);
                        console.log("slidemaxx:" + slidemaxx);
                        enableClipping = true;

                        TRI_Frontend.VisControlConnector.sendClipping();

                        TRI_Frontend.VisControlConnector.setClipVolume();


                    },

                });

                $("#amount-x").val(+$("#slider-range-x").slider("values", 0) +
                    " - " + $("#slider-range-x").slider("values", 1));



                $("#slider-range-y").slider({
                    //orientation: "vertical",
                    range: true,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    values: [0.0, 1.0],
                    slide: function (event, ui) {
                        $("#amount-y").val(+ui.values[0] + " - " + ui.values[1]);
                        console.log("value:" + ui.values[0]);
                        slideminy = 400 * (ui.values[0]);
                        slidemaxy = 400 * (ui.values[1]);

                        console.log("slideminy:" + slideminy);
                        var cutcanvas = document.getElementById("cutyCanvas");
                        var context = cutcanvas.getContext("2d");

                        function drawHorizontalLine(y) {
                            context.beginPath();
                            //context.rect(0,0,cutcanvas.width,y);
                            context.moveTo(0, y);
                            context.lineTo(cutcanvas.width, y);
                            context.stroke();
                            context.strokeStyle = "red";
                            context.closePath();
                        }

                        function drawVerticalLine(x) {
                            context.beginPath();
                            //context.rect(x,0,x,cutcanvas.height);
                            context.moveTo(x, 0);
                            context.lineTo(x, cutcanvas.height);
                            context.stroke();
                            context.strokeStyle = "red";
                            context.closePath();
                        }



                        context.clearRect(0, 0, cutcanvas.width, cutcanvas.height);
                        drawHorizontalLine(400 - slidemaxy);
                        drawHorizontalLine(400 - slideminy);

                        //drawVerticalLine(location.x);
                        console.log("drawslideminy:" + slideminy);
                        console.log("drawslidemaxy:" + slidemaxy);


                        enableClipping = true;

                        TRI_Frontend.VisControlConnector.sendClipping();

                        TRI_Frontend.VisControlConnector.setClipVolume();
                    }
                });
                $("#amount-y").val(+$("#slider-range-y").slider("values", 0) +
                    " - " + $("#slider-range-y").slider("values", 1));




                $("#slider-range-z").slider({
                    range: true,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    values: [0.0, 1.0],
                    slide: function (event, ui) {
                        $("#amount-z").val(+ui.values[0] + " - " + ui.values[1]);

                        slideminz = 400 * (ui.values[0]);
                        slidemaxz = 400 * (ui.values[1]);


                        console.log("slideminz:" + slideminz);
                        console.log("slidemaxz:" + slidemaxz);
                        enableClipping = true;

                        TRI_Frontend.VisControlConnector.sendClipping();

                        TRI_Frontend.VisControlConnector.setClipVolume();


                    },

                });

                $("#amount-z").val(+$("#slider-range-z").slider("values", 0) +
                    " - " + $("#slider-range-z").slider("values", 1));


            },



            enableClipp: function () {


                if ($("#onoffswitch").is(':checked')) {
                    console.log("enable clipping");
                    enableClipping = true;

                    //if(clippxmax>clippxmin&&clippymax>clippymin){
                    TRI_Frontend.VisControlConnector.sendClipping();

                    TRI_Frontend.VisControlConnector.setClipVolume();
                    //}
                    //else {
                    //  alert("error!");
                    //}

                } else {
                    console.log("clipping not allowed");
                    enableClipping = false;
                }



            },
            needsClipping: function () {
                return enableClipping;
            },
            setClipVolume: function () {


                //TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "maxValues" : { "x" : '+ (0.03+slidemaxx/400)+', "y" : '+ (1.04-slidemaxy/400)+', "z" : 0.7}, "minValues" : { "x" : '+ (-0.1+slideminx/400)+', "y" :'+ (0.9-slideminy/400)+', "z" : 0 } }, "rid" : 0, "sid" : 0 }, "type" : "SetClipVolume" }');
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "maxValues" : { "x" : ' + (slidemaxx / 400) + ', "y" : ' + (slidemaxy / 400) + ', "z" : ' + (slidemaxz / 400) + '}, "minValues" : { "x" : ' + (slideminx / 400) + ', "y" :' + (slideminy / 400) + ', "z" : ' + (slideminz / 400) + ' } }, "rid" : 0, "sid" : 0 }, "type" : "SetClipVolume" }');

                console.log("cutmaxx:" + slidemaxx / 400 + "---cutmaxy:" + (slidemaxy / 400) + "--cutmaxz:" + (slidemaxz / 400));
                console.log("cutminx:" + slideminx / 400 + "---cutminy:" + (slideminy / 400) + "--cutminz" + (slideminz / 400));
                //TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "maxValues" : { "x" : 0.5, "y" : 0.5, "z" : 1}, "minValues" : { "x" : 0, "y" : 0, "z" : 0 } }, "rid" : 0, "sid" : 0 }, "type" : "SetClipVolume" }');

                // }

            },
            sendClipping: function () {
                var checkState = "true";
                console.log("clipping state:" + checkState);
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "enable" : ' + checkState + ' }, "rid" : 0, "sid" : 0 }, "type" : "EnableClipping" }');

            },





            Lightning: function () {


                lightx = $("#light-x")[0].value;
                lighty = $("#light-y")[0].value;
                lightz = $("#light-z")[0].value;



                setInterval(function () {
                    $("#show-lightx").text($("#light-x").val());
                    $("#show-lighty").text($("#light-y").val());
                    $("#show-lightz").text($("#light-z").val());
                }, 0.01)



                enableLightning = true;
                checkState = true;
                TRI_Frontend.VisControlConnector.sendLightningDirection();
                TRI_Frontend.VisControlConnector.setLightningDirection();



            },

            LightningColor: function () {


                enableLightning = true;
                checkState = true;


                function hexToRgb(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                }


                var ambient = $("#ambient")[0].value;
                var grb_ambient = hexToRgb(ambient);
                var red_ambient = grb_ambient.r;
                var green_ambient = grb_ambient.g;
                var blue_ambient = grb_ambient.b;
                var opacity_ambient = 25;
                var light_ambient = '{"w":' + opacity_ambient + '",x":' + red_ambient + ',"y":' + green_ambient + ',"z":' + blue_ambient + '}';
                console.log("ambient IS-----" + light_ambient);

                var diffuse = $("#diffuse")[0].value;
                var grb_diffuse = hexToRgb(diffuse);
                var red_diffuse = grb_diffuse.r;
                var green_diffuse = grb_diffuse.g;
                var blue_diffuse = grb_diffuse.b;
                var opacity_diffuse = 255;
                var light_diffuse = '{"w":' + opacity_diffuse + '",x":' + red_diffuse + ',"y":' + green_diffuse + ',"z":' + blue_diffuse + '}';
                console.log("diffuse IS-----" + light_diffuse);

                var specular = $("#highlight")[0].value;
                var grb_specular = hexToRgb(specular);
                var red_specular = grb_specular.r;
                var green_specular = grb_specular.g;
                var blue_specular = grb_specular.b;
                var opacity_specular = 255;
                var light_specular = '{"w":' + opacity_specular + '",x":' + red_specular + ',"y":' + green_specular + ',"z":' + blue_specular + '}';
                console.log("specular IS-----" + light_specular);
                TRI_Frontend.VisControlConnector.sendLightning();
                TRI_Frontend.VisControlConnector.setLightning();

            },

            enableLightning: function () {



                console.log("enable lightning");
                enableLightning = true;
                checkState = true;
                TRI_Frontend.VisControlConnector.sendLightning();
                TRI_Frontend.VisControlConnector.sendLightningDirection();
                TRI_Frontend.VisControlConnector.setLightning();
                TRI_Frontend.VisControlConnector.setLightningDirection();
                //TRI_Frontend.VisControlConnector.setLightning();

            },
            needsLightning: function () {
                return enableLightning;
            },
            setLightning: function () {

                //TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "ambient" :'+ light_ambient+', "diffuse" : '+ light_diffuse+', "specular" : '+ light_specular+' } }, "rid" : 0, "sid" : 0 }, "type" : "SetLightingColors" }');
                //just set one random value directly to test if this command useful
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "ambient" : { "w" : 10, "x" : 10, "y" : 0, "z" : 100 }, "diffuse" : { "w" : 120, "x" : 30, "y" : 40, "z" : 20 }, "specular" : { "w" : 30, "x" : 50, "y" : 200, "z" : 20 } } }, "rid" : 0, "sid" : 0 }, "type" : "SetLightingColors" }');
            },
            sendLightning: function () {
                console.log("lightning state:" + checkState);
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "enable" : ' + checkState + ' }, "rid" : 0, "sid" : 0 }, "type" : "EnableLighting" }');


            },

            needsLightningDirection: function () {
                return enableLightning;
            },
            setLightningDirection: function () {

                //TRI_Frontend.VisControlConnector.doSend(' { "req" : { "params" : { "direction" : { "x" : 0.4, "y" : 0.8, "z" : -0.3 } }, "rid" : 0, "sid" : 0 }, "type" : "SetLightDirection" }');

                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "direction" : { "x" : ' + lightx + ', "y" : ' + lighty + ', "z" : ' + lightz + ' } }, "rid" : 0, "sid" : 0 }, "type" : "SetLightDirection" }');
                //just set one random value directly to test if this command useful
                console.log("lightning direction:x :" + lightx + ", y: " + lighty + ", z : " + lightz);
            },
            sendLightningDirection: function () {
                console.log("lightning state:" + checkState);
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "enable" : ' + checkState + ' }, "rid" : 0, "sid" : 0 }, "type" : "EnableLighting" }');


            },




            isoValue: function () {
                setIsovalueNeeded = true;


                /**$( "#slider-range-iso" ).slider({
                    range: "min",
                    value: 1,
                    min: 0,
                    max: 1,
                    step:0.01,
                    slide: function( event, ui ) {
                        $( "#amount-iso" ).val( " " + ui.value );
                        var slideiso= (ui.value);
    
                        console.log("slideios:"+slideiso);
                        TRI_Frontend.VisControlConnector.sendIsovalue();
                    }
                });
                 $( "#amount-iso" ).val( " " + $( "#slider-range-iso" ).slider( "value" ) );
    
                 **/

                isovalue = $("#amount-iso")[0].value;

                setInterval(function () {
                    $("#show-amount-iso").text($("#amount-iso").val());

                }, 0.01)


                TRI_Frontend.VisControlConnector.sendIsovalue();


            },

            needsSetIsovalue: function () {
                return setIsovalueNeeded;
            },
            sendIsovalue: function () {
                console.log("start setisovalue");
                //Rendering.VisControlConnector.getIsoIndex();
                var surfaceIndex = 0;
                //var isoValue = $("#Iso_value").val();
                //var f_value = isoValue*value_tran_num;
                // var f_value= parseFloat(isoValue);
                console.log("Iso_value is ---------------------- :" + isovalue);
                console.log("surfaceIndex is ---------------------- :" + surfaceIndex);
                //console.log("The float of Iso_value is ---------------------- :"+f_value);
                //console.log("tran_num is ---------------------- :"+value_tran_num);
                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "isovalue" :' + isovalue + ', "surfaceIndex" : 0 }, "rid" : 0, "sid" : 0 }, "type" : "SetIsoValue" }');

            },




            onDown: function (e) {
                e.preventDefault();
                //console.log(e);
                var e = event || window.event || arguments.callee.caller.arguments[0];

                isRotating = true;
                if (e.type == "touchstart" && e.keyCode == 40) {
                    lastX = e.originalEvent.touches[0].pageX;
                    lastY = e.originalEvent.touches[0].pageY;
                    console.log("ondown rotating touchmove lastx:" + lastX + ",lasty:" + lastY);

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
                    lastX = 5;
                    lastY = 0;
                    console.log("keycode 40:" + lastX + ",lasty:" + lastY);
                    //not neccessary for web opened with computer

                } else {
                    lastX = e.clientX;
                    lastY = e.clientY;
                    console.log("ondown else lastx:" + lastX + ",lasty:" + lastY);
                }

            },

            onUp: function (e) {

                isRotating = false;

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
            },



            leftkeymove: function (e) {


                /**  $("#leftmove").toggle(
                 function(){
                        function leftremote(){
                            deltaX += -5;
                            deltaY += 0;
                            console.log("leftmove:"+deltaY +"---"+deltaX );
    
                            TRI_Frontend.VisControlConnector.sendRotation();
                        }
                        setInterval(leftremote,10);
                    },
                 function(){
                        stoppedSending=true;
                    }
                 );**/




                $("#leftmove").on("click", function () {


                    deltaX += -5;
                    deltaY += 0;
                    console.log("leftmove:" + deltaY + "---" + deltaX);

                    TRI_Frontend.VisControlConnector.sendRotation();



                })

            },


            rightkeymove: function (e) {

                $("#rightmove").on("click", function () {


                    deltaX += 5;
                    deltaY += 0;
                    console.log("rightmove:" + deltaY + "---" + deltaX);

                    TRI_Frontend.VisControlConnector.sendRotation();


                })
            },

            upkeymove: function (e) {

                $("#upmove").on("click", function () {

                    deltaX += 0;
                    deltaY += 5;
                    console.log("upmove:" + deltaY + "---" + deltaX);

                    TRI_Frontend.VisControlConnector.sendRotation();
                })
            },
            downkeymove: function (e) {

                $("#downmove").on("click", function () {

                    deltaX += 0;
                    deltaY += -5;
                    console.log("downmove:" + deltaY + "---" + deltaX);

                    TRI_Frontend.VisControlConnector.sendRotation();
                })
            },


            needsRotation: function (e) {

                if (Math.abs(deltaX) < 0.0001 && Math.abs(deltaY) < 0.0001) {
                    return false;
                } else {
                    return true;
                }
            },




            sendRotation: function () {

                if (!TRI_Frontend.VisControlConnector.needsRotation()) {
                    stoppedSending = true;
                } else {

                    if (rotMode) {
                        TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"rotation":{"x": ' + deltaY * (-0.01) + ',"y":' + deltaX * 0.01 + ',"z":0}},"rid":108,"sid":1},"type":"RotateCamera"}');


                        //TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"rotation":{"x": ' + deltaY * (-0.01) + ',"y":' + deltaX * 0.01 + ',"z":0}},"rid":108,"sid":1},"type":"RotateScene"}');
                        console.log("rdeltax:" + deltaY * (-0.01) + "---rdeltay:" + deltaX * 0.01);

                    } else {
                        TRI_Frontend.VisControlConnector.doSend('{"req":{"params":{"direction":{"x": ' + deltaX * (0.001) + ',"y":' + deltaY * 0.001 + ',"z":0}},"rid":108,"sid":1},"type":"MoveCamera"}');
                        console.log("mdeltax''':" + deltaX * (0.001) + "---mdeltay''':" + deltaY * 0.001);
                    }
                    deltaX = 0.0;
                    deltaY = 0.0;
                }

            },



            backgroundColor: function () {

                changeBgNeeded = true;

                var trinityBGR = $("#trinityBGR")[0].value;
                var trinityBGG = $("#trinityBGG")[0].value;
                var trinityBGB = $("#trinityBGB")[0].value;
                var trinityBGRGB = document.getElementById("trinityBGRGB");



                setInterval(function () {
                    $("#show-trinityBGcolorRp").text($("#trinityBGR").val());

                }, 0.01)
                setInterval(function () {
                    $("#show-trinityBGcolorGp").text($("#trinityBGG").val());

                }, 0.01)
                setInterval(function () {
                    $("#show-trinityBGcolorBp").text($("#trinityBGB").val());

                }, 0.01)


                trinityBGRGB.style.backgroundColor = 'rgb(' + trinityBGR + ',' + trinityBGG + ',' + trinityBGB + ')';
                console.log('rgb(' + trinityBGR + ',' + trinityBGG + ',' + trinityBGB + ')');
                TRI_Frontend.VisControlConnector.setBgColor();
            },

            needsChangebgcolor: function () {
                return changeBgNeeded;
            },

            setBgColor: function () {


                TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" :{ "x" : ' + $("#trinityBGR")[0].value + ', "y" : ' + $("#trinityBGG")[0].value + ', "z" : ' + $("#trinityBGB")[0].value + ' }  , "colorTwo" : { "x" : ' + $("#trinityBGR")[0].value + ', "y" : ' + $("#trinityBGG")[0].value + ', "z" : ' + $("#trinityBGB")[0].value + ' }} }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');
                //TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" : '+bgColorSet1+'   , "colorTwo" : '+bgColorSet2+' } }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');

                // TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" :{ "x" : 120, "y" : 20, "z" : 20 }  , "colorTwo" : { "x" : 170, "y" : 20, "z" : 20}} }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');

            },









            initWS: function (controlport) {
                port = controlport;
                console.log("Initializing Vis Control Connection to port " + port);
                //messageDict = new TRI_Frontend.Dictionary();
                //parameterDict = new TRI_Frontend.Dictionary();
                TRI_Frontend.VisControlConnector.controlConnectionUri = "ws://" + TRI_Frontend.procIP + ":" + port + "/";

                websocketControl = new WebSocket(TRI_Frontend.VisControlConnector.controlConnectionUri);
                websocketControl.onopen = function (evt) {
                    TRI_Frontend.VisControlConnector.onOpen(evt)
                };
                websocketControl.onclose = function (evt) {
                    TRI_Frontend.VisControlConnector.onClose(evt)
                };
                websocketControl.onmessage = function (evt) {
                    TRI_Frontend.VisControlConnector.onMessage(evt)
                };
                websocketControl.onerror = function (evt) {
                    TRI_Frontend.VisControlConnector.onError(evt)
                };

            },

            onOpen: function (evt) {
                console.log("Websocket CONNECTED to " + TRI_Frontend.VisControlConnector.controlConnectionUri);
                $("#div_connect_success").fadeIn('slow', TRI_Frontend.hideConnectMessage);
                TRI_Frontend.VisControlConnector.doSend('{"type": "StartRendering", "req": { "rid": 1, "sid": 3, "params": {} } }');



                $("#div_connect_success").fadeIn('slow', TRI_Frontend.hideConnectMessage);

                console.log("done sending init context request");
            },

            onClose: function (evt) {
                console.log("Websocket DISCONNECTED");
            },

            onMessage: function (evt) {
                //console.log("message");
                //console.log(evt.data);

                var messageResult = {};

                try {
                    messageResult = JSON.parse(evt.data);
                    console.log(messageResult);
                    console.log("incoming: " + messageResult.rep.params.result);
                } catch (error) {
                    console.log("ERROR: Error while parsing Message response to JSON")
                }
                console.log("got sth in control channel:");

                if (messageResult.type == "GetDefault1DTransferFunctionCountProc") {
                    tfCount = messageResult.rep.params.result;
                    TRI_Frontend.VisControlConnector.sendTFRequest();
                }

                if (messageResult.type == "GetDefault1DTransferFunctionProc") {
                    TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "index" : 0 }, "rid" : 0, "sid" : 0 }, "type" : "GetDefault1DTransferFunctionProc" }');
                }

                if (messageResult.type == "ResetCamera") {
                    TRI_Frontend.VisControlConnector.sendResetCamera();
                }

                if (messageResult.type == "ResetScene") {
                    TRI_Frontend.VisControlConnector.sendResetScene();
                }

                if (messageResult.type == "SetIsoValue") {

                    TRI_Frontend.VisControlConnector.sendIsovalue();

                }

                if (messageResult.type == "SetIsoValue") {

                    TRI_Frontend.VisControlConnector.sendIsovalue();

                }

                if (messageResult.type == "Set1DTransferFunction") {

                    TRI_Frontend.VisControlConnector.send1DTransferFunction();
                    TRI_Frontend.VisControlConnector.sendTFRequest();
                    TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "index" : 0 }, "rid" : 0, "sid" : 0 }, "type" : "GetDefault1DTransferFunctionProc" }');
                    TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "Get1DHistogramProc" }');


                }

                if (messageResult.type == "Get1DHistogramProc") {


                    TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : null, "rid" : 0, "sid" : 0 }, "type" : "Get1DHistogramProc" }');


                }


                if (messageResult.type == "EnableClipping") {
                    TRI_Frontend.VisControlConnector.sendClipping();
                    TRI_Frontend.VisControlConnector.setClipVolume();
                }


                if (messageResult.type == "EnableLighting") {
                    TRI_Frontend.VisControlConnector.sendLightning();
                    TRI_Frontend.VisControlConnector.setLightning();
                    TRI_Frontend.VisControlConnector.sendLightningDirection();
                }
                if (messageResult.type == "RescaleScene") {
                    TRI_Frontend.VisControlConnector.sendRescaleScene();

                }


                if (messageResult.type == "SetBoundingBoxMode") {
                    TRI_Frontend.VisControlConnector.sendBoundingBox();
                }

                if (messageResult.type == "SetUserViewMatrix") {
                    TRI_Frontend.VisControlConnector.sendSetUserViewMatrix();
                }
                if (messageResult.type == "SetLightDirection") {
                    TRI_Frontend.VisControlConnector.sendLightningDirection();
                }

                if (messageResult.type == "SetLightingColors") {
                    TRI_Frontend.VisControlConnector.sendLightning();
                }
                if (messageResult.type == "SetClearViewPosition") {
                    TRI_Frontend.VisControlConnector.sendclearViewPosition();
                }

                // if (messageResult.type == "SetBackgroundColors") {

                //   TRI_Frontend.VisControlConnector.setBgColor();

                // }



                //if (TRI_Frontend.VisControlConnector.needsRotation()) {

                //console.log("need rot");
                //  TRI_Frontend.VisControlConnector.sendRotation();
                // }

                // else {
                //console.log("refining");
                //    TRI_Frontend.VisControlConnector.doSend('{"type": "ProceedRendering", "req": { "rid": 1, "sid": 3, "params": {} } }');
                //    TRI_Frontend.VisControlConnector.sendingWasStopped();

                // }

                if (messageResult.type == "SetBackgroundColors") {
                    //obj={ "req" : { "params" : { "colors" : { "colorOne" : { "x" : 128, "y" : 20, "z" : 20 }  , "colorTwo" : { "x" : 128, "y" : 70, "z" : 70 }} }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" };
                    //var bgColorSet = JSON.stringify(messageResult.rep.params.result) ;

                    //var red,green,blue = JSON.stringify(obj) ;

                    // console.log("response of GetBgColor is:"+bgColorSet);
                    // console.log("G R B IS-----"+bgColorSet);
                    //  TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" : '+bgColorSet+'   , "colorTwo" : '+bgColorSet+' } }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');
                    //TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" :{ "x" : '+$("#x1").val()+', "y" : '+$("#y1").val()+', "z" : '+$("#z1").val()+' }  , "colorTwo" : { "x" : '+$("#x1").val()+', "y" : '+$("#y1").val()+', "z" : '+$("#z1").val()+' }} }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');


                    // TRI_Frontend.VisControlConnector.getBgColor();
                    TRI_Frontend.VisControlConnector.setBgColor();
                }





            },
            onError: function (evt) {
                console.log("Websocket Error: " + evt.data);
                $("#div_connect_failure").fadeIn('slow', TRI_Frontend.hideConnectMessage);
            },
            doSend: function (message) {
                //console.log("Sent: " + message);
                websocketControl.send(message);
            },


            //sendRequest: function(requestType, parameter) {
            //var requestTypes = ["SetBackgroundColor"];
            //if (requestTypes.indexOf(requestType) != -1) {
            // look like type: InitRenderer; rid: 1; sid: 0; params: { protocol: tcp.prefixed; rendertype: SimpleRenderer; fileid: FractalData@3; ioendpoint: tcp.prefixed:127.0.0.1:6678; streamingparams: { xres: 800; yres: 600 } }
            // console.log("Sending: " + requestType);
            // var colorhere = "" + $("#x1").val() + ":"  + $("#y1").val() +":" +$("#z1").val() +":";
            // console.log("colorbg: " + colorhere);

            // if (TRI_Frontend.setBgColor()) {
            //        TRI_Frontend.VisControlConnector.doSend('{ "req" : { "params" : { "colors" : { "colorOne" :{ "x" : ' + $("#x1").val() + ', "y" : ' + $("#y1").val() + ', "z" : ' + $("#z1").val() + ' }  , "colorTwo" : { "x" : ' + $("#x1").val() + ', "y" : ' + $("#y1").val() + ', "z" : ' + $("#z1").val() + ' }} }, "rid" : 0, "sid" : 0 }, "type" : "SetBackgroundColors" }');


            // }

            // }
            //}




        }
    })();



    // NodeConnector handles the WS connection and defines the behaviour
    TRI_Frontend.StreamConnector = (function () {

        var websocketStream = undefined;
        var port = undefined;
        var rot = 0.0;
        var url = undefined;



        return {
            visConnectionUri: "",

            initWS: function (visport) {
                port = visport;

                //messageDict = new TRI_Frontend.Dictionary();
                //parameterDict = new TRI_Frontend.Dictionary();
                TRI_Frontend.StreamConnector.visConnectionUri = "ws://" + TRI_Frontend.procIP + ":" + port + "/";
                console.log("Initializing Stream Connection to " + TRI_Frontend.StreamConnector.visConnectionUri);
                websocketStream = new WebSocket(TRI_Frontend.StreamConnector.visConnectionUri);
                websocketStream.binaryType = "blob";
                websocketStream.onopen = function (evt) {
                    TRI_Frontend.StreamConnector.onOpen(evt)
                };
                websocketStream.onclose = function (evt) {
                    TRI_Frontend.StreamConnector.onClose(evt)
                };
                websocketStream.onmessage = function (evt) {
                    TRI_Frontend.StreamConnector.onMessage(evt)
                };
                websocketStream.ondata = function (src, start, end) {
                    TRI_Frontend.StreamConnector.onData(src, start, end)
                };
                websocketStream.onerror = function (evt) {
                    TRI_Frontend.StreamConnector.onError(evt)
                };
                document.getElementById("vis_panel").style["display"] = "block";
                $('#newnav').delay(1000).show(0);

                $('#data_panel').remove();
                $('body').css('background', '#000');
            },

            onOpen: function (evt) {
                console.log("Websocket CONNECTED to " + TRI_Frontend.StreamConnector.visConnectionUri);
                $("#div_connect_success").fadeIn('slow', TRI_Frontend.hideConnectMessage);
                console.log("not doing enything with vis stream");
            },

            onClose: function (evt) {
                console.log("Websocket DISCONNECTED");
            },

            onMessage: function (evt) {
                //console.log("gim in!");
                //console.log(evt.data);
                if (url != undefined)
                    URL.revokeObjectURL(url);

                TRI_Frontend.img.onload = function () {
                    //console.log("drawing...");
                    //this is the control of canvas onload(like how to load the volume to the specific canvas)
                    TRI_Frontend.ctx.drawImage(TRI_Frontend.img, 0, 0); //the main canvas"#myCanvas"
                    TRI_Frontend.ctxmini.drawImage(TRI_Frontend.img, 0, 0); //the minimap"myCanvasmini"
                    TRI_Frontend.ctxcopy.drawImage(TRI_Frontend.img, 0, 0);

                }
                //console.log("replacing image source");

                url = URL.createObjectURL(evt.data);
                TRI_Frontend.img.src = url;

                if (TRI_Frontend.VisControlConnector.needsZoom()) {

                    if (TRI_Frontend.VisControlConnector.needsZoomOut()) {
                        TRI_Frontend.VisControlConnector.sendZoomOut();
                    } else {
                        TRI_Frontend.VisControlConnector.sendZoomIn();
                    }

                } else {
                    if (TRI_Frontend.VisControlConnector.needsRotation()) {

                        //console.log("need rot");
                        TRI_Frontend.VisControlConnector.sendRotation();
                    } else {
                        //console.log("refining");
                        TRI_Frontend.VisControlConnector.doSend('{"type": "ProceedRendering", "req": { "rid": 1, "sid": 3, "params": {} } }');
                        TRI_Frontend.VisControlConnector.sendingWasStopped();

                    }
                }



                //URL.revokeObjectURL(url);
                //rot += 0.01;

            },

            onError: function (evt) {
                console.log("Websocket Error: " + evt.data);
                $("#div_connect_failure").fadeIn('slow', TRI_Frontend.hideConnectMessage);
            },

            doSend: function (message) {
                //console.log("Sent: " + message);
                websocketStream.send(message);
            }
        };
    })();
}

export default TRI_Frontend;