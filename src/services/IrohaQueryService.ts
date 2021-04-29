import grpc from 'grpc';
import {
    QueryService_v1Client as QueryService
  } from 'iroha-helpers-ts/lib/proto/endpoint_grpc_pb';
import queriesInit from 'iroha-helpers-ts/lib/queries/index';
import { IROHA_ACCOUNT_ID_HEADER, IROHA_ACCOUNT_KEY_HEADER, IROHA_DEFAULT_PRIM_KEY, IROHA_QUERY_SERVICE_TIMEOUT } from '../configs/IrohaConfig';
import { IROHA_PEER_ADDR } from '../configs/IrohaConfig';
import { setIrohaErrorResp, setIrohaSuccessResp } from '../utils/Utils'
import { GetAccountAssetsRequest, GetAccountAssetTransactionsRequest, GetAccountDetailRequest, GetAccountRequest, GetAccountTransactionsRequest, GetAssetInfoRequest, GetBlockRequest, GetEngineReceiptsRequest, GetPendingTxsRequest, GetRawAccountRequest, GetRolePermissionsRequest, GetSignatoriesRequest, GetTransactionsRequest } from '../interfaces/requests/QueryRequests';

class QueriesController {

  // QUERIES
    private queryService = new QueryService(IROHA_PEER_ADDR, grpc.credentials.createInsecure());
    private adminPriv = IROHA_DEFAULT_PRIM_KEY;
    private queries = queriesInit;

    private QUERY_OPTIONS = {
        privateKey: this.adminPriv,
        creatorAccountId: IROHA_DEFAULT_PRIM_KEY,
        queryService: this.queryService,
        timeoutLimit: IROHA_QUERY_SERVICE_TIMEOUT,
    };

    // QUERIES

    // TO DO - CHECK IF IT WORKS
    getAccount(getAccountRequest: GetAccountRequest, queryOptions: any) : Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAccount(this.QUERY_OPTIONS, {accountId: getAccountRequest.accountId})
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        }); 
    };

    getAccountTransactions(getAccountTransactionsRequest: GetAccountTransactionsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAccountTransactions(this.QUERY_OPTIONS, getAccountTransactionsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        }); 
    };

    getAccountAssets(getAccountAssetsRequest: GetAccountAssetsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAccountAssets(this.QUERY_OPTIONS, getAccountAssetsRequest)
      .then((resp: any) => {
        return setIrohaSuccessResp(resp);      
      })
      .catch((err) => {
        return setIrohaErrorResp(err);          
      }); 
    };
    
    getAccountDetail(getAccountDetailRequest: GetAccountDetailRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAccountDetail(this.QUERY_OPTIONS, getAccountDetailRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    // NEED TO SET UP TRANSACTION
    getAccountAssetTransactions(getAccountAssetTransactionsRequest: GetAccountAssetTransactionsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAccountAssetTransactions(this.QUERY_OPTIONS, getAccountAssetTransactionsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getAssetInfo(getAssetInfoRequest: GetAssetInfoRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getAssetInfo(this.QUERY_OPTIONS, getAssetInfoRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };
    
    getBlock(getBlockRequest: GetBlockRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getBlock(this.QUERY_OPTIONS, getBlockRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };
    // MIGHT NEED TO DO ADDITIONAL WORK IN IROHA HELPERS "Protobuf Query: [[query is undefined ]]""
    getEngineReceipts(getEngineReceiptsRequest: GetEngineReceiptsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getEngineReceipts(this.QUERY_OPTIONS, getEngineReceiptsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };
      // NEED can_get_peers PERMISSION
    getPeers(queryOptions: any): Promise<any>{
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getPeers(this.QUERY_OPTIONS)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getPendingTransactions(getPendingTxsRequest: GetPendingTxsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getPendingTransactions(this.QUERY_OPTIONS, getPendingTxsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getRawAccount(getRawAccountRequest: GetRawAccountRequest, queryOptions: any):Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getRawAccount(this.QUERY_OPTIONS, getRawAccountRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getRawPendingTransactions(queryOptions: any):Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getRawPendingTransactions(this.QUERY_OPTIONS)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getRolePermissions(getRolePermissionsRequest: GetRolePermissionsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getRolePermissions(this.QUERY_OPTIONS, getRolePermissionsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getRoles(queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getRoles(this.QUERY_OPTIONS)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getSignatories(getSignatoriesRequest: GetSignatoriesRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getSignatories(this.QUERY_OPTIONS, getSignatoriesRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

    getTransactions(getTransactionsRequest: GetTransactionsRequest, queryOptions: any): Promise<any> {
      this.QUERY_OPTIONS.creatorAccountId = queryOptions[IROHA_ACCOUNT_ID_HEADER];
      this.QUERY_OPTIONS.privateKey = queryOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.queries.getTransactions(this.QUERY_OPTIONS, getTransactionsRequest)
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
      }); 
    };

  }
  
  export = new QueriesController();