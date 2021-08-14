import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profile-API";


export const usersAPI = {

    getUsers(currentPage: number = 1, pageSize: number = 20, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
        + (friend === null ? '' : `&friend=${friend}` ) )
            .then(response => {
            return response.data;
        });
    },

    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(response => {
            return response.data
        });
    },

    unFollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
    },

    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    }
}