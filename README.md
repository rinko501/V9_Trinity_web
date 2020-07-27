The entire project is developed on the basis of React and sass, and the modules are connected and packaged through Webpack to generate integrated css and js files.
Due to modularity, many open source resources can be used directly, which greatly reduces the difficulty and time of development. The following are the main modules I use (there is a detailed list in package.json):
3d-react-carousal: Realize three-dimensional Carousal, used to select the data file part at the beginning
reactstrap: Use Bootstrap 4 library in React for various UI controls and Grid Layout
react-color: color picker, supports multiple styles
nouislider: slider control
three.js: Very powerful 3D framework
whs: The framework based on three js greatly simplifies the difficulty of use and is used to implement 3D controls
recharts: The Data Visualization library actually generates various SVG charts. I use this module for 1DTF, the effect is average, but it is better to use Canvas to generate controls directly.
react-konva and konva: Canvas library, convenient to generate various Canvas applications. For 2DTF, various shapes can be generated, and these shapes directly have DRAG AND DROP function.
