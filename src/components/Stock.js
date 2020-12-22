import React from 'react';
import { CheckCircleOutline } from '@material-ui/icons'

const Stock = ({ out, className }) => (
    <div className="d-flex align-items-center text-dark">
        {!out && (
            <>
                <h5 style={{ ...styles.text, ...{ color: "#388e3c" } }}>In Stock</h5>
                <CheckCircleOutline style={styles.icon} />
            </>
        )}

        {out && <h5 style={{ ...styles.text, ...{ color: "#d32f2f" } }}>Out of Stock</h5>}
    </div>
)

const styles = {
    text: {
        fontFamily: "Segoe UI",
        textTransform: "none",
        letterSpacing: 0,
    },
    icon: {
        color: "#388e3c",
        fontSize: '1.1rem',
        marginLeft: '.2rem'
    }
}

export default Stock;