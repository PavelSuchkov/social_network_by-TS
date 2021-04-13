import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/profilePageReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type PropsType = {
    posts: PostType[]
    addPost: (value: string) => void
}

type FormDataType = {
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    const addPost = (value: FormDataType) => {
        props.addPost(value.newPostText)
    }

    return <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <AddPostReduxForm onSubmit={addPost}/>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
}

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> =(props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea"  name="newPostText" placeholder="Enter ur message"/>
            </div>
            <div>
                <button type='submit'>Post</button></div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<FormDataType>({
    form: "profileAddPostForm"
})(AddPostForm)

export default MyPosts;