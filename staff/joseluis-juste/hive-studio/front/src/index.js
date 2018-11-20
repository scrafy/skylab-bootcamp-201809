import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './assets/css/styles.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'

ReactDOM.render(<HashRouter><App/></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
