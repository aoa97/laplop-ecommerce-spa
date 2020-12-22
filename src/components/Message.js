import React from 'react';
import { Alert } from '@material-ui/lab'

const Message = ({ severity, children, className }) => (
    <Alert severity={severity} className={className}>{children}</Alert>
);

Message.defaultProps = {
    severity: 'info'
}

export default Message;