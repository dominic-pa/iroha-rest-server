// REQUEST INTERFACES
export class IrohaTxRequest {

}

export class AdjustAssetQuantityRequest {
    assetId!: string;
    amount!: string;

    //constructor(){}

    constructor(assetId: string, amount: string) {
        this.assetId = assetId;
        this.amount = amount;
    }
}

// REQUEST INTERFACE
export class OnboardLicenseeRequest {
    accountId!: string;

    //constructor(){}

    constructor(accountId: string) {
        this.accountId = accountId;
    }
}

export class AddPeerRequest {
    address!: string;
    peerKey!: string;

    //constructor(){}

    constructor(address: string, peerKey: string) {
        this.address = address;
        this.peerKey = peerKey;
    }
}

export class BatchAddPeerRequest {
    peer!: Peer;

    //constructor(){}

    constructor(peer: Peer) {
        this.peer = peer;
    }
}

export class Peer {
    address!: string;
    peerKey!: string;
    tlsCertificate!: string;

    //constructor(){}

    constructor(address: string, peerKey: string, tlsCertificate: string) {
        this.address = address;
        this.peerKey = peerKey;
        this.tlsCertificate = tlsCertificate;
    }
}

export class AddSignatoryRequest {
    accountId!: string;
    publicKey!: string;

    //constructor(){}

    constructor(accountId: string, publicKey: string) {
        this.accountId = accountId;
        this.publicKey = publicKey;
    }
}

export class AppendRoleRequest {
    accountId!: string;
    roleName!: string;

    constructor(accountId: string, roleName: string) {
        this.accountId = accountId;
        this.roleName = roleName;
    }
}

export class CompareAndSetAccountDetailRequest {
    accountId!: string;
    key!: string;
    value!: string;
    oldValue!: string;
    emptyCheck: boolean | undefined = false; //if true, empty oldValue in command must match absent value in WSV; 
                                             //if false, any oldValue in command matches absent in WSV (legacy)

    //constructor(){}

    constructor(accountId: string, key: string, value: string, oldValue: string, emptyCheck: boolean) {
        this.accountId = accountId;
        this.key = key;
        this.value = value;
        this.oldValue = oldValue;
        this.emptyCheck = emptyCheck;
    }
}

export class CreateAccountRequest {
    accountName!: string;
    domainId!: string;
    publicKey!: string;
   
    constructor(accountName: string, domainId: string, publicKey: string){
        this.accountName = accountName;
        this.domainId = domainId;
        this.publicKey = publicKey;
    }
}

export class CreateNewDomainRequest {
    domainId!: string;
    defaultRole!: string;
   
    constructor(domainId: string, defaultRole: string){
        this.domainId = domainId;
        this.defaultRole = defaultRole;
    }
}

export class CreateAssetRequest {
    assetName!: string;
    domainId!: string;
    precision!: number;
   
    ////constructor(){}

    constructor(assetName: string, domainId: string, precision: number) {
        this.assetName = assetName;
        this.domainId = domainId;
        this.precision = precision;
    }
}

export class CreateDomainRequest {
    domainId!: string;
    defaultRole!: string;
   
    ////constructor(){}

    constructor(domainId: string, defaultRole: string) {
        this.domainId = domainId;
        this.defaultRole = defaultRole;
    }
}

export class CreateRoleRequest {
    roleName!: string;
    permissionsList: Array<RolePermissionMap[keyof RolePermissionMap]>;
   
    //constructor(){}

    constructor(roleName: string, permissionsList: Array<RolePermissionMap[keyof RolePermissionMap]>) {
        this.roleName = roleName;
        this.permissionsList = permissionsList;
    }
}

