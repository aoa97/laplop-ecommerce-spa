import React from 'react';
import { Button } from '@material-ui/core'


const Btn = ({ disabled, outlined, children, IconComponent, ...otherProps }) => (
    <>
        {IconComponent ? (
            <Button disableElevation color="primary" size="small" style={styles.icon} disabled={disabled} {...otherProps}>
                {IconComponent}
            </Button>
        ) : (
                <Button disableElevation color="primary" size="small" style={styles.btn} disabled={disabled} {...otherProps}>
                    {children}
                </Button>
            )
        }

    </>
)

const styles = {
    icon: {
        borderRadius: '.2rem',
        padding: '.3rem 1.3rem',
    },
    btn: {
        width: "100%",
        height: '2.8rem',
        fontFamily: 'Nunito sans',
        fontSize: '.75rem',
        fontWeight: 'bold',
        borderRadius: '.1rem'
    }
}

Btn.defaultProps = {
    variant: "contained"
}

export default Btn;