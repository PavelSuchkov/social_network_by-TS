import {instance, APIResponseType} from "./api";


type MeResponseDataType = {
        id: number,
        email: string,
        login: string
}

type LoginResponseDataType = {
        userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`, {
            withCredentials: true
        }).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
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