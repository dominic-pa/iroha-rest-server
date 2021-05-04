import { NextFunction, Request, Response, Router } from 'express';

import { RevokePermissionRequest, GrantablePermissionRequest } from '../interfaces/requests/CommandRequests';
import cryptoHelper from 'iroha-helpers-ts/lib/cryptoHelper';
import IrohaCommandService = require('../services/IrohaCommandService');

class GrantablePermissionController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;

  get router() {
    return this._router;
  }

  constructor() {
    //GrantablePermission Commands
    this._grantPermission();
    this._revokePermission();
  }

  //TODO:: FIX THIS COMMAND
  private async _grantPermission() {
    await this._router.post('/grantPermission', (req: Request, res: Response, next: NextFunction) => {
      let grantablePermissionRequest = new GrantablePermissionRequest(req.body.accountId, req.body.permission);
      grantablePermissionRequest = req.body;
      console.log("Incoming request for command *grantPermission* ::: %s",grantablePermissionRequest);

      this._irohaCommandService.grantPermission(grantablePermissionRequest,req.headers)
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

  private async _revokePermission() {
    await this._router.post('/revokePermission', (req: Request, res: Response, next: NextFunction) => {
      let revokePermissionRequest = new RevokePermissionRequest(req.body.accountId, req.body.permission);
      revokePermissionRequest = req.body;
      console.log("Incoming request for command *revokePermission* ::: %s",revokePermissionRequest);

      this._irohaCommandService.revokePermission(revokePermissionRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });  
    });
  }

}
export = new GrantablePermissionController().router;