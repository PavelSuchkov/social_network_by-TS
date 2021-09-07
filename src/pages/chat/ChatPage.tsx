import React, {useEffect, useRef, useState} from "react";
import {Button, Input} from 'antd';
import {ChatMessageAPIType} from "../../api/chat-api";
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
    const status = useSelector((state: RootReduxState) => state.chat.status);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>
        {status === 'error' && <div>Error. Please refresh the page</div>}

                <Messages/>
                <AddMessageForm/>

    </div>
}

const Messages: React.FC<{}> = () => {

    const messages = useSelector((state: RootReduxState) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let el = e.currentTarget;
        if (Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 300){
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <div style={{height: '300px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

    return <div>
        <img src={message.photo} style={{width: '50px', borderRadius: '25px'}} alt={'avatar'}/>
        <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('');
    const status = useSelector((state: RootReduxState) => state.chat.status);
    const dispatch = useDispatch();


    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(senMessage(message));
        setMessage('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            sendMessageHandler();
        }
    }

    return <div>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}
                  onKeyPress={onKeyPressHandler}/>
        <Button disabled={status !== 'ready'} type={'primary'}
                onClick={sendMessageHandler}>Send</Button>
    </div>
}

export default ChatPage