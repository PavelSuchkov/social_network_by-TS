import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    getUserProfile,
    getUserStatus,
    ProfileResponseType,
    savePhoto,
    updateUserStatus
} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

type ProfileMapStateToPropsType = {
    profile: ProfileResponseType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    // userId: number
}

type RouteType = {
    userId: string
}

type ProfileOwnProps = {}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
}

type PropsType = MapDispatchPropsType & ProfileMapStateToPropsType & RouteComponentProps<RouteType>


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId ? this.props.authorizedUserId : 2;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }

    }

    render() {
        return <div>
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}/>
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.authorization.id,
    isAuth: state.authorization.isAuth

});

export default compose<React.ComponentType>(
    connect<ProfileMapStateToPropsType, MapDispatchPropsType, ProfileOwnProps, RootReduxState>
    (mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto}),
    withRouter,
    withAuthRedirect)(ProfileContainer)



