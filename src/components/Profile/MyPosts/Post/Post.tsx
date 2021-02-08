import React from 'react';
import classes from './Post.module.css';


type PropsType = {
    message: string
    likesCount: number
}

const Post = (props: PropsType) => {
    return <div className={classes.item}>
        <div className={classes.imgWrapper}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7mx3RJZKeLVTgpuTk5QXPOHvtHccgp2wRA&usqp=CAU"
                alt="Jang"/>
        </div>
        <div className={classes.triangle}/>
        <div className={classes.messageContent}>
            {props.message}
            <div className={classes.likes}>
                likes:
                {props.likesCount}
            </div>
        </div>

    </div>
}

export default Post;