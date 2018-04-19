
import Web3Helper from './web3-helper';

export function waitTxConfirmed(web3: any, txHash: string): Promise<boolean> {
    return Web3Helper.waitTxConfirmed(web3, txHash);
    
}