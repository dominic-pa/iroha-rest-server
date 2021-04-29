import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import pino  from 'pino';
import morgan from 'morgan';
import cryptoHelper from 'iroha-helpers-ts/lib/cryptoHelper';
import IrohaRouter from './routers/IrohaRouter';
import { IROHA_ACCOUNT_ID_HEADER, IROHA_ACCOUNT_KEY_HEADER } from './configs/IrohaConfig';



// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express();
    public router = IrohaRouter;
  }
  

// initialize server app
const server = new Server();
//const grpcCreds = grpc.credentials.createInsecure();
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

server.app.use(morgan('dev'));

server.app.use('*',function(req,res,next){
  //This check to make sure the correct request headers are set, otherwise throw 400
  let irohaAccountIdHeader = req.headers[IROHA_ACCOUNT_ID_HEADER];
  let irohaAccountKeyHeader = req.headers[IROHA_ACCOUNT_KEY_HEADER];

  console.log(Date.now() + " :: Checking for headers...");
  if (irohaAccountIdHeader && irohaAccountKeyHeader) {
    console.log("Iroha account id header:: ",irohaAccountIdHeader);
    console.log("Iroha account key header:: ",irohaAccountKeyHeader);
    //let isKeyValid = cryptoHelper.derivePublicKey(irohaAccountKeyHeader.toString());
    next();
  } else {
    res.status(400).send({"error": "Invalid. Iroha key or account id is missing.","status":"REJECTED"});
  }
});

server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

// make server app handle any route starting with '/api'
server.app.use('/api/v1', server.router);

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => logger.info(`>>> Server is running, listening on port ${port}`));
})();