import * as grpc from 'grpc';
import {
    CommandService_v1Client as CommandService
  } from 'iroha-helpers-ts/lib/proto/endpoint_grpc_pb';
import commandsInit from 'iroha-helpers-ts/lib/commands/index';
import { setIrohaErrorResp, setIrohaSuccessResp } from '../utils/Utils';
import { AdjustAssetQuantityRequest, AddPeerRequest, AddSignatoryRequest, AppendRoleRequest, CompareAndSetAccountDetailRequest, CreateAccountRequest, CreateAssetRequest, CreateDomainRequest, CreateRoleRequest, DetachRoleRequest, GrantablePermissionRequest, RemovePeerRequest, RemoveSignatoryRequest, RevokePermissionRequest, SetAccountDetailRequest, SetAccountQuorumRequest, TransferAssetRequest } from '../interfaces/requests/CommandRequests';
import { IROHA_ACCOUNT_ID_HEADER, IROHA_ACCOUNT_KEY_HEADER, IROHA_DEFAULT_PRIM_KEY, IROHA_COMMAND_SERVICE_TIMEOUT, IROHA_COMMAND_DEFAULT_QUORUM } from '../configs/IrohaConfig';
import { IROHA_PEER_ADDR } from '../configs/IrohaConfig';

class CommandsController {

    // COMMANDS    
    private adminAccount = IROHA_DEFAULT_PRIM_KEY;
    private commandService = new CommandService(IROHA_PEER_ADDR,grpc.credentials.createInsecure());
    private adminPriv = IROHA_DEFAULT_PRIM_KEY;
    private commands = commandsInit;
    
    private COMMAND_OPTIONS = {
        privateKeys: [this.adminPriv],
        creatorAccountId: this.adminAccount,
        quorum: IROHA_COMMAND_DEFAULT_QUORUM,
        commandService: this.commandService,
        timeoutLimit: IROHA_COMMAND_SERVICE_TIMEOUT,
    };

      // COMMANDS
    addAssetQuantity(addAssetQuantityRequest: AdjustAssetQuantityRequest,commandOptions: any): Promise<any> {
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.addAssetQuantity(this.COMMAND_OPTIONS, {
        assetId: addAssetQuantityRequest.assetId,
        amount: addAssetQuantityRequest.amount
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };
    //TODO:: FIX THIS COMMAND
    addPeer(addPeerRequest: AddPeerRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.addPeer(this.COMMAND_OPTIONS, {
        address: addPeerRequest.address,
        peerKey: addPeerRequest.peerKey
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };
    //END TODO

    //TODO:: FIX THIS COMMAND
    addSignatory(addSignatoryRequest: AddSignatoryRequest,commandOptions: any): Promise<any> {
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.addSignatory(this.COMMAND_OPTIONS,{
        accountId: addSignatoryRequest.accountId,
        publicKey: addSignatoryRequest.publicKey
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };
    //END TODO

    appendRole(appendRoleRequest: AppendRoleRequest,commandOptions: any): Promise<any> {
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.appendRole(this.COMMAND_OPTIONS,{
        accountId: appendRoleRequest.accountId,
        roleName: appendRoleRequest.roleName})
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    compareAndSetAccountDetail(compareAndSetAccountDetailRequest: CompareAndSetAccountDetailRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.compareAndSetAccountDetail(this.COMMAND_OPTIONS, {
        accountId: compareAndSetAccountDetailRequest.accountId,
        key: compareAndSetAccountDetailRequest.key,
        value: compareAndSetAccountDetailRequest.value,
        oldValue: compareAndSetAccountDetailRequest.oldValue
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    createAccount(createAccountRequest: CreateAccountRequest,commandOptions: any): Promise<any> {
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.createAccount(this.COMMAND_OPTIONS, {
        accountName: createAccountRequest.accountName,
        domainId: createAccountRequest.domainId,
        publicKey: createAccountRequest.publicKey
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    createAsset(createAssetRequest: CreateAssetRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      console.log(this.COMMAND_OPTIONS);
      return this.commands.createAsset(this.COMMAND_OPTIONS, {
        assetName: createAssetRequest.assetName,
        domainId: createAssetRequest.domainId,
        precision: createAssetRequest.precision
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    createDomain(createDomainRequest: CreateDomainRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.createDomain(this.COMMAND_OPTIONS, {
        domainId: createDomainRequest.domainId,
        defaultRole: createDomainRequest.defaultRole
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    createRole(createRoleRequest: CreateRoleRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.createRole(this.COMMAND_OPTIONS, {
        roleName: createRoleRequest.roleName,
        permissionsList: createRoleRequest.permissionsList
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    detachRole(detachRoleRequest: DetachRoleRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.detachRole(this.COMMAND_OPTIONS, {
        accountId: detachRoleRequest.accountId,
        roleName: detachRoleRequest.roleName
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    grantPermission(grantablePermissionRequest: GrantablePermissionRequest,commandOptions: any){
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.grantPermission(this.COMMAND_OPTIONS, {
        accountId: grantablePermissionRequest.accountId,
        permission: grantablePermissionRequest.permission
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    removePeer(removePeerRequest: RemovePeerRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.removePeer(this.COMMAND_OPTIONS, {
        publicKey: removePeerRequest.publicKey
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    removeSignatory(removeSignatoryRequest: RemoveSignatoryRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.removeSignatory(this.COMMAND_OPTIONS, {
        accountId: removeSignatoryRequest.accountId,
        publicKey: removeSignatoryRequest.publicKey
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    revokePermission(revokePermissionRequest: RevokePermissionRequest,commandOptions: any): Promise<any> {
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.revokePermission(this.COMMAND_OPTIONS, {
        accountId: revokePermissionRequest.accountId,
        permission: revokePermissionRequest.permission
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    setAccountDetail(setAccountDetailRequest: SetAccountDetailRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.setAccountDetail(this.COMMAND_OPTIONS, {
        accountId: setAccountDetailRequest.accountId,
        key: setAccountDetailRequest.key,
        value: setAccountDetailRequest.value
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };
    
    setAccountQuorum(setAccountQuorumRequest: SetAccountQuorumRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.setAccountQuorum(this.COMMAND_OPTIONS, {
        accountId: setAccountQuorumRequest.accountId,
        quorum: setAccountQuorumRequest.quorum
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    subtractAssetQuantity(subtractAssetQuantityRequest: AdjustAssetQuantityRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.subtractAssetQuantity(this.COMMAND_OPTIONS, {
        assetId: subtractAssetQuantityRequest.assetId,
        amount: subtractAssetQuantityRequest.amount
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

    transferAsset(transferAssetRequest: TransferAssetRequest,commandOptions: any): Promise<any>{
      this.COMMAND_OPTIONS.creatorAccountId = commandOptions[IROHA_ACCOUNT_ID_HEADER];
      this.COMMAND_OPTIONS.privateKeys[0] = commandOptions[IROHA_ACCOUNT_KEY_HEADER];
      return this.commands.transferAsset(this.COMMAND_OPTIONS, {
        srcAccountId: transferAssetRequest.srcAccountId,
        destAccountId: transferAssetRequest.destAccountId,
        assetId: transferAssetRequest.assetId,
        description: transferAssetRequest.description,
        amount: transferAssetRequest.amount
      })
        .then((resp: any) => {
          return setIrohaSuccessResp(resp);      
        })
        .catch((err) => {
          return setIrohaErrorResp(err);          
        });
    };

  }
  
  export = new CommandsController();