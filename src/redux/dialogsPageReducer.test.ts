import dialogsPageReducer, {DialogPageType, sendMessage} from "./dialogsPageReducer";


let startState: DialogPageType;

beforeEach(() => {
    startState = {
        dialogs: [
            {id: 1, name: 'Pasha'},
            {id: 2, name: 'Sasha'}
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 1, message: 'How r u'}
        ]
    }
})

test('Sending of message is correctly works', () => {

    const newMessageBody = 'new message was add';
    const endState = dialogsPageReducer(startState, sendMessage(newMessageBody));
    expect(endState.messages.length).toBe(3);
    expect(endState.messages[2].message).toBe(newMessageBody);
} )