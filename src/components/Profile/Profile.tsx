import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/state";

type propsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
    // addPost: (newPost: string) => void
    // updateNewPostText: (newText: string) => void
}

const Profile = (props: propsType) => {
    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts}
                 // addPost={props.addPost}
                 // updateNewPostText={props.updateNewPostText}
                 newPostText={props.profilePage.newPostText}
                 dispatch={props.dispatch}
        />
    </div>
}

export default Profile;