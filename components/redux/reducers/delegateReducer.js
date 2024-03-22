import { 
    GET_ABOUT_EVENT, GET_SPEAKERS, GET_AGENDA, GET_DELEGATES, 
    GET_POLLS, UPDATE_POLLS, CLEAR_DATA, ERROR, GET_POLL, GET_EXHIBITORS, GET_SPONSORS, GET_NOTES, ADD_NOTES, EDIT_NOTES, GET_FAQ, GET_EVENT_FEED, GET_NOTIFI, NOTIFI_COUNT 
} from '../actions/type';

const initialState = {
    notifi:null,
    notificount:null,
    about:null,
    speaker:null,
    sponsor:null,
    event_feed:null,
    exhibitors:null,
    agenda:null,
    faq:null,
    delegates: null,
    notes:null,
    polls:null,
    poll:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFI: return {...state, notifi: action.payload }
        case NOTIFI_COUNT: return {...state, notificount: action.payload }
        case GET_ABOUT_EVENT:
            return {
                ...state,
                about:action.payload,
            };
        case GET_SPEAKERS:
            return {
                ...state,                
                speaker:action.payload,
            };
        case GET_EXHIBITORS:
            return {
                ...state,                
                exhibitors:action.payload,
            };
        case GET_SPONSORS:
            return {
                ...state,                
                sponsor:action.payload,
            };
        case GET_EVENT_FEED:
            return {
                ...state,                
                event_feed:action.payload,
            };    
        case GET_AGENDA:
            return {
                ...state,                
                agenda:action.payload,
            };
        case GET_FAQ:
            return {
                ...state,                
                faq:action.payload,
            };
        case GET_DELEGATES:
            return {
                ...state,
                delegates:action.payload,
            };   
        case GET_NOTES:
            return {
                ...state,
                notes:action.payload,
            };
        case ADD_NOTES:
            return {
                notes:[...action.payload, ...state.data]
            };
        case GET_POLLS:
            return {
                ...state,
                polls:action.payload,
            };
        case GET_POLL:
            return {
                ...state,
                poll:action.payload,
            };    
        case UPDATE_POLLS:
        case EDIT_NOTES:
            return {
                ...state
            };
        case CLEAR_DATA:
        case ERROR:
            return { 
                ...state,                
                delegates:null,
                chats:null,
            };
        default:
            return state;
    }
}