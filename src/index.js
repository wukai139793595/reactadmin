import React from 'react';
import {
    render
} from 'react-dom';

import {
    getUserStore
} from "./utils/store.js";
import memory from "./utils/memory.js";
import App from './app.jsx';
memory.user = getUserStore();
render( < App / > , document.getElementById('root'))