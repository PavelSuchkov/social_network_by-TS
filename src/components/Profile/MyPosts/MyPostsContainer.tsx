import React from 'react';
import {addPost} from "../../../redux/profilePageReducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootReduxState} from "../../../redux/reduxStore";


let mapStateProps = (state: RootReduxState) => {
    return {
        posts: state.profilePage.posts,
    }
}

/*let mapDispatchProps = (dispatch: Dispatch) => {
    return{
        addPost: (newPostText: string) => {dispatch(addPost(newPostText))},
    }
}*/


const MyPostsContainer = connect(mapStateProps,
    {addPost}) (MyPosts);

export default MyPostsContainer;

