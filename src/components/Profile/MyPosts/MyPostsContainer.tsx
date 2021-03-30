import React from 'react';
import {addPost, updateNewPost,} from "../../../redux/profilePageReducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import store, {RootReduxState} from "../../../redux/reduxStore";
import {Dispatch} from 'redux';


let mapStateProps = (state: RootReduxState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchProps = (dispatch: Dispatch) => {
    return{
        addPost: () => {dispatch(addPost(store.getState().profilePage.newPostText))},
        updateNewPostText: (text: string) => {dispatch(updateNewPost(text))}
    }
}


const MyPostsContainer = connect(mapStateProps, mapDispatchProps) (MyPosts);

export default MyPostsContainer;

