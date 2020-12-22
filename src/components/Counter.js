import React from "react";
import { ButtonGroup, Button } from '@material-ui/core'

const Counter = ({ disabled, zero, count, setCount, length, className }) => {
    const increaseHandler = () => {
        if (count !== length) {
            setCount(count + 1)
        }
    }

    const decreaseHandler = () => {
        if (zero) {
            if (count !== 0) {
                setCount(count - 1)
            }
        } else {
            if (count !== 1) {
                setCount(count - 1)
            }
        }
    }

    return (
        <ButtonGroup disableElevation color="primary" size="small" className={className}>
            <Button disabled={disabled} onClick={decreaseHandler}>-</Button>
            <Button disabled style={{ borderColor: "#8ebbd4", color: "#07689f" }}>{disabled ? 0 : count}</Button>
            <Button disabled={disabled} onClick={increaseHandler}>+</Button>
        </ButtonGroup>
    );
}

export default Counter;
