import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/reduxStore";
import {initialStateSetUserType, setAuthUserData} from "../../redux/authReducer";


export type mapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

export type authOwnPropsType = {
    setAuthUserData: (userData: initialStateSetUserType) => void
}

class HeaderContainer extends React.Component<authOwnPropsType & mapStateToPropsType> {   //??

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                debugger;
            if (response.data.resultCode === 0) {
                let {id, email, login } = response.data.data
                this.props.setAuthUserData({id, email, login, isAuth:true})  //???
            }
            });
    }

    render() {
        return <Header {...this.props} /> //???

    }
}

const mapStateToProps = (state: RootReduxState):mapStateToPropsType => ({
    login: state.authorization.login,
    isAuth: state.authorization.isAuth
})

export default  connect (mapStateToProps, {setAuthUserData})(HeaderContainer);