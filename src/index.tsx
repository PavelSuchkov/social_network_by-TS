import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import {Provider} from "react-redux";




 let renderEntireTree = () => {

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));

}
renderEntireTree();
store.subscribe( renderEntireTree);

reportWebVitals();