export interface RolePermissionMap {
    CAN_APPEND_ROLE: 0;
    CAN_CREATE_ROLE: 1;
    CAN_DETACH_ROLE: 2;
    CAN_ADD_ASSET_QTY: 3;
    CAN_SUBTRACT_ASSET_QTY: 4;
    CAN_ADD_PEER: 5;
    CAN_REMOVE_PEER: 46;
    CAN_ADD_SIGNATORY: 6;
    CAN_REMOVE_SIGNATORY: 7;
    CAN_SET_QUORUM: 8;
    CAN_CREATE_ACCOUNT: 9;
    CAN_SET_DETAIL: 10;
    CAN_CREATE_ASSET: 11;
    CAN_TRANSFER: 12;
    CAN_RECEIVE: 13;
    CAN_CREATE_DOMAIN: 14;
    CAN_ADD_DOMAIN_ASSET_QTY: 43;
    CAN_SUBTRACT_DOMAIN_ASSET_QTY: 44;
    CAN_CALL_ENGINE: 48;
    CAN_CALL_MODEL: 53;
    CAN_READ_ASSETS: 15;
    CAN_GET_ROLES: 16;
    CAN_GET_MY_ACCOUNT: 17;
    CAN_GET_ALL_ACCOUNTS: 18;
    CAN_GET_DOMAIN_ACCOUNTS: 19;
    CAN_GET_MY_SIGNATORIES: 20;
    CAN_GET_ALL_SIGNATORIES: 21;
    CAN_GET_DOMAIN_SIGNATORIES: 22;
    CAN_GET_MY_ACC_AST: 23;
    CAN_GET_ALL_ACC_AST: 24;
    CAN_GET_DOMAIN_ACC_AST: 25;
    CAN_GET_MY_ACC_DETAIL: 26;
    CAN_GET_ALL_ACC_DETAIL: 27;
    CAN_GET_DOMAIN_ACC_DETAIL: 28;
    CAN_GET_MY_ACC_TXS: 29;
    CAN_GET_ALL_ACC_TXS: 30;
    CAN_GET_DOMAIN_ACC_TXS: 31;
    CAN_GET_MY_ACC_AST_TXS: 32;
    CAN_GET_ALL_ACC_AST_TXS: 33;
    CAN_GET_DOMAIN_ACC_AST_TXS: 34;
    CAN_GET_MY_TXS: 35;
    CAN_GET_ALL_TXS: 36;
    CAN_GET_BLOCKS: 42;
    CAN_GET_PEERS: 45;
    CAN_GET_MY_ENGINE_RECEIPTS: 50;
    CAN_GET_DOMAIN_ENGINE_RECEIPTS: 51;
    CAN_GET_ALL_ENGINE_RECEIPTS: 52;
    CAN_GRANT_CAN_SET_MY_QUORUM: 37;
    CAN_GRANT_CAN_ADD_MY_SIGNATORY: 38;
    CAN_GRANT_CAN_REMOVE_MY_SIGNATORY: 39;
    CAN_GRANT_CAN_TRANSFER_MY_ASSETS: 40;
    CAN_GRANT_CAN_SET_MY_ACCOUNT_DETAIL: 41;
    CAN_GRANT_CAN_CALL_ENGINE_ON_MY_BEHALF: 49;
    ROOT: 47;
  }
  
  export interface GrantablePermissionMap {
    CAN_ADD_MY_SIGNATORY: 0;
    CAN_REMOVE_MY_SIGNATORY: 1;
    CAN_SET_MY_QUORUM: 2;
    CAN_SET_MY_ACCOUNT_DETAIL: 3;
    CAN_TRANSFER_MY_ASSETS: 4;
    CAN_CALL_ENGINE_ON_MY_BEHALF: 5;
  }
    

export class DetachRoleRequest {
    accountId!: string;
    roleName!: string;
   
    //constructor(){}

    constructor(accountId: string, roleName: string) {
        this.accountId = accountId;
        this.roleName = roleName;
    }
}

export class GrantablePermissionRequest {
    accountId!: string;
    permission!: GrantablePermissionMap[keyof GrantablePermissionMap];
   
    //constructor(){}

    constructor(accountId: string, permission: GrantablePermissionMap[keyof GrantablePermissionMap]) {
        this.accountId = accountId;
        this.permission = permission;
    }
}

export class RemovePeerRequest {
    publicKey!: string;

    //constructor(){}

    constructor(publicKey: string) {
        this.publicKey = publicKey;
    }
}

export class RemoveSignatoryRequest {
    accountId!: string;
    publicKey!: string;

    //constructor(){}

    constructor(accountId: string, publicKey: string) {
        this.accountId = accountId;
        this.publicKey = publicKey;
    }
}

export class RevokePermissionRequest {
    accountId!: string;
    permission!: GrantablePermissionMap[keyof GrantablePermissionMap];

    //constructor(){}

    constructor(accountId: string, permission: GrantablePermissionMap[keyof GrantablePermissionMap]) {
        this.accountId = accountId;
        this.permission = permission;
    }
}

export class SetAccountDetailRequest {
    accountId!: string;
    key!: string;
    value!: string;

    // //constructor(){}

    constructor(accountId: string, value: string, key: string) {
        this.accountId = accountId;
        this.key = key;
        this.value = value;
    }
}

export class SetAccountQuorumRequest {
    accountId!: string;
    quorum!: number;

    //constructor(){}

    constructor(accountId: string, quorum: number) {
        this.accountId = accountId;
        this.quorum = quorum;
    }
}

export class TransferAssetRequest {
    srcAccountId!: string;
    destAccountId!: string;
    assetId!: string;
    description!: string;
    amount!: string;

    //constructor(){}

    constructor(srcAccountId: string, destAccountId: string, assetId: string, description: string, amount: string) {
        this.srcAccountId = srcAccountId;
        this.destAccountId = `${destAccountId}@${destAccountId}`;
        this.assetId = assetId;
        this.description = description;        
        this.amount = amount;
    }
}