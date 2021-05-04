// EXTRACTION INTERFACE
export type BatchInformation = {
    quantity?: number;
    unit?: string;
  };
  
  export type BatchRequest = {
    batchId?: string;
    facilityName?: string;
    facilityAddress?: string;
    bioMass?: BatchInformation;
    signoffOfficers?: Array<string>;
    batchAuthorizedDate?: string;
  };
  
  export enum BatchStatus {
    PENDING = 0,
    MILLING = 1,
    EXTRACTION = 2,
    FILTRATION_1 = 3,
    ENRICHMENT = 4,
    FILTRATION_2 = 5,
    COMPLETE = 6
  }
  
  export type ExtractionBatch = {
    bioMass?: BatchInformation;
    crudeExtract?: BatchInformation;
    unboundFiltrate?: BatchInformation;
    finalElution?: BatchInformation;
    unaccounted?: BatchInformation;
    notes?: Array<string>;
    batchStatus?: BatchStatus;
    batchRequest?: BatchRequest;
  };
  
  // QUERIES INTERFACE
  export enum Field {
    kCreatedTime = 0,
    kPosition = 1
  }
  
  export enum Direction {
    kAscending = 0,
    kDescending = 1
  }
  
  export type FieldOrdering = {
    field?: Field;
    direction?: Direction;
  };
  export type Ordering = {
    sequence?: Array<FieldOrdering>;
  };
  export type TxPaginationMeta = {
    pageSize?: number;
    firstTxHash?: string;
    ordering?: Ordering;
  };
  export type EngineReceipt = {
    commandIndex?: number;
    caller?: string;
    callResult?: CallResult;
    contractAddress?: string;
    logs: Array<EngineLog>;
  };
  export type CallResult = {
    callee?: string;
    resultData?: string;
  };
  export type EngineLog = {
    address?: string; // hex string
    data?: string; // hex string
    topics?: Array<string>; // hex string
  };
  export type Account = {
    accountId?: string;
    domainId?: string;
    quorum?: number;
    jsonData?: string;
  };
  export type Transactions = {
    transactions?: Array<string>;
  };
  export type BatchInfo = {
    firstTxHash?: string;
    batchSize?: number;
  };
  export type AssetPaginationMeta = {
    pageSize?: number;
    firstAssetId?: string;
  };
  export type AccountAsset = {
    assetId?: string;
    accountId?: string;
    balance?: number;
  };
  export type AccountDetailRecordId = {
    writer?: string;
    key?: string;
  };
  export type AccountDetailPaginationMeta = {
    pageSize?: number;
    firstRecordId?: AccountDetailRecordId;
  };
  export type Asset = {
    assetId?: string;
    domainId?: string;
    precision?: number;
  };
  
  // QUERIE RESPONSE INTERFACE
  export type EngineReceiptsResponse = {
    engineReceipt?: Array<EngineReceipt>;
  };
  export type AccountResponse = {
    account?: Account;
    accountRoles?: Array<string>;
  };
  export type BlockResponse = {
    block?: string;
  };
  export type SignatoriesResponse = {
    keys?: Array<string>;
  };
  export type TransactionsResponse = {
    transactions?: Array<string>;
  };
  export type PendingTransactionsPageResponse = {
    transactions?: Transactions;
    allTransactionsSize?: number;
    nextBatchInfo?: BatchInfo;
  };
  export type TransactionsPageResponse = {
    transactions?: Transactions;
    allTransactionsSize?: number;
    nextTxHash?: string;
  };
  export type AccountAssetResponse = {
    accountAssets?: Array<AccountAsset>;
    totalNumber?: number;
    nextAssetId?: string;
  };
  export type AccountDetailResponse = {
    detail?: string;
    totalNumber?: number;
    nextRecordId?: AccountDetailRecordId;
  };
  export type PeersResponse = {
    peers?: Array<Peer>;
  };
  export type BlockQueryResponse = {
    blockResponse?: BlockResponse;
    blockErrorResponse?: BlockErrorResponse;
  };
  export type BlockErrorResponse ={
    message?: string;
  };
  export type RolesResponse = {
    roles?: Array<string>;
  };
  export type RolePermissionsResponse = {
    permissions?: Array<string>;
  };
  
  // QUERIE REQUEST INTERFACE
  export type GetEngineReceipts = {
    txHash: string; // hex string
  };
  export type GetAccount = {
    accountId?: string;
  };
  export type GetBlock = {
    height?: number;
  };
  export type GetSignatories = {
    accountId?: string;
  };
  export type GetTransactions = {
    txHashes?: Transactions;
  };
  export type GetPendingTransactions = {
    paginationMeta?: TxPaginationMeta;
  };
  export type GetAccountTransactions = {
    accountId?: string;
    paginationMeta?: TxPaginationMeta;
  };
  export type GetAccountAssetTransactions = {
    accountId?: string;
    assetId?: string;
    paginationMeta?: TxPaginationMeta;
  };
  export type GetAccountAssets = {
    accountId?: string;
    paginationMeta?: AssetPaginationMeta;
  };
  export type GetAccountDetail = {
    accountId?: string;
    key?: string;
    writer?: string;
    paginationMeta?: AccountDetailPaginationMeta;
  };
  export type GetAssetInfo = {
    assetId?: string;
  };
  export type GetRolePermissions = {
    roleId?: string;
  };
  
  // COMMAND INTERFACE
  
  export type Peer = {
    address?: string;
    peerKey?: string; // hex string
  };
  
  // COMMAND ADD - TRANSFER - SUBTRACT REQUEST INTERFACE
  
  export type AddAssetQuantity = {
    assetId?: string;
    amount?: number;
  };
  export type AddPeer = {
    peer?: Peer;
  };
  export type AddSignatory = {
    accountId?: string;
    publicKey?: string;
  };
  export type AppendRole = {
    accountId?: string;
    roleName?: string;
  };
  export type SubtractAssetQuantity = {
    assetId?: string;
    amount?: number;
  };
  export type TransferAsset = {
    srcAccountId?: string;
    destAccountId?: string;
    assetId?: string;
    description?: string;
    amount?: number;
  };
  
  // COMMAND CREATE REQUEST INTERFACE
  
  export type CreateAccount = {
    accountName?: string;
    domainId?: string;
    publicKey?: string;
  };
  export type CreateAsset = {
    assetName?: string;
    domainId?: string;
    precision?: number;
  };
  export type CreateDomain = {
    domainId?: string;
    defaultRole?: string;
  };
  export type CreateRole = {
    roleName?: string;
    permissions?: Array<string>;
  };
  export type DetachRole = {
    accountId?: string;
    roleName?: string;
  };
  // COMMAND PERMISSION REQUEST INTERFACE
  
  export type GrantPermission = {
    accountId?: string;
    permission?: string;
  };
  export type RemovePeer = {
    publicKey?: string; // hex string
  };
  export type RemoveSignatory = {
    accountId?: string;
    publicKey?: string;
  };
  export type RevokePermission = {
    accountId?: string;
    permission?: string;
  };
  // COMMAND SET REQUEST INTERFACE
  
  export type SetAccountDetail = {
    accountId?: string;
    key?: string;
    value?: string;
  };
  export type SetAccountQuorum = {
    accountId?: string;
    quorum?: number;
  };
  export type CompareAndSetAccountDetail = {
    accountId?: string;
    key?: string;
    value?: string;
    oldValue?: string;
    checkEmpty?: boolean;
  };
  