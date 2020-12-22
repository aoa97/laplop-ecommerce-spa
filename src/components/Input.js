import React from 'react';
import { TextField } from '@material-ui/core'


const TextInput = ({ variant, size, secured, ...otherProps }) => (
    <TextField
        className="form-control my-2"
        variant={variant}
        size={size}
        type={secured && "password"}
        {...otherProps}
    />
)

TextInput.defaultProps = {
    variant: 'outlined',
    size: 'small'
}

export default TextInput;