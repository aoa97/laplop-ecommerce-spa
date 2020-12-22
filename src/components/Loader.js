import React from 'react';
import { LinearProgress, CircularProgress } from '@material-ui/core';

const Loader = ({ circular, center, ...otherProps }) => (
    <div className={center && "d-flex justify-content-center"}>
        {circular ? <CircularProgress {...otherProps} /> : <LinearProgress {...otherProps} />}
    </div>
)

export default Loader;