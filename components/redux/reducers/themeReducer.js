import { DISPLAY_SETTING, THEME_SETTINGS } from "../actions/type";

const initialState = {
    settings:[],
    display:[]
}

export default function (state= initialState, action) {
    switch (action.type) {
        case THEME_SETTINGS:
            return {
                ...state,
                settings:action.payload
            }
        case DISPLAY_SETTING:
            return {
                ...state,
                display:action.payload
            }    
        default:
            return state
    }
}