import { connect } from 'react-redux';
import App from '../components/App';
import { 
  soarNameAction
} from '../actions/soarActions';
import { 
  warningOpenAction,
  warningCloseAction
} from '../actions/warningActions';
import {
  metaMaskAccountAction,
  metaMaskNetworkAction
} from '../actions/metaMaskActions';

const  mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  count: state.count,
  error: state.error,
  soar: state.soar,
  warning: state.warning,
  metaMask: state.metaMask
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleSoarName: (web3) => {
      dispatch(soarNameAction(web3));
    },
    handleWarningOpen: (message) => {
      dispatch(warningOpenAction(message));
    },
    handleWarningClose: () => {
      dispatch(warningCloseAction());
    },
    handleMetaMaskAccount: (account) => {
      dispatch(metaMaskAccountAction(account));
    },
    handleMetaMaskNetwork: (network) => {
      dispatch(metaMaskNetworkAction(network));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);