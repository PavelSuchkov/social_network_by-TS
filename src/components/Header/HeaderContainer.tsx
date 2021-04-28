import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootReduxState} from "../../redux/reduxStore";
import {getAuthUserData, logout} from "../../redux/authReducer";



export type mapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

export type authOwnPropsType = {
    // getAuthUserData: () => void
    logout: () => void
}

class HeaderContainer extends React.Component<authOwnPropsType & mapStateToPropsType> {   //??

    // componentDidMount() {
    //     this.props.getAuthUserData()
    // }

    render() {
        return <Header {...this.props} /> //???

    }
}

const mapStateToProps = (state: RootReduxState):mapStateToPropsType => ({
    login: state.authorization.login,
    isAuth: state.authorization.isAuth
})


export default  connect (mapStateToProps, {getAuthUserData, logout})(HeaderContainer);