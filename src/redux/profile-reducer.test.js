import profileReducer, { addPostAC, deletePost } from "./profile-reducer";

let state = {
    posts: [
        {id:"1", message:"Hi, how are you?",       likesCount:"10"},
        {id:"2", message:"Hi, it's my first post", likesCount:"15"},
        {id:"3", message:"Hello my friends" ,      likesCount:"18"},
    ]
}

it('length of post should be incremeted', () => {
    // 1. test data 
    let action = addPostAC("it-kamasutra.com");
   
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
    // 1. test data 
    let action = addPostAC("it-kamasutra.com");
    
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts[3].message).toBe("it-kamasutra.com");
});

it('after deleting length of message should be decrement', () => {
    // 1. test data 
    let action = deletePost(1);
    
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(2);
});

it(`after deleting length of message shouldn't be decrement if id is incorrect`, () => {
    // 1. test data 
    let action = deletePost(400);
    
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
  