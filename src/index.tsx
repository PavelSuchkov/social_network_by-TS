import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state, {subscribe, updateNewPostText} from "./redux/state";
import {addPost} from "./redux/state";



 let renderEntireTree = () => {
    ReactDOM.render(<App state={state}
                         addPost={addPost}
                         updateNewPostText={updateNewPostText}/>,
        document.getElementById('root'));
}
renderEntireTree();
subscribe(renderEntireTree);

reportWebVitals();




