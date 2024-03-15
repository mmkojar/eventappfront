import { ADD_CHATS, GET_ADMIN_CHATS, GET_CHATS, GET_USER_CHATS } from "../actions/type";

const initialState = {
    data:null,
    chathistory:null,
    admins:null,
}

export default function (state=initialState,action) {
    switch(action.type) {
        case GET_CHATS:
            return {
                ...state,
                data:action.payload
            };
        case ADD_CHATS:
            return {  
                ...state,
                data:[...action.payload, ...state.data]
            };
        case GET_USER_CHATS:
            return {
                ...state,
                chathistory:action.payload
            };
        case GET_ADMIN_CHATS:
            return {
                ...state,
                admins:action.payload
            }; 
        default:
            return state;
    }
}