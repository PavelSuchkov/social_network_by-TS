import {PhotosType, ProfileDataType, ProfileResponseType} from "../redux/profilePageReducer";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get<ProfileResponseType>(`profile/` + userId).then( res => res.data);
    },

    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status}).then(res => res.data);
    },

    updatePhoto(photo: File) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    updateProfile(profile: ProfileResponseType) {
        return instance.put<APIResponseType<ProfileDataType>>(`/profile`, profile, {}).then(res => res.data);
    }
}