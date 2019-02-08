/*
  Exports action name and function for cities
*/

import axios from 'axios';
import {API} from '../config';


// Action name
export const GET_CITIES = "GET_CITIES";


/**
 * Get Cities
 * @returns {{type: string, payload: Promise.<{text: string}>}}
 */
export function getCities(){
    const config = {
        url: API.SERVER_API,
        method: 'GET'
    };
    const request = axios.request(config);
    return {
        type: GET_CITIES,
        payload: request
    }
}
