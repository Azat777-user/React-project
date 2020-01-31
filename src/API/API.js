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
        return instance.post(`follow/${userid}`)
        .then(response => { return response.data});
    },
    unfollow(userid){
        return instance.delete(`follow/${userid}`,)
        .then(response => { return response.data});
    },
    profile(userid){
        console.warn("Obsolete method. Please ProfileAPI object");
        return profileAPI.profile(userid);
    }
}

export const profileAPI = {
    profile(userid){
        return instance.get(`profile/${userid}`,).then(response => { return response.data});
    },
    status(userid){
        return instance.get(`profile/status/${userid}`,).then(response => { return response.data});
    },
    updateStatus(status){
        return instance.put(`profile/status`,{
            status: status,
        }).then(response => { return response.data});
    }
}
 
export const authAPI = {
    me(){
        return instance.get(`auth/me`,).then(response => { return response.data});
    },
    login(email, password, rememberMe=false){
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout(){
        return instance.delete(`auth/login`);
    }
}

