import { NextFunction, Request, Response, Router } from 'express';

import { GetTransactionsRequest, GetPendingTxsRequest } from '../interfaces/requests/QueryRequests';
import IrohaQueryService from '../services/IrohaQueryService';

class TransactionController {
  private _router = Router();
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Transaction Queries
    this._getPendingTransactions();
    this._getRawPendingTransactions();
    this._getTransactions();
  }

  private async _getPendingTransactions() {
    await this._router.post('/getPendingTransactions', (req: Request, res: Response, next: NextFunction) => {
      let getPendingTxsRequest = new GetPendingTxsRequest;
      getPendingTxsRequest = req.body;
      console.log("Incoming request for query *getEngineReceipts* ::: %s",getPendingTxsRequest);

      this._irohaQueryService.getPendingTransactions(getPendingTxsRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.length === 0) {
            res.status(204).json(irohaResponse);
          } else if(irohaResponse.length > 0) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getRawPendingTransactions() {
    await this._router.get('/getRawPendingTransactions', (req: Request, res: Response, next: NextFunction) => {
      console.log("Incoming request for query *getRawPendingTransactions* ::: %s");
      
      this._irohaQueryService.getRawPendingTransactions(req.headers)
        .then(irohaResponse => {
          if (irohaResponse.payload) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getTransactions() {
    await this._router.post('/getTransactions', (req: Request, res: Response, next: NextFunction) => {
      let getTransactionsRequest = new GetTransactionsRequest;
      getTransactionsRequest = req.body;
      console.log("Incoming request for query *getTransactions* ::: %s",getTransactionsRequest);
      
      this._irohaQueryService.getTransactions(getTransactionsRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.array) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

}
export = new TransactionController().router;