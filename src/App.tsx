import React from 'react';
import './App.css';
import Navbar from "./components/NavBar/Navbar";
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/authReducer";
import {RootReduxState} from "./redux/reduxStore";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import { Preloader } from './components/common/Preloader/Preloader';


export type mapStateToPropsType = {
    // login: string | null
    // isAuth: boolean
    initialized: boolean
}

export type authOwnPropsType = {
    initializeApp: () => void
}


class App extends React.Component<authOwnPropsType & mapStateToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <HashRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={
                            () => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={
                            () => <ProfileContainer/>}/>
                        <Route path='/users' render={
                            () => <UsersContainer/>}/>
                        <Route path='/login' render={
                            () => <Login/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                    </div>
                </div>
            </HashRouter>);
    }
}

const mapStateToProps = (state: RootReduxState): mapStateToPropsType => ({
    initialized: state.initialization.initialized
})

export default compose(
    connect(mapStateToProps , {initializeApp}))(App);
