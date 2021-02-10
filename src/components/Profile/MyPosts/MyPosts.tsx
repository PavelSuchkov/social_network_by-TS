import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionsTypes, PostType} from "../../../redux/state";

type PropsType = {
    posts: PostType[]
    dispatch: (action: ActionsTypes) => void
    // addPost: (newText: string) => void
    // updateNewPostText: (newText: string) => void
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const addPost = () => {
        // props.addPost(props.newPostText);
        props.dispatch({type: "ADD-POST", newPostText: props.newPostText});
    }


    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        // props.updateNewPostText(e.currentTarget.value)
        props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: props.newPostText})
    }

    return <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea onChange={onPostChange}  value={props.newPostText}/>
        </div>
        <div>
            <button onClick={addPost} className={classes.postButton}>Add post</button>
        </div>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;