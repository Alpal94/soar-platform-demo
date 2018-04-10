export interface Info {
    symbol: string,
    supply: number
}

export interface FaucetAction {
    type: string
    payload?: any
}
