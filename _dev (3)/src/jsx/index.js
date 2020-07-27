/**
 * 
 */

import 'bootstrap';
import 'nouislider/distribute/nouislider.css';

import "../sass/v9.scss";
import "../sass/Font-Awesome-4.7.0/scss/font-awesome.scss"



import React from 'react';
import ReactDOM from 'react-dom';

import V9Container from './components/V9Container'



const domContainer = document.querySelector('#v9-container');
domContainer.style.overflow = "hidden";

ReactDOM.render(<V9Container />, domContainer);