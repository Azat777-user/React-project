import {DialogType, MessageType} from '../types/types';

const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        {message: "How are you?",  id: 1},
        {message: "Hi my friends", id: 2},
        {message: "This my first message", id: 3},
    ] as Array<MessageType>,
    dialogs: [
        {name:"Azat",   id: 1},
        {name:"Ilya" ,  id: 2},
        {name:"Andreu", id: 3},
        {name:"Sveta",  id: 4},
        {name:"Nikita", id: 5},
    ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;
export const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type){
        case SEND_MESSAGE: 
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}],
            };    

        default: return state;
    }  
}

type sendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageAC = (newMessageBody: string): sendMessageActionType =>{
    return{
        type: SEND_MESSAGE,
        newMessageBody
    }
}

export default dialogsReducer;