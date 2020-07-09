import {authAPI, securityAPI} from "../API/API";
import { stopSubmit } from "redux-form";

const 
    SET_USER_DATA = "social-network/auth/SET_USER_DATA",
    GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';


type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | null,
    captchaUrl: string | null
}    
let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,// if null, then captcha is not required
}

let authReducer = (state = initialState, action: any):InitialStateType => {
    switch(action.type){
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: 
            return {
                ...state, 
                ...action.payload,
            }
           
        default: return state;
    }
}



type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {
            captchaUrl
        }
    }
} 

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => 
{
    return {
        type: SET_USER_DATA, 
        payload: {
            userId, email, login, isAuth
        }
    }
}

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let response = await authAPI.me();
        if(response.data.resultCode === 0){
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }   
    }
} 

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    debugger
    return async (dispatch: any) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);
        if(response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else{
            if(response.data.resultCode === 10){
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
            dispatch(stopSubmit("login", {_error: message}));
        }   
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout();
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null, false));
        }   
    }
}

export default authReducer;