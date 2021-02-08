import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type propsType = {
    state: ProfilePageType
    addPost: (newPost: string) => void
    updateNewPostText: (newText: string) => void
}

const Profile = (props: propsType) => {
    return <div>
        <ProfileInfo/>
        <MyPosts posts={props.state.posts}
                 addPost={props.addPost}
                 updateNewPostText={props.updateNewPostText}
                 newPostText={props.state.newPostText}
        />
    </div>
}

export default Profile;