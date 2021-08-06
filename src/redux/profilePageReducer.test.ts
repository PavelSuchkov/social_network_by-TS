import profilePageReducer, {addPost, InitialProfileStateType, setStatus} from "./profilePageReducer";


let startState: InitialProfileStateType;

beforeEach(() => {
    startState = {
        posts: [
            {id: 1, message: 'Hi', likesCount: 3},
            {id: 1, message: 'How r u', likesCount: 5},
        ],
        profile: null,
        status: 'My status',
        error: ''
    }
})

test('correct adding of post', () => {

    const newText = 'RTYTYUIOLLJHGGF';
    const action = addPost(newText);

    const endState = profilePageReducer(startState, action);
    expect(endState.posts.length).toBe(3)
})



test('Status changes correctly', () => {

    const newStatus = 'Status is changed';
    const action = setStatus(newStatus);

    const endState = profilePageReducer(startState, action);
    expect(endState.status).toBe(newStatus);

})