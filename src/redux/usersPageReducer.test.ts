import UsersPageReducer, {
    followSuccess,
    UsersInitialType,
    setUsers,
    toggleIsFetching,
    unFollowSuccess,
    UserType
} from "./usersPageReducer";

//
// let startState = {
//     users: [] as Array<UserType>,
//     pageSize: 50,
//     totalUsersCount: 0,
//     currentPage: 1,
//     isFetching: true,
//     followingInProgress: [] as Array<number>
// }

let startState: UsersInitialType;

beforeEach(() => {
    startState = {
        users: [
            {
                name: 'Bob',
                id: 1,
                uniqueUrlName: 'url-1',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
                status: 'yo'
            },
            {
                name: 'Alex',
                id: 2,
                uniqueUrlName: 'url-2',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
                status: 'yo yo yo'
            }
        ],
        pageSize: 50,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number>

    }
})


test('follow works correctly', () => {

    const action = followSuccess(2)
    const endState = UsersPageReducer(startState, action);
    expect(endState.users[1].followed).toBe(true)

})
test('unfollow works correctly', () => {

    startState = {
        users: [
            {
                name: 'Bob',
                id: 1,
                uniqueUrlName: 'url-1',
                photos: {
                    small: null,
                    large: null
                },
                followed: true,
                status: 'yo'
            },
            {
                name: 'Alex',
                id: 2,
                uniqueUrlName: 'url-2',
                photos: {
                    small: null,
                    large: null
                },
                followed: true,
                status: 'yo yo yo'
            }
        ],
        pageSize: 50,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>

    }

    const action = unFollowSuccess(2)
    const endState = UsersPageReducer(startState, action);
    expect(endState.users[1].followed).toBe(false)

})

test('Users was set ', () => {

    startState = {
        users: [],
        pageSize: 50,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>

    }

    let users = [
        {
            name: 'Alex',
            id: 2,
            uniqueUrlName: 'url-2',
            photos: {
                small: null,
                large: null
            },
            followed: false,
            status: 'yo'
        },
        {
            name: 'Bob',
            id: 2,
            uniqueUrlName: 'url-1',
            photos: {
                small: null,
                large: null
            },
            followed: false,
            status: 'yo yo yo'
        }]

    let action = setUsers(users);
    let endState = UsersPageReducer(startState, action)

    expect(endState.users.length).toBe(2);
    expect(endState.users[1].name).toBe('Bob');


})

test('Is fetching true' , () => {

    let action = toggleIsFetching(true);
    let endState = UsersPageReducer(startState, action)

    expect(endState.isFetching).toBe(true)

} )

test( 'is toggling with following correct', () => {

} )