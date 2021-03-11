import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {AppStateType, ProfilePageType} from "../../redux/store";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileCreator} from "../../redux/profilePageReducer";



class ProfileContainer extends React.Component<any>{

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

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfileCreator})(ProfileContainer);
