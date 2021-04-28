import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import handlers from './handlers';
import config from './config';

const {SERVER_HOST, SERVER_PORT} = config.get();
const server = Hapi.server({
        port: SERVER_PORT,
        host: SERVER_HOST
});
     
const init = async () => {
   await server.register([
       Inert,
   ]);
     
   await server.start();
   
   console.log(`Server running on ${SERVER_HOST} port ${SERVER_PORT}`);
   
   server.route(handlers);
}; 

init(); 

export default init;