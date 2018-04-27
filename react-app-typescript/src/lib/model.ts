export interface FaucetInfo {
    symbol: string;
    balance: number;
    individualCap: number;
}

export interface FaucetInfoAdmin {
    isWalletOwner: boolean;
    isOwner: boolean;
    symbol: string;
    faucetAllowance: number;
    walletBalance: number;
    tokenAddress: string;
    walletAddress: string;
    faucetOwnerAddress: string;
    individualCap: number;
    waitingPeriod: number;
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

export interface LatLng {
    lat: string;
    lng: string;
}

// TODO: Business rules.  Nail down what is optional and what is required.  Then do the UI for this.
export interface Metadata {
    title: string;
    description: string;
    make: string;
    model: string;
    focalLength?: string;
    apertureValue?: string;
    fNumber?: string;
    shutterSpeed?: string;
    lightSource?: string;
}

export interface Listing {
    blockNumber: number;
    previewUrl: string;
    url: string;
    pointWKT: string; 
    metadata: string; 
    filehash: string; 
    geohash: string;
    owner: string;
}

export interface Sale {
    blockNumber: number;
    buyer: string;
    owner: string;
    filehash: string;
    price: number;
}

export interface DownloadDetails {
    challenge: string;
    secret: string;
}

export interface UploadDetails {
    challenge: string;
    secret: string;
    downloadUrl: string;
    uploadUrl: string;
    previewUrl: string;
}

export interface UserInfo {
    wallet: string;
    balance: number;
    network: string;
}
