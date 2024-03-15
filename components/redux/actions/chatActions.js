import axios from 'axios';
import { 
    START_LOADER, STOP_LOADER, GET_CHATS, GET_USER_CHATS, ADD_CHATS, ERROR, GET_ADMIN_CHATS
} from './type';
import Config from '../../utils/Config';

const api_url = Config.api_url;

const config = {
    headers: { 
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

// ------Get Chats Action------
export const getAllChats = (userid,receiver_id) => (dispatch) => {

    // dispatch({
    //     type: START_LOADER,
    // }); 
    const formdata = JSON.stringify({"user_id":userid,"receiver_id":receiver_id})
    
    axios.post(api_url+'chat', formdata ,config)
    .then((res) => {        
        if(res.data && res.data.status === "true") {
            dispatch({
                type: GET_CHATS,
                payload: res.data.data,
            });
        }
        else {              
            dispatch({
                type: GET_CHATS,
                payload: [],
            });
        }       
        /* dispatch({
            type: STOP_LOADER,
        }); */    
    })
    .catch((err) => {
        /* dispatch({
            type: STOP_LOADER,
        }); */
        alert(err);
    });    
}

// ------Get Chats History------
export const getChatHistory = (userid) => (dispatch) => {

    // dispatch({
    //     type: START_LOADER,
    // }); 
    const formdata = JSON.stringify({"user_id":userid})
    
    axios.post(api_url+'chat/chat_history', formdata ,config)
    .then((res) => {
        if(res.data && res.data.status === "true") {
            dispatch({
                type: GET_USER_CHATS,
                payload: res.data.data,
            });
        }
        else {
            dispatch({
                type: GET_USER_CHATS,
                payload: [],
            });
        }
        dispatch({
            type: GET_ADMIN_CHATS,
            payload: res.data.admin,
        });
        /* dispatch({
            type: STOP_LOADER,
        });  */   
    })
    .catch((err) => {
        /* dispatch({
            type: STOP_LOADER,
        }); */
        alert(err);
    });    
}

// ------Add Chats Action------
export const sendMessage = (user_id,receiver_id,message) => (dispatch) => {

    // dispatch({
    //     type: START_LOADER,
    // });
    const formdata = JSON.stringify({"user_id":user_id,"receiver_id":receiver_id,"message":message})
    axios.post(api_url+'chat/send_a_message', formdata ,config)
    .then((res) => {
        if(res.data && res.data.status === "true") {
            dispatch({
                type: ADD_CHATS,
                payload: res.data.data,
            });
            // dispatch(getAllChats(user_id,receiver_id))
        }
        else {
            dispatch({
                type: ADD_CHATS,
                payload: [],
            });
        }
        /* dispatch({
            type: STOP_LOADER,
        }); */
    })
    .catch((err) => {
        /* dispatch({
            type: STOP_LOADER,
        }); */
        alert(err);
    });    
}

// ------Meeting Request------
export const sendMettingRequest = (user_id,receiver_id) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    });
    const formdata = JSON.stringify({"user_id":user_id,"receiver_id":receiver_id})
    axios.post(api_url+'chat/send_meeting_request', formdata ,config)
    .then((res) => {
        if(res.data && res.data.status === "true") {
            alert(res.data.message)
        }
        else {
            alert(res.data.message)
        }
        dispatch({
            type: STOP_LOADER,
        });
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });    
}