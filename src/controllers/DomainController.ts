import { NextFunction, Request, Response, Router } from 'express';

import { CreateDomainRequest } from '../interfaces/requests/CommandRequests';
import IrohaCommandService = require('../services/IrohaCommandService');

class DomainController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;

  get router() {
    return this._router;
  }

  constructor() {
    //Domain Commands
    this._createDomain();
  }

  private async _createDomain() {
    await this._router.post('/createDomain', (req: Request, res: Response, next: NextFunction) => {
      let createDomainRequest = new CreateDomainRequest(req.body.domainId,req.body.defaultRole);
      createDomainRequest = req.body;
      console.log("Incoming request for command *createDomain* ::: %s",createDomainRequest);

      this._irohaCommandService.createDomain(createDomainRequest,req.headers)
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
export = new DomainController().router;