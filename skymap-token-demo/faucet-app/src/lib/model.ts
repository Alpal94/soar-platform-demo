export interface Info {
    symbol: string,
    balance: number,
    individualCap: number
}

export interface InfoAdmin {
    isOwner: boolean,
    symbol: string,
    faucetAllowance: number,
    walletBalance: number,
    tokenAddress: string
}
