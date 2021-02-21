import {combineReducers, createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";


let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer
})

let store = createStore(reducers)


// @ts-ignore
window.store = store

export default store;