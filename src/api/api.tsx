import axios from "axios";
import {ProfileResponseType, ProfileUpdateType} from "../redux/profilePageReducer";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-Key": "77e3abfb-dd75-4904-b56a-e26f0cfa27af"
    }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });
    },

    unFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => {
            return response
        });
    },

    follow(id: number) {
        return instance.post(`follow/${id}`).then(response => {
            return response
        });
    },

    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },

    getUserStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status` , {status});
    },

    updatePhoto(photo: File) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put(`/profile/photo` , formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
    updateProfile(profile: ProfileResponseType) {
        return instance.put(`/profile` , profile, {
        });
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`, {
            withCredentials: true
        });
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}






