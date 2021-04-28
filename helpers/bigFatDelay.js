import {promisify} from 'util';
const delay = promisify(setTimeout);

export default async function bigFatDelay(time) {
    await delay(time);
};