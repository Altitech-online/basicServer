import result from 'dotenv';

const config = result.config();

if (config.error) {
    throw result.error;
}

export default {
    get: ()=> ({...process.env}),
};
