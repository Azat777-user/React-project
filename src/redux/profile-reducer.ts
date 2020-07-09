import {usersAPI, profileAPI} from "../API/API";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";

const ADD_POST = 'social-network/profile/ADD-POST', 
    SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE",
    SET_STATUS = "social-network/profile/SET_STATUS",
    DELETE_POST = "social-network/profile/DELETE_POST",
    SAVE_PHOTO_SUCCESS = "social-network/profile/SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id: 1, message:"Hi, how are you?",       likesCount: 10},
        {id: 2, message:"Hi, it's my first post", likesCount: 15},
        {id: 3, message:"Hello my friends" ,      likesCount: 18},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action:any): InitialStateType => {

    switch(action.type){
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likesCount: 0, 
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        
        case SET_USER_PROFILE:
            return{
                ...state,
                profile: action.profile,
            }
        case SET_STATUS:
            return{
                ...state,
                status: action.status,
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(p => p.id != action.postId),
            }
        case SAVE_PHOTO_SUCCESS:
            return{
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }

        default: return state;
    }    
}

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}

export const addPostAC:(newPostBody: string) => AddPostActionType = (newPostBody: string) =>{
    return {
        type: ADD_POST,
        newPostBody
    }
}

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost:(postId:number) => DeletePostActionType = (postId:number)=>{
    return {
        type: DELETE_POST,
        postId
    }
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: string
}

export const setUserProfile:(profile:string) => SetUserProfileActionType = (profile:string) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess:(photos: PhotosType) => SavePhotoSuccessActionType = (photos: PhotosType) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos,
    }
}

export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await usersAPI.profile(userId);
        dispatch(setUserProfile(response.data));
    }
}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus:(status: string) => SetStatusActionType = (status: string) => {
    return {
        type: SET_STATUS,
        status,
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.status(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        try{
            let response = await profileAPI.updateStatus(status);
            if(response.data.resultCode === 0){
                dispatch(setStatus(status));
            }   
        }catch(error){
            if(error.response.status == 403) {
                alert('Error: Server status 403');
            }
        }
        
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file);
        if(response.data.resultCode === 0){
            dispatch(savePhotoSuccess(response.data.data.photo));
        }
    }
}

export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);

        //debugger;
        if(response.data.resultCode === 0){
            dispatch(getProfile(userId));
        }else{
            // let wrongNetwork = response.data.messages[0].slice(
            //     response.data.messages[0].indexOf(">") + 1,
            //     response.data.messages[0].indexOf(")")
            // ).toLocaleLowerCase();
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
            //return Promise.reject(response.data.messages[0]);
        }
    }
}
export default profileReducer;