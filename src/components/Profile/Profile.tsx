import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type propsType = {
    profilePage: ProfilePageType
    addPost: (newPost: string) => void
    updateNewPostText: (newText: string) => void
}

const Profile = (props: propsType) => {
    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts}
                 addPost={props.addPost}
                 updateNewPostText={props.updateNewPostText}
                 newPostText={props.profilePage.newPostText}
        />
    </div>
}

export default Profile;