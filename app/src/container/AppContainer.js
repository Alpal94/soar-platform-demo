import { connect } from 'react-redux';
import App from '../components/App';
import { 
  soarFilesCountAction, 
  soarUploadFileAction,
  soarFilePurchaseAction,
  soarDownloadFileAction,
  eventSoarUploadAction,
  eventSoarMyPurchaseAction
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
  progress: state.progress,
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
    handleSoarFileUpload: (web3, file, pointWKT, metadata) => {
      dispatch(soarUploadFileAction(web3, file, pointWKT, metadata));
    },
    handleSoarFilePurchase: (web3, fileHash, price, url) => {
      dispatch(soarFilePurchaseAction(web3, fileHash, price, url));
    },
    handleSoarFileDownload: (web3, fileHash, url) => {
      dispatch(soarDownloadFileAction(web3, fileHash, url));
    },
    //events from blochain
    eventSoarFileUpload: (upload) => {
      dispatch(eventSoarUploadAction(upload));
    },
    eventSoarMyPurchase: (myPurchase) => {
      dispatch(eventSoarMyPurchaseAction(myPurchase));
    },
    //system and message actions
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