import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store ={
    _callSubscriber(){console.log('state changed');},
    _state: {
        profilePage:{
            posts: [
                {id:"1", message:"Hi, how are you?",       likesCount:"10"},
                {id:"2", message:"Hi, it's my first post", likesCount:"15"},
                {id:"3", message:"Hello my friends" ,      likesCount:"18"},
            ],
            newPostText: "it-kamsutra.com",
        },
        dialogsPage:{
            messages: [
                {message: "How are you?",  id:"1"},
                {message: "Hi my friends", id:"2"},
                {message: "This my first message", id:"3"},
            ],
            dialogs: [
                {name:"Azat",   id:"1"},
                {name:"Ilya" ,  id:"2"},
                {name:"Andreu", id:"3"},
                {name:"Sveta",  id:"4"},
                {name:"Nikita", id:"5"},
            ],
            newMessageBody: 'My Message',
        },
        sidebar:{},
    },

    _sendMessage(){
        let body = this._state.dialogsPage.newMessageBody;
        this._state.dialogsPage.newMessageBody = '';
        this._state.dialogsPage.messages.push({id: 5, message: body});
        this._callSubscriber(this.getState());
    },

    getState(){
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    
    dispatch(action){// action = {type: 'ADD-POST'}
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar     = sidebarReducer(this._state.sidebar, action);
        
        this._callSubscriber(this.getState());
    },  
}


window.store = store;
export default store;



