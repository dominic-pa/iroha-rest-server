import { NextFunction, Request, response, Response, Router } from 'express';
import QueriesController from '../services/IrohaQueryService';
import *  as QueryRequests from '../interfaces/requests/QueryRequests';

class MiscQueriesController {
  private _router = Router();
  private _controller = QueriesController;

  get router() {
    return this._router;
  }

  constructor() {
    //Misc queries
    this._getBlock();
    this._getEngineReceipts();

  }

  // QUERIES

  private async _getBlock() {
    await this._router.post('/getBlock', (req: Request, res: Response, next: NextFunction) => {
      let getBlockRequest = new QueryRequests.GetBlockRequest;
      getBlockRequest = req.body;
      console.log("Incoming request for query *getBlock* ::: %s",getBlockRequest);

      this._controller.getBlock(getBlockRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.payload) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getEngineReceipts() {
    await this._router.post('/getEngineReceipts', (req: Request, res: Response, next: NextFunction) => {
      let getEngineReceiptsRequest = new QueryRequests.GetEngineReceiptsRequest;
      getEngineReceiptsRequest = req.body;
      console.log("Incoming request for query *getEngineReceipts* ::: %s",getEngineReceiptsRequest);

      this._controller.getEngineReceipts(getEngineReceiptsRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.payload) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });

    });
  }
}

export = new MiscQueriesController().router;