import { BatchBuilder, TxBuilder, Chain } from "iroha-helpers-ts/lib/chain";
import { Transaction } from "iroha-helpers-ts/lib/proto/transaction_pb";
import { AddPeerRequest, AddSignatoryRequest, AdjustAssetQuantityRequest, AppendRoleRequest, BatchAddPeerRequest, CompareAndSetAccountDetailRequest, CreateAccountRequest, CreateAssetRequest, CreateDomainRequest, CreateRoleRequest, DetachRoleRequest, GrantablePermissionRequest, RemovePeerRequest, RemoveSignatoryRequest, RevokePermissionRequest, SetAccountDetailRequest, SetAccountQuorumRequest, TransferAssetRequest } from "../interfaces/requests/CommandRequests";
import * as Constants from "../utils/Constants";
import {
    CommandService_v1Client as CommandService
  } from 'iroha-helpers-ts/lib/proto/endpoint_grpc_pb';
import { IROHA_COMMAND_DEFAULT_QUORUM, IROHA_COMMAND_SERVICE_TIMEOUT, IROHA_PEER_ADDR } from "../configs/IrohaConfig";
import * as grpc from 'grpc';
import { Buffer as BF } from 'buffer'
import cryptoHelper from "iroha-helpers-ts/lib/cryptoHelper";
import { sha3_256 as sha3 } from 'js-sha3'
import { Signature } from "iroha-helpers-ts/lib/proto/primitive_pb";
import cloneDeep from 'lodash.clonedeep';



class IrohaBatchService {

    private batchArrayList: Array<Transaction> = [];
    
    private commandService = new CommandService(IROHA_PEER_ADDR,grpc.credentials.createInsecure(),{});

    constructor(){}

    public sendBatchTransactions(batchTxs:any, txCreatorAccount:any) {
        this.batchArrayList = [];
        // new TxBuilder()
        //     .createAccount({
        //         accountName: 'user1',
        //         domainId: 'atlas',
        //         publicKey: '0000000000000000000000000000000000000000000000000000000000000000'
        //     })
        //     .addMeta(txCreatorAccount.accountId, 1)
        //     .send(this.commandService)
        //     .then(res => console.log(res))
        //     .catch(err => console.error(err))



        batchTxs.forEach((tx: any) => {
            this.selectAndAddBatchTransaction(tx,txCreatorAccount);
        });
        
        console.log(this.batchArrayList);

        let testBatch = new BatchBuilder(this.batchArrayList).setBatchMeta(0);
        let numberOfTxs = this.batchArrayList.length;
        let finalBatch = new Chain([]);

        // for (let i = 0; i < numberOfTxs; i++) {
        //     finalBatch = testBatch.sign([txCreatorAccount.irohaAccountKey],i);
        // }
        return new BatchBuilder(this.batchArrayList)
            .setBatchMeta(0)
            .signBatch([txCreatorAccount.irohaAccountKey],this.batchArrayList)
            .send(this.commandService, IROHA_COMMAND_SERVICE_TIMEOUT);

        // let finalBatch = new BatchBuilder(this.batchArrayList).setBatchMeta(0);
        // finalBatch = testBatch;

        finalBatch
        .sign([txCreatorAccount.irohaAccountKey],0)
        .sign([txCreatorAccount.irohaAccountKey],1);
        // finalBatch = new Chain(testBatch
        //     .sign([txCreatorAccount.irohaAccountKey],0).txs);

            

        
        return finalBatch.send(this.commandService, IROHA_COMMAND_SERVICE_TIMEOUT);

        return new BatchBuilder(this.batchArrayList)
            .setBatchMeta(0)
            .sign([txCreatorAccount.irohaAccountKey],0)
            .sign([txCreatorAccount.irohaAccountKey],1)
            .send(this.commandService, IROHA_COMMAND_SERVICE_TIMEOUT)
            .then(finalBatchResp => {
              console.log("finalBatch response",finalBatchResp);
              return finalBatchResp;
            })
            .catch(err => {
              console.error(err);
              return 'REJECTED';
            });
    }

    private signBatch (transaction:Transaction, privateKeyHex:string){
        const privateKey = BF.from(privateKeyHex, 'hex')
        const publicKey = cryptoHelper.derivePublicKey(privateKeyHex)
      
        const payloadHash = this.hash(transaction)
      
        const signatory = cryptoHelper.sign(payloadHash, publicKey, privateKey)
      
        const s = new Signature()
        s.setPublicKey(publicKey.toString('hex'))
        s.setSignature(signatory.toString('hex'))
      
        const signedTransactionWithSignature = cloneDeep(transaction)
        signedTransactionWithSignature.addSignatures(s, signedTransactionWithSignature.getSignaturesList.length)
      
        return signedTransactionWithSignature
      }

    private hash (transaction:any) {
        return BF.from(sha3.array(transaction.getPayload().serializeBinary()))
    }

    private selectAndAddBatchTransaction(batchTxReq:any, txCreatorAccount:any){
        switch(batchTxReq.command) {
            case Constants.CMD_ADD_ASSET_QUANTITY:
                this.batchArrayList.push(this.addAssetQuantityTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_ADD_SIGANTORY:
                this.batchArrayList.push(this.addSignatoryTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_APPEND_ROLE:
                this.batchArrayList.push(this.appendRoleTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_COMPARE_AND_SET_ACCOUNT_DETAIL:
                this.batchArrayList.push(this.compareAndSetAccountDetailTx(batchTxReq,txCreatorAccount));
                break;
            case Constants.CMD_CREATE_ACCOUNT:
                this.batchArrayList.push(this.createAccountTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_CREATE_ASSET:
                this.batchArrayList.push(this.createAssetTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_CREATE_DOMAIN:
                this.batchArrayList.push(this.createDomainTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_CREATE_ROLE:
                this.batchArrayList.push(this.createRoleTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_DETACH_ROLE:
                this.batchArrayList.push(this.detachRoleTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_GRANT_PERMISSION:
                this.batchArrayList.push(this.grantPermissionTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_REMOVE_PEER:
                this.batchArrayList.push(this.removePeerTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_REMOVE_SIGNATORY:
                this.batchArrayList.push(this.removeSignatoryTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_REVOKE_PERMISSION:
                this.batchArrayList.push(this.revokePermissionTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_SET_ACCOUNT_DETAIL:
                this.batchArrayList.push(this.setAccountDetailTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_SET_ACCOUNT_QUORUM:
                this.batchArrayList.push(this.setAccountQuorumTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_SUB_ASSET_QUANTITY:
                this.batchArrayList.push(this.subtractAssetQuantityTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_TRANSFER_ASSET_QUANTITY:
                this.batchArrayList.push(this.transferAssetTx(batchTxReq.tx,txCreatorAccount));
                break;
            case Constants.CMD_ADD_PEER:
                this.batchArrayList.push(this.addPeerTx(batchTxReq.tx,txCreatorAccount));
                break;
            default:
              return "Error selecting transaction";
          }
    }

    private addAssetQuantityTx(batchTransactionRequest: AdjustAssetQuantityRequest,irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .addAssetQuantity(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private addSignatoryTx(batchTransactionRequest: AddSignatoryRequest,irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .addSignatory(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private appendRoleTx(batchTransactionRequest: AppendRoleRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .appendRole(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private compareAndSetAccountDetailTx(batchTransactionRequest: CompareAndSetAccountDetailRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .compareAndSetAccountDetail(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private createAccountTx(batchTransactionRequest: CreateAccountRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .createAccount(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private createAssetTx(batchTransactionRequest: CreateAssetRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .createAsset(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            //.sign([irohaTxCreatorAccount.irohaAccountKey])
            .tx;
            //this.signBatch(transaction,irohaTxCreatorAccount.irohaAccountId)
        return transaction;
    };

    private createDomainTx(batchTransactionRequest: CreateDomainRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .createDomain(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            //.sign([irohaTxCreatorAccount.irohaAccountKey])
            .tx;
            //this.signBatch(transaction,irohaTxCreatorAccount.irohaAccountId)

        return transaction;
    };

    private createRoleTx(batchTransactionRequest: CreateRoleRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .createRole(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private detachRoleTx(batchTransactionRequest: DetachRoleRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .detachRole(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private grantPermissionTx(batchTransactionRequest: GrantablePermissionRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .grantPermission(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private removePeerTx(batchTransactionRequest: RemovePeerRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .removePeer(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private addPeerTx(batchTransactionRequest: BatchAddPeerRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .addPeer(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private removeSignatoryTx(batchTransactionRequest: RemoveSignatoryRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .removeSignatory(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private revokePermissionTx(batchTransactionRequest: RevokePermissionRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .revokePermission(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private setAccountDetailTx(batchTransactionRequest: SetAccountDetailRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .setAccountDetail(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private setAccountQuorumTx(batchTransactionRequest: SetAccountQuorumRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .setAccountQuorum(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private subtractAssetQuantityTx(batchTransactionRequest: AdjustAssetQuantityRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .subtractAssetQuantity(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };

    private transferAssetTx(batchTransactionRequest: TransferAssetRequest, irohaTxCreatorAccount: any): Transaction {
        let transaction = new TxBuilder()
            .transferAsset(batchTransactionRequest)
            .addMeta(irohaTxCreatorAccount.irohaAccountId, IROHA_COMMAND_DEFAULT_QUORUM)
            .tx;

        return transaction;
    };
    
    
}

export = new IrohaBatchService();