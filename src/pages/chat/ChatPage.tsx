import React, {useEffect, useState} from "react";
import {Button, Input} from 'antd';
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {RootReduxState} from "../../redux/reduxStore";
import {senMessage} from "../../redux/chatReducer";

const {TextArea} = Input;

const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = ({}) => {

   const messages = useSelector((state: RootReduxState) => state.chat.messages)


    return <div style={{height: '300px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '50px', borderRadius: '25px'}} alt={'avatar'}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('ready');
    const dispatch = useDispatch();


    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(senMessage(message));
        setMessage('')
    }

    return <div>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <Button disabled={readyStatus !== 'ready'} type={'primary'}
                onClick={sendMessageHandler}>Send</Button>
    </div>
}

export default ChatPage