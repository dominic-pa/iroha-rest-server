import { NextFunction, query, Request, Response, Router } from 'express';

import { GetAccountRequest, GetAccountDetailRequest, GetAccountAssetsRequest, GetRawAccountRequest, GetAccountTransactionsRequest, GetAccountAssetTransactionsRequest} from '../interfaces/requests/QueryRequests';
import { CompareAndSetAccountDetailRequest, CreateAccountRequest, SetAccountDetailRequest, SetAccountQuorumRequest } from '../interfaces/requests/CommandRequests';
import IrohaCommandService = require('../services/IrohaCommandService');
import IrohaQueryService from '../services/IrohaQueryService';
import url from 'url';
import queryString from 'querystring';


class AccountController {
  private _router = Router();
  private _irohaCommandService = IrohaCommandService;
  private _irohaQueryService = IrohaQueryService;

  get router() {
    return this._router;
  }

  constructor() {
    //Account Commands
    this._compareAndSetAccountDetail();
    this._createAccount();
    this._setAccountDetail();
    this._setAccountQuorum();
    //Account Queries
    this._getAccount();
    this._getAccountDetail();
    this._getAccountAssets();
    this._getRawAccount();
    this._getAccountTransactions();
    this._getAccountAssetTransactions();
  }

  private async _compareAndSetAccountDetail() {
    await this._router.post('/compareAndSetAccountDetail', (req: Request, res: Response, next: NextFunction) => {
      let compareAndSetAccountDetailRequest = new CompareAndSetAccountDetailRequest(req.body.accountId, req.body.key, req.body.value, req.body.oldValue, req.body.emptyCheck);
      compareAndSetAccountDetailRequest = req.body;
      console.log("Incoming request for command *compareAndSetAccountDetail* ::: %s",compareAndSetAccountDetailRequest);

      this._irohaCommandService.compareAndSetAccountDetail(compareAndSetAccountDetailRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _createAccount() {
    await this._router.post('/createAccount', (req: Request, res: Response, next: NextFunction) => {
      let createAccountRequest = new CreateAccountRequest(req.body.accountId, req.body.domainId, req.body.publickey);
      createAccountRequest = req.body;
      console.log("Incoming request for command *createAccount* ::: %s",createAccountRequest);

      this._irohaCommandService.createAccount(createAccountRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });
    });
  }

  private async _setAccountDetail() {
    await this._router.post('/setAccountDetail', (req: Request, res: Response, next: NextFunction) => {
      let setAccountDetailRequest = new SetAccountDetailRequest(req.body.accountId, req.body.value, req.body.key);
      setAccountDetailRequest = req.body;
      console.log("Incoming request for command *setAccountDetail* ::: %s",setAccountDetailRequest);

      this._irohaCommandService.setAccountDetail(setAccountDetailRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });  
    });
  }



  private async _setAccountQuorum() {
    await this._router.post('/setAccountQuorum', (req: Request, res: Response, next: NextFunction) => {
      let setAccountQuorumRequest = new SetAccountQuorumRequest(req.body.accountId, req.body.quorum);
      setAccountQuorumRequest = req.body;
      console.log("Incoming request for command *setAccountQuorum* ::: %s",setAccountQuorumRequest);

      this._irohaCommandService.setAccountQuorum(setAccountQuorumRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.status === 'COMMITTED') {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
      });  
    });
  }

  //QUERIES
  private async _getAccount() { 
    await this._router.get('/getAccount/:accountId', (req: Request, res: Response, next: NextFunction) => {
      let getAccountRequest = new GetAccountRequest(req.params.accountId,req.body.accountId);
      console.log("Incoming request for query *getAccount* ::: %s",getAccountRequest);

      this._irohaQueryService.getAccount(getAccountRequest,req.headers)
        .then(irohaResponse => {
          if(irohaResponse.accountId) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });            
    });
  }

  private async _getAccountDetail() {
    await this._router.post('/getAccountDetail', (req: Request, res: Response, next: NextFunction) => {
      let getAccountDetailRequest = new GetAccountDetailRequest;
      getAccountDetailRequest = req.body;
      console.log("Incoming request for query *getAccountDetail* ::: %s",getAccountDetailRequest);

      this._irohaQueryService.getAccountDetail(getAccountDetailRequest,req.headers)
        .then(irohaResponse => {
          if(irohaResponse.length === 0) {
            res.status(204).json(irohaResponse);
          } else if (irohaResponse) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getAccountAssets() {
    await this._router.post('/getAccountAssets', (req: Request, res: Response, next: NextFunction) => {
      let getAccountAssetsRequest = new GetAccountAssetsRequest;
      getAccountAssetsRequest = req.body;
      console.log("Incoming request for query *getAccountAssets* ::: %s",getAccountAssetsRequest);

      this._irohaQueryService.getAccountAssets(getAccountAssetsRequest,req.headers)
        .then(irohaResponse => {
          if(irohaResponse.length === 0) {
            res.status(204).json(irohaResponse);
          } else if (irohaResponse.length > 0) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

  private async _getRawAccount() {
    await this._router.get('/getRawAccount/:accountId', (req: Request, res: Response, next: NextFunction) => {
      let getRawAccountRequest = new GetRawAccountRequest;
      getRawAccountRequest = {"accountId": req.params.accountId};
      console.log("Incoming request for query *getRawAccount* ::: %s",getRawAccountRequest);

      this._irohaQueryService.getRawAccount(getRawAccountRequest,req.headers)
        .then(irohaResponse => {
          if (irohaResponse.array) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });;
      
    });
  }

  private async _getAccountTransactions() {
    await this._router.post('/getAccountTransactions', (req: Request, res: Response, next: NextFunction) => {
      let getAccountTxRequest = new GetAccountTransactionsRequest;
      getAccountTxRequest = req.body;
      console.log("Incoming request for query *getAccountTransactions* ::: %s",getAccountTxRequest);

      this._irohaQueryService.getAccountTransactions(getAccountTxRequest,req.headers)
        .then(irohaResponse => {
          if(irohaResponse.transactionsList) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
     
    });
  }

  private async _getAccountAssetTransactions() {
    await this._router.post('/getAccountAssetTransactions', (req: Request, res: Response, next: NextFunction) => {
      let getAccountAssetTransactionsRequest = new GetAccountAssetTransactionsRequest;
      getAccountAssetTransactionsRequest = req.body;
      console.log("Incoming request for query *getAccountAssetTransactions* ::: %s",getAccountAssetTransactionsRequest);

      this._irohaQueryService.getAccountAssetTransactions(getAccountAssetTransactionsRequest,req.headers)
        .then(irohaResponse => {
          if(irohaResponse.allTransactionsSize === 0) {
            res.status(204).json(irohaResponse);
          } else if (irohaResponse.allTransactionsSize > 0) {
            res.status(200).json(irohaResponse);
          } else {
            res.status(500).json(irohaResponse);
          }
        });
    });
  }

}
export = new AccountController().router;