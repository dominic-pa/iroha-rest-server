import { NextFunction, Request, Response, Router } from 'express';

import IrohaBatchService from '../services/IrohaBatchService';
import { TxBuilder, BatchBuilder } from 'iroha-helpers-ts/lib/chain'
import { IROHA_ACCOUNT_ID_HEADER, IROHA_ACCOUNT_KEY_HEADER } from '../configs/IrohaConfig';


class BatchTransactionController {
  private _router = Router();
  private irohaBatchService = IrohaBatchService;

  get router() {
    return this._router;
  }

  constructor() {
    this._sendBatchTx();
  }

  private async _sendBatchTx() {
    await this._router.post('/sendBatchTx', (req: Request, res: Response, next: NextFunction) => {
        let batchTxRequest:any = req.body.batchTxs;
        let txCreatorAccount:any = {
          irohaAccountId: req.headers[IROHA_ACCOUNT_ID_HEADER],
          irohaAccountKey: req.headers[IROHA_ACCOUNT_KEY_HEADER]
        };
        this.irohaBatchService.sendBatchTransactions(batchTxRequest, txCreatorAccount)
            .then((finalBatchResp:any) => {
                if(finalBatchResp != 'REJECTED') {
                  res.status(200).send(finalBatchResp);
                } else {
                  res.status(500).send("Error creating batch transaction.");
                }
                
            })
            .catch((err:any) => {
                console.error(err);
                res.status(500).send(err.message);
            });
    });
  }

}
export = new BatchTransactionController().router;