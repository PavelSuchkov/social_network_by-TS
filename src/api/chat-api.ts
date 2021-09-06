



let subscribers = [] as Array<SubscriberType>

let ws: WebSocket;

const closeHandler = () => {
    setTimeout(createChannel, 3000);
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler);
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages));
}

export const chatAPI = {
    subscribe(callback: SubscriberType)  {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void
