// REQUEST INTERFACE
export class GetAccountRequest {
    accountId!: string;
    domainId!: string;
   
    constructor(accountId: string, domainId: string){
        this.accountId = `${accountId}@${domainId}`;
    }
}

export class GetAccountTransactionsRequest {
    accountId!: string;
    pageSize!: number
}

export class GetAccountAssetsRequest {
    accountId!: string;
    pageSize!: number;
    firstAssetId!: string;
}

export class GetAccountDetailRequest {
    accountId!: string;
    key!: string;
    pageSize!: number;
    paginationKey!: string;
    paginationWriter!: string;
    writer!: string;
}

export class GetAccountAssetTransactionsRequest {
    accountId!: string;
    assetId!: string;
    firstTxHash: string | undefined;
    pageSize!: number;
}

export class GetAssetInfoRequest {
    assetId!: string;
}

export class GetBlockRequest {
    height!: number;
}

export class GetEngineReceiptsRequest {
    txHash!: string;
}

export class GetPendingTxsRequest {
    firstTxHash!: string;
    pageSize!: number;
}

export class GetRawAccountRequest {
    accountId!: string;
}

export class GetRolePermissionsRequest {
    roleId!: string;
}

export class GetRolesRequest {
    roleId!: string;
}

export class GetSignatoriesRequest {
    accountId!: string;
}

export class GetTransactionsRequest {
    txHashesList!: Array<string>;
}
