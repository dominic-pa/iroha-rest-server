import { NextFunction, Request, Response, Router } from 'express';

import { AppendRoleRequest, CreateRoleRequest, DetachRoleRequest } from '../interfaces/requests/CommandRequests';
import { GetRolePermissionsRequest, GetRolesRequest } from '../interfaces/requests/QueryRequests';
import IrohaCommandService = require('../services/IrohaCommandService');
import IrohaQueryService from '../services/IrohaQueryService';


class RoleController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Role Commands
    this._appendRole();
    this._createRole();
    this._detachRole();
    //Role Queries
    this._getRolePermissions();
    this._getRoles();
  }

  private async _appendRole() {
    await this._router.post('/appendRole', (req: Request, res: Response, next: NextFunction) => {
      let appendRoleRequest = new AppendRoleRequest(req.body.accountId, req.body.roleName);
      appendRoleRequest = req.body;
      console.log("Incoming request for command *appendRole* ::: %s",appendRoleRequest);

      this._irohaCommandService.appendRole(appendRoleRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });
    });
  }

  //TODO:: FIX THIS COMMAND
  private async _createRole() {
    await this._router.post('/createRole', (req: Request, res: Response, next: NextFunction) => {
      let createRoleRequest = new CreateRoleRequest(req.body.roleName, req.body.permissionsList);
      createRoleRequest = req.body;
      console.log("Incoming request for command *createRole* ::: %s",createRoleRequest);
      
      this._irohaCommandService.createRole(createRoleRequest,req.headers)
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

  private async _detachRole() {
    await this._router.post('/detachRole', (req: Request, res: Response, next: NextFunction) => {
      let detachRoleRequest = new DetachRoleRequest(req.body.accountId, req.body.roleName);
      detachRoleRequest = req.body;
      console.log("Incoming request for command *detachRole* ::: %s",detachRoleRequest);

      this._irohaCommandService.detachRole(detachRoleRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });
    });
  }

  private async _getRolePermissions() {
    await this._router.post('/getRolePermissions', (req: Request, res: Response, next: NextFunction) => {
      let getRolePermissionsRequest = new GetRolePermissionsRequest;
      getRolePermissionsRequest = req.body;
      console.log("Incoming request for query *getRolePermissions* ::: %s",getRolePermissionsRequest);

      this._irohaQueryService.getRolePermissions(getRolePermissionsRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.payload) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getRoles() {
    await this._router.get('/getRoles', (req: Request, res: Response, next: NextFunction) => {
      console.log("Incoming request for query *getRoles* ::: %s");

      this._irohaQueryService.getRoles(req.headers)
        .then(irohaResponse => {
          if (irohaResponse.length === 0) {
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
export = new RoleController().router;