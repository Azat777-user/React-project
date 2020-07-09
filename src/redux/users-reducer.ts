import { usersAPI } from "../API/API";
import { updateObjectInArray } from "../utils/object-helper";
import { UserType } from "../types/types";
const 
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
    SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT",
    TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS";

type InitialStateType = {
    users: Array<import("../types/types").UserType>,
    totalUsersCount: number,
    sizePage: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number> //array of users ids
}

let initialState: InitialStateType = {
    users: [],
    totalUsersCount: 0,
    sizePage: 30,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

let usersReducer = (state=initialState, action: any) => {
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

type FollowSuccessActionType = {
    type: typeof FOLLOW 
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS 
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE 
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage})

type setTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number 
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({ type: SET_USERS_TOTAL_COUNT, count: totalUsersCount})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching })

type ToggleIsFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingInProgress = (isFetching: boolean, userId: number):ToggleIsFollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId })

export const getUsersThunkCreator = (page: number, sizePage: number) => { 
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, sizePage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)); 
    }
}
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingInProgress(true, userId));

    let response = await apiMethod(userId);
    if(response.data.resultCode === 0)
    {
        dispatch(actionCreator(userId));
    }
    
    dispatch(toggleIsFollowingInProgress(false, userId)); 
}

export const follow = (userId: number) => { 
    return async(dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);   
    }
}

export const unfollow = (userId: number) => { 
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);  
    }
}

export default usersReducer;