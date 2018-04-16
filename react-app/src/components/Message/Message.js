import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import './Message.css'

export const Message = (props) => (
  <Snackbar
    className={props.message.style}
    autoHideDuration={6000}
    open={props.message.open}
    onClose={props.handleMessageClose}
    message={<span id="message-id">{props.message.value}</span>}
  />
)

export default Message;