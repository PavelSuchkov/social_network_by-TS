import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profile-API";


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
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