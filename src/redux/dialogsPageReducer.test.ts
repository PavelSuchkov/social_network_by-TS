import dialogsPageReducer, {DialogPageType, sendMessage, updateNewMessageBody} from "./dialogsPageReducer";


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
        ],
        newMessageBody: 'new message was add'
    }
})

test('body of new message is correctly added', () => {

    const newText = 'new text was added';
    const action = updateNewMessageBody(newText);
    const endState = dialogsPageReducer(startState, action);

    expect(endState.newMessageBody).toBe(newText);

});


test('Sending of message is correctly works', () => {

    const newMessageBody = 'new message was add';
    // const action = sendMessage;
    const endState = dialogsPageReducer(startState, sendMessage());
    expect(endState.messages.length).toBe(3);
    expect(endState.messages[2].message).toBe(newMessageBody);
} )