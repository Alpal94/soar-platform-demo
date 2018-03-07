import { getSoarAddress, getCurrentNetwork } from './web3Service';
import Soar from './soar';

let soarAddress = '0x0';

const setContractAddress = (web3) => {
  soarAddress = getSoarAddress(getCurrentNetwork(web3));
}

export const getName = (web3) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.name();
    return result;
  } catch (err) {
    console.log('getName: ', err)
    return 'name not found';
  }
}