import { Router } from 'express';
import {get,getOne} from './wikipedia';
/**
 * Map all the Apis here
 * @param config
 * @param db
 * @returns {*}
 */
export default ({ config, db }) => {
	let api = Router();
	//bind config as scope to function
	api.get('/', get.bind(config));
    api.get('/city', getOne.bind(config));
	return api;
}
