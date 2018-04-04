import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import './Message.css'

export const Message = (props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    className={props.message.style}
    autoHideDuration={6000}
    open={props.message.open}
    onClose={props.handleMessageClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.message.value}</span>}
  />
)

export default Message;