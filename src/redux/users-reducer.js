import { usersAPI } from "../API/API";
import { updateObjectInArray } from "../utils/object-helper";
const 
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
    SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT",
    TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    totalUsersCount: 0,
    sizePage: 30,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 10,
    messages: [
        { id:"1", message: "How are you?", },
        { id:"2", message: "Hi my friends", },
        { id:"3", message: "This my first message", }
    ],
    newMessageBody: "",
}

let usersReducer = (state=initialState, action) => {
    switch(action.type){
        // case "Fake" : return {...state, fake: state.fake + 1}
        case FOLLOW:
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            }
        
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            }

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

        case TOGGLE_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching,
            }
        
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: 
        return {
            ...state,
            followingInProgress: 
                action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId),
        }

        default: return state;
    }
}

export const followSuccess = (userId) => {return {type: FOLLOW, userId}}
export const unfollowSuccess = (userId) => {return {type: UNFOLLOW, userId}}
export const setUsers = (users) => {return { type: SET_USERS, users}}
export const setCurrentPage = (currentPage) => {return { type: SET_CURRENT_PAGE, currentPage}}
export const setTotalUsersCount = (totalUsersCount) => {return { type: SET_USERS_TOTAL_COUNT, count: totalUsersCount}}
export const toggleIsFetching = (isFetching) => {return {type: TOGGLE_IS_FETCHING, isFetching }}
export const toggleIsFollowingInProgress = (isFetching, userId) => {return {type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId }}

export const getUsersThunkCreator = (page, sizePage) => { 
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, sizePage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)); 
    }
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, userId));

    let response = await apiMethod(userId);
    if(response.data.resultCode === 0)
    {
        dispatch(actionCreator(userId));
    }
    
    dispatch(toggleIsFollowingInProgress(false, userId)); 
}

export const follow = (userId) => { 
    return async(dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);   
    }
}

export const unfollow = (userId) => { 
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);  
    }
}

export default usersReducer;