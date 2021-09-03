import React, {useEffect, useState} from "react";
import {Button, Input} from 'antd';

const {TextArea} = Input;

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: React.FC = () => {


    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);


    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            setTimeout(createChannel, 3000);
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler);
            setWsChannel(ws);
        }
        createChannel();
        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }

    }, []);

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])


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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('ready');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message);
        setMessage('')
    }

    return <div>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        <Button disabled={wsChannel === null || readyStatus !== 'ready'} type={'primary'}
                onClick={sendMessage}>Send</Button>
    </div>
}

export default ChatPage