import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider
} from 'react-redux'
import store from './redux/store.jsx'


import App from './app.jsx';
render( < Provider store = {
            store
        } > < App / > < /Provider> , document.getElementById('root'))