import { NextFunction, Request, Response, Router } from 'express';

import { AdjustAssetQuantityRequest, CreateAssetRequest,TransferAssetRequest } from '../interfaces/requests/CommandRequests';
import { GetAssetInfoRequest } from '../interfaces/requests/QueryRequests';
import IrohaCommandService = require('../services/IrohaCommandService');
import IrohaQueryService from '../services/IrohaQueryService';


class AssetController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Asset Commands
    this._addAssetQuantity();
    this._createAsset();
    this._subtractAssetQuantity();
    this._transferAsset();
    //Asset Queries
    this._getAssetInfo();
  }

  private async _addAssetQuantity() {
    this._router.post('/addAssetQuantity',  (req: Request, res: Response) => {
      let addAssetQuantityRequest = new AdjustAssetQuantityRequest(req.body.assetId, req.body.amount);
      addAssetQuantityRequest = req.body;
      console.log("Incoming request for command *addAssetQuantity* ::: %s",addAssetQuantityRequest);
      
       this._irohaCommandService.addAssetQuantity(addAssetQuantityRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });      
    });
  }

  private async _createAsset() {
    await this._router.post('/createAsset', (req: Request, res: Response, next: NextFunction) => {
      let createAssetRequest = new CreateAssetRequest(req.body.assetId,req.body.domainId,req.body.precision);
      createAssetRequest = req.body;
      console.log("Incoming request for command *createAsset* ::: %s",createAssetRequest);

      this._irohaCommandService.createAsset(createAssetRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });
    });
  }

  private async _subtractAssetQuantity() {
    this._router.post('/subtractAssetQuantity',  (req: Request, res: Response, next: NextFunction) => {
      let subtractAssetQuantityRequest = new AdjustAssetQuantityRequest(req.body.assetId, req.body.amount);
      subtractAssetQuantityRequest = req.body;
      console.log("Incoming request for command *subtractAssetQuantity* ::: %s",subtractAssetQuantityRequest);
      
       this._irohaCommandService.subtractAssetQuantity(subtractAssetQuantityRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });      
    });
  }

  private async _transferAsset() {
    await this._router.post('/transferAsset', (req: Request, res: Response, next: NextFunction) => {
      let transferAssetRequest = new TransferAssetRequest(req.body.srcAccountId, req.body.destAccountId, req.body.assetId, req.body.description, req.body.amount);
      transferAssetRequest = req.body;
      console.log("Incoming request for command *transferAsset* ::: %s",transferAssetRequest);
      
      this._irohaCommandService.transferAsset(transferAssetRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });  
    });
  }

  private async _getAssetInfo() {
    await this._router.post('/getAssetInfo', (req: Request, res: Response, next: NextFunction) => {
      let getAssetInfoRequest = new GetAssetInfoRequest;
      getAssetInfoRequest = req.body;
      console.log("Incoming request for query *getAssetInfo* ::: %s",getAssetInfoRequest);

      this._irohaQueryService.getAssetInfo(getAssetInfoRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.assetId) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

}

export = new AssetController().router;