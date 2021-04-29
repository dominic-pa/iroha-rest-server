import { NextFunction, Request, Response, Router } from 'express';

import { AddPeerRequest, RemovePeerRequest } from '../interfaces/requests/CommandRequests';
import cryptoHelper from 'iroha-helpers-ts/lib/cryptoHelper';
import IrohaCommandService = require('../services/IrohaCommandService');
import IrohaQueryService from '../services/IrohaQueryService';


class PeerController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Peer Commands
    this._addPeer();
    this._removePeer();
    //Peer Queries
    this._getPeers();
  }

  //TODO:: FIX THIS COMMAND
  private async _addPeer() {
    this._router.post('/addPeer', (req: Request, res: Response, next: NextFunction) => {
      let addPeerRequest = new AddPeerRequest(req.body.address, req.body.peerKey);
      let keyPair = cryptoHelper.generateKeyPair();
      addPeerRequest.address = req.body.address;
      addPeerRequest.peerKey = keyPair.publicKey;
      console.log("Incoming request for command *addPeer* ::: %s",addPeerRequest);

      this._irohaCommandService.addPeer(addPeerRequest,req.headers)
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

  private async _removePeer() {
    await this._router.post('/removePeer', (req: Request, res: Response, next: NextFunction) => {
      let removePeerRequest = new RemovePeerRequest(req.body.publicKey);
      removePeerRequest = req.body;
      console.log("Incoming request for command *removePeer* ::: %s",removePeerRequest);

      this._irohaCommandService.removePeer(removePeerRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });        
    });
  }

  private async _getPeers() {
    await this._router.get('/getPeers', (req: Request, res: Response, next: NextFunction) => {
      console.log("Incoming request for query *getPeers*");

      this._irohaQueryService.getPeers(req.headers)
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
export = new PeerController().router;