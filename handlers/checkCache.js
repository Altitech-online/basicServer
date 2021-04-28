import {v4} from 'uuid';
import {getItem, putItem} from '../helpers/dynamo';
import sortJsonObject from '../helpers/jsonSorter';
import bigFatDelay from '../helpers/bigFatDelay';
import config from '../config';

const twentyFourHours = 864e5;

export const checkCache = async (request) => {
    const { payload: {body} } = request;

    const {CACHE_TABLE_NAME, QUOTE_STORE_TABLE_NAME, DAYS_TO_EXPIRE} = config.get();
    const sortedBody = sortJsonObject(body);
    const bodyAsKey = JSON.stringify(sortedBody);
    const itemKey = {
        body: bodyAsKey
    }
    const itemExists = await getItem(itemKey, CACHE_TABLE_NAME);
    if(itemExists) {
        return {
            key: itemExists.key
        }
    } else {
        const key = v4();
        const ttl = new Date(Date.now() + (twentyFourHours * parseInt(DAYS_TO_EXPIRE))).getTime()
        const cacheParams = {
            body: bodyAsKey,
            key,
            ttl
        }
        //do some quote stuff
        await bigFatDelay(5000);
        const quote = `a quote for ${body.name}`
        const storeParams = {
            key,
            ttl,
            quote
        }
        await putItem(cacheParams, CACHE_TABLE_NAME);
        await putItem(storeParams, QUOTE_STORE_TABLE_NAME);
        return {key};
    }
};

export default {
    method: 'post',
    path: '/chache',
    handler: checkCache,
}