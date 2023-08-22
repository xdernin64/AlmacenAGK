import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarError = ({ message, severity, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
        onClose();
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={severity}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default SnackbarError;
