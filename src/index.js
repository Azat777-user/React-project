import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from "./App";

/* let a = // 0x1250000
{ // 0x2550000
    name: 'andrew',
}*/

// setInterval(()=>{
//     store.dispatch({type:"Fake"});
// }, 1000);
 
ReactDOM.render(<MainApp />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
