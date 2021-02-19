import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostType} from "../../../redux/store";


type PropsType = {
    posts: PostType[]
    addPost: () => void
    newPostText: string
    updateNewPostText: (text: string) => void
}

const MyPosts = (props: PropsType) => {

    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const addPost = () => {
        props.addPost()
    }

    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        let text = e.currentTarget.value
        props.updateNewPostText(text)
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