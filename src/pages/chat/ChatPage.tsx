import React, {useEffect, useState} from "react";
import {Input, Button, Avatar} from 'antd';
import * as https from "https";

const {TextArea} = Input;

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

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

    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])


    return <div style={{height: '300px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '50px', borderRadius: '25px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel.send(message);
        setMessage('')
    }

    return <div>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <Button type={'primary'} onClick={sendMessage}>Send</Button>
    </div>
}

export default ChatPage