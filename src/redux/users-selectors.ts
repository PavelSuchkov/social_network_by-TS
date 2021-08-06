import {RootReduxState} from "./reduxStore";
import {createSelector} from "reselect";
import {UsersInitialType, UserType} from "./usersPageReducer";


const getUsersSelector = (state: RootReduxState) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users: Array<UserType>) => {
    return users
})

const getUserPageSelector = (state: RootReduxState) => {
    return state.usersPage;
}

export const getUsersPage = createSelector(getUserPageSelector, (usersPage: UsersInitialType) => {
    return usersPage
})


const getPageSizeSelector = (state: RootReduxState) => {
    return state.usersPage.pageSize;
}

export const getPageSize = createSelector(getPageSizeSelector, (pageSize: number) => {
    return pageSize
})


export const getTotalUsersCount = (state: RootReduxState) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: RootReduxState) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: RootReduxState) => {
    return state.usersPage.isFetching;
}
// export const getUserPhoto = (state: RootReduxState) => {
//     return state.usersPage.users[0].photos;
// }
export const getFollowingInProgress = (state: RootReduxState) => {
    return state.usersPage.followingInProgress;
}

