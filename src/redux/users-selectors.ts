import {RootReduxState} from "./reduxStore";
import {createSelector} from "reselect";
import {UserType} from "./usersPageReducer";




const getUsersSelector = (state: RootReduxState) => {
   return  state.usersPage.users;
}

export const getUsers =  createSelector(getUsersSelector, (users: Array<UserType>) => {
    return users
})

export const getUserPage = (state: RootReduxState) => {
   return state.usersPage;
}

export const getPageSize = (state: RootReduxState) => {
    return  state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: RootReduxState) => {
    return  state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: RootReduxState) => {
    return  state.usersPage.currentPage;
}

export const getIsFetching = (state: RootReduxState) => {
    return  state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: RootReduxState) => {
    return  state.usersPage.followingInProgress;
}

