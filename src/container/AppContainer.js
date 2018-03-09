import { connect } from 'react-redux';
import App from '../components/App';
import { 
  soarFilesCountAction, soarUploadFileAction
} from '../actions/soarActions';
import { 
  messageInfoAction,
  messageWarningAction,
  messageCloseAction
} from '../actions/messageActions';
import {
  metaMaskAccountAction,
  metaMaskNetworkAction
} from '../actions/metaMaskActions';

const  mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  count: state.count,
  error: state.error,
  soar: state.soar,
  metaMask: state.metaMask,
  message: state.message
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleSoarFilesCount: (web3) => {
      dispatch(soarFilesCountAction(web3));
    },
    handleSoarFileUpload: (web3, file) => {
      dispatch(soarUploadFileAction(web3, file));
    },
    handleInfoOpen: (message) => {
      dispatch(messageInfoAction(message));
    },
    handleWarningOpen: (message) => {
      dispatch(messageWarningAction(message));
    },
    handleMessageClose: () => {
      dispatch(messageCloseAction());
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