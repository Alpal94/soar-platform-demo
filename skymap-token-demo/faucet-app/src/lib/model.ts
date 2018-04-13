export interface Info {
    symbol: string,
    supply: number
}

export interface InfoAdmin {
    isOwner: boolean,
    symbol: string,
    faucetAllowance: number,
    walletBalance: number
}
