import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileResponseType} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"

export type ProfileMapStateToPropsType = {
    profile: ProfileResponseType | null
    isAuth: boolean

}

type RouteType = {
    userId: string
}

export type ProfileOwnProps = {
    profile: ProfileResponseType | null
    getUserProfile: (userId:number) =>  void
    isAuth: boolean
}


class ProfileContainer extends React.Component<ProfileOwnProps & RouteComponentProps<RouteType>>{

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 9;
        }
        this.props.getUserProfile(userId);

    }

    render(){
        if(!this.props.isAuth) return <Redirect to={'/Login'} />

        return <div>
         <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.authorization.isAuth
});

let withUrlDataContainerComponent  = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    getUserProfile})(withUrlDataContainerComponent);
