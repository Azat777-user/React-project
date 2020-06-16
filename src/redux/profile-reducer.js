import {usersAPI, profileAPI} from "../API/API";
import { stopSubmit } from "redux-form";
const ADD_POST = 'ADD-POST', 
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_STATUS = "SET_STATUS",
    DELETE_POST = "DELETE_POST",
    SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id:"1", message:"Hi, how are you?",       likesCount:"10"},
        {id:"2", message:"Hi, it's my first post", likesCount:"15"},
        {id:"3", message:"Hello my friends" ,      likesCount:"18"},
    ],
    profile: null,
    status: "",
}
const profileReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likesCount: "0", 
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
                }
            }

        default: return state;
    }    
}

export const addPostAC = (newPostBody) =>{
    return {
      type: ADD_POST,
      newPostBody
    }
}

export const deletePost = (postId) =>{
    return {
      type: DELETE_POST,
      postId
    }
}


export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos,
    }
}

export const getProfile = (userId) => {
    return async (dispatch) => {
        let response = await usersAPI.profile(userId);
        dispatch(setUserProfile(response.data));
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status,
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.status(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        try{
            let response = await profileAPI.updateStatus(status);
            if(response.data.resultCode === 0){
                dispatch(setStatus(status));
            }   
        }catch(error){
            
        }
        
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if(response.data.resultCode === 0){
            dispatch(savePhotoSuccess(response.data.data.photo));
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
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