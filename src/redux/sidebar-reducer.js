import { usersAPI } from "../API/API";

const 
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";

let initialState = {
    users: [],
    totalUsersCount: 0,
    sizePage: 30,
    currentPage: 1,
}

let usersReducer = (state=initialState, action) => {
    switch(action.type){

        case SET_USERS: 
            return {
                ...state,
                users: action.users,
            }
        
        case SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.currentPage,
            }

        case SET_USERS_TOTAL_COUNT: 
            return {
                ...state,
                totalUsersCount: action.count,
            }

        default: return state;
    }
}


export const setUsers = (users) => {return { type: SET_USERS, users}}
export const setCurrentPage = (currentPage) => {return { type: SET_CURRENT_PAGE, currentPage}}
export const setTotalUsersCount = (totalUsersCount) => {return { type: SET_USERS_TOTAL_COUNT, count: totalUsersCount}}


export const getUsersThunkCreator = (page, sizePage) => { 
    return async (dispatch) => {
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, sizePage);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)); 
    }
}



export default usersReducer;