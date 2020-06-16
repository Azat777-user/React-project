import * as axios from 'axios';

let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "f06deeba-d842-44ee-b5ef-7191a7c50815",
    },
})

export const usersAPI = {
    getUsers(currentPage = 1, sizePage = 10) {
        return instance.get(`users?page=${currentPage}&count=${sizePage}`,)
        .then(response => { return response.data});
    },
    follow(userid){
        return instance.post(`follow/${userid}`);
    },
    unfollow(userid){
        return instance.delete(`follow/${userid}`,);
    },
    profile(userid){
        console.warn("Obsolete method. Please ProfileAPI object");
        return profileAPI.profile(userid);
    }
}

export const profileAPI = {
    profile(userid){
        return instance.get(`profile/${userid}`,);
    },
    status(userid){
        return instance.get(`profile/status/${userid}`,);
    },
    updateStatus(status){
        return instance.put(`profile/status`,{
            status: status,
        });
    },
    savePhoto(photoFile){
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile){
        return instance.put(`profile`, profile);
    }

}
 
export const authAPI = {
    me(){
        return instance.get(`auth/me`,);
    },
    login(email, password, rememberMe = false, captcha = null){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout(){
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`);
    },
}

