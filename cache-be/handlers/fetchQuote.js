import {getItem} from '../helpers/dynamo';
import config from '../config';

export const fetchQuote = async (request) => {
    const { headers: {key} } = request;

    const {QUOTE_STORE_TABLE_NAME} = config.get();
    
    const quoteKey = {
        key
    }
    const quote = await getItem(quoteKey, QUOTE_STORE_TABLE_NAME);
    
    return quote
};

export default {
    method: 'get',
    path: '/quote',
    handler: fetchQuote,
}