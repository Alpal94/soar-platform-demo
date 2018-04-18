export interface ListingsAction {
    type: string;
    payload?: any;
}

export interface PriceUpdate {
    geohash: string;
    price: number;
}