import {usersAPI, profileAPI} from "../API/API";
const ADD_POST = 'ADD-POST', 
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_STATUS = "SET_STATUS";

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

        default: return state;
    }    
}

export const addPostAC = (newPostBody) =>{
    return {
      type: ADD_POST,
      newPostBody
    }
}


export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}

export const getProfile = (userId) => {
    return (dispatch) => {
        usersAPI.profile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status,
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.status(userId).then(data => {
            dispatch(setStatus(data));
        });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(data => {
            if(data.resultCode === 0){
                dispatch(setStatus(status));
            }
        });
    }
}
export default profileReducer;