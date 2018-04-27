export interface AdminAction {
    type: string
    payload?: any
}

export interface PricingFormModel {
    geohashes: string[];
    price: number;
    precision: number;
}