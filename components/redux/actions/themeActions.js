import axios from "axios";
import { THEME_SETTINGS, DISPLAY_SETTING } from "./type";
import Config from "../../utils/Config";

const api_url = Config.api_url;

const config = {
    headers: {
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

export const getSettings = () => (dispatch) => {

    axios.get(api_url+'settings', config)
    .then((res) => {
        // console.log(res.data.data);
        if(res.data && res.data.status === "true") {
            dispatch({
                type: THEME_SETTINGS,
                payload: res.data.data,
            });
            dispatch({
                type: DISPLAY_SETTING,
                payload: res.data.visible,
            });
        }
        else {
            dispatch({
                type: THEME_SETTINGS,
                payload: [],
            });  
        }
    })
    .catch((err) => {    
        // alert(err);
    });
}