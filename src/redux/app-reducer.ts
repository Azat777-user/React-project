import {getAuthUserData} from "./auth-reducer";

const 
    INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

type InitialStateType = {
    initialized: boolean | null,
    globalError: null
}

let initialState: InitialStateType = {
    initialized: false,
    globalError: null
}
 

const appReducer = (state=initialState, action: any): InitialStateType => {
    switch(action.type){
        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true,
            }
            
        default: return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS})


export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(()=> {
            dispatch(initializedSuccess());
        });  
    }
} 

export default appReducer;