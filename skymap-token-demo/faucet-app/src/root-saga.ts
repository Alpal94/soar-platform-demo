import { sampleWatcher } from './containers/Users/saga';
import { tokenInfoWatcher } from './containers/Faucet/saga';

export default function* rootSaga() {
  yield [
    sampleWatcher(),
    tokenInfoWatcher()
  ];
}
