export interface FaucetInfo {
    symbol: string;
    balance: number;
    individualCap: number;
}

export interface FaucetInfoAdmin {
    isOwner: boolean;
    symbol: string;
    faucetAllowance: number;
    walletBalance: number;
    tokenAddress: string;
    walletAddress: string;
}

export interface ListingsInfo {
    listingsCount: number;
    userAddress: string;
}

export interface UploadListing {
    previewUrl: string;
    url: string;
    pointWKT: string; 
    metadata: string; 
    fileHash: string; 
    geohash: string;
}

export interface EventListingUploaded {
    blockNumber: number;
    previewUrl: string;
    url: string;
    pointWKT: string; 
    metadata: string; 
    fileHash: string; 
    geohash: string;
    owner: string;
}
