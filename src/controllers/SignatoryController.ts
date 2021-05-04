import { NextFunction, Request, Response, Router } from 'express';

import { AddSignatoryRequest, RemoveSignatoryRequest } from '../interfaces/requests/CommandRequests';
import { GetSignatoriesRequest } from '../interfaces/requests/QueryRequests';
import cryptoHelper from 'iroha-helpers-ts/lib/cryptoHelper';
import IrohaCommandService = require('../services/IrohaCommandService');
import IrohaQueryService from '../services/IrohaQueryService';

class SignatoryController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Signatory Commands
    this._addSignatory();
    this._removeSignatory();
    //Signatory Queries
    this._getSignatories();

  }

  //TODO:: FIX THIS COMMAND
  private async _addSignatory() {
    await this._router.post('/addSignatory', (req: Request, res: Response, next: NextFunction) => {
      let addSignatoryRequest = new AddSignatoryRequest(req.body.accountId, req.body.publicKey);
      let keyPair = cryptoHelper.generateKeyPair();
      addSignatoryRequest.accountId = req.body.accountId;
      addSignatoryRequest.publicKey = keyPair.publicKey;
      console.log("Incoming request for command *addSignatory* ::: %s",addSignatoryRequest);


      this._irohaCommandService.addSignatory(addSignatoryRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });
    });
  }
  //END TODO::

  private async _removeSignatory() {
    await this._router.post('/removeSignatory', (req: Request, res: Response, next: NextFunction) => {
      let removeSignatoryRequest = new RemoveSignatoryRequest(req.body.accountId, req.body.publicKey);
      removeSignatoryRequest = req.body;
      console.log("Incoming request for command *removeSignatory* ::: %s",removeSignatoryRequest);

      this._irohaCommandService.removeSignatory(removeSignatoryRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });      
    });
  }

  private async _getSignatories() {
    await this._router.post('/getSignatories', (req: Request, res: Response, next: NextFunction) => {
      let getSignatoriesRequest = new GetSignatoriesRequest;
      getSignatoriesRequest = req.body;
      console.log("Incoming request for query *getSignatories* ::: %s",getSignatoriesRequest);

      this._irohaQueryService.getSignatories(getSignatoriesRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.legnth === 0) {
            res.status(204).json(irohaResponse);
          } else if(irohaResponse.length > 0){
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

}
export = new SignatoryController().router;