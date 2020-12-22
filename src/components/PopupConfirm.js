import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';

const ResponsiveDialog = ({ open, setOpen, title, text, submitHandler }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{text}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={() => {
                        submitHandler()
                        setOpen(false)
                    }} color="primary">Yes</Button>

                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ResponsiveDialog