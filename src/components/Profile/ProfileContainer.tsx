import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileResponseType, setUserProfileCreator} from "../../redux/profilePageReducer";
import {RootReduxState} from "../../redux/reduxStore";

export type ProfileMapStateToPropsType = {
    profile: ProfileResponseType
}

export type ProfileMapDispatchToPropsType = {
    setUserProfileCreator: (profile: ProfileResponseType) =>  void
}

export type ProfileOwnProps = {

}


class ProfileContainer extends React.Component<ProfileMapDispatchToPropsType & ProfileMapStateToPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {

                this.props.setUserProfileCreator(response.data);
            });
    }

    render(){
        return <div>
         <Profile  profile={this.props.profile}/>
        </div>
    }
}

const mapStateToProps = (state: RootReduxState): ProfileMapStateToPropsType => ({
    profile: state.profilePage.profile
});



export default connect(mapStateToProps, {setUserProfileCreator})(ProfileContainer);
