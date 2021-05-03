import {RootReduxState} from "./reduxStore";


export const getUsers = (state: RootReduxState) => {
   return  state.usersPage.users
}
export const getUserPage = (state: RootReduxState) => {
   return state.usersPage
}

export const getPageSize = (state: RootReduxState) => {
    return  state.usersPage.pageSize
}

export const getTotalUsersCount = (state: RootReduxState) => {
    return  state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootReduxState) => {
    return  state.usersPage.currentPage
}

export const getIsFetching = (state: RootReduxState) => {
    return  state.usersPage.isFetching
}
export const getFollowingInProgress = (state: RootReduxState) => {
    return  state.usersPage.followingInProgress
}

