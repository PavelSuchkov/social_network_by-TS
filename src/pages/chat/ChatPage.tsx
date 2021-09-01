import React from "react";
import {Input, Button, Avatar} from 'antd';
import * as https from "https";

const {TextArea} = Input;

const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const messages = [1, 2, 3, 4]

    return <div style={{height: '300px', overflowY: 'auto'}}>
        {messages.map((m: any) => <Message key={m}/>)}
        {messages.map((m: any) => <Message key={m}/>)}
    </div>
}

const Message: React.FC = () => {

    const message = {
        url: 'https://via.placeholder.com/150',
        author: 'Pablo',
        text: 'Hello world'
    }

    return <div>
        <Avatar/> <b>{message.author}</b>
        <br/>
        {message.text}
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {
    return <div>
        <TextArea/>
        <Button type={'primary'}>Send</Button>
    </div>
}

export default ChatPage