
export class IrohaSuccessResponse {

    txHash!: string;
    status!: string;

    constructor(){}

    IrohaSuccessResponse(txHash: string, status: string) {
        this.txHash = txHash;
        this.status = status;
    }
}

export class IrohaErrorResponse {

    error!: string;
    status!: string;

    constructor(){}

    IrohaSuccessResponse(error: string, status: string) {
        this.error = error;
        this.status = status;
    }
}