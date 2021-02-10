import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";




 let renderEntireTree = () => {
    ReactDOM.render(<App state={store.getState()}
                         dispatch={store.dispatch.bind(store)}/>,
        document.getElementById('root'));
}
renderEntireTree();
store.subscribe(renderEntireTree);

reportWebVitals();




