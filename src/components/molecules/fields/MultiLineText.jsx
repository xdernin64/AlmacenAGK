import React from 'react';
import { TextField } from '@mui/material';

const MultilineTextField = ({ label, name, value, onChange, ...props }) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            {...props}
        />
    );
};

export default MultilineTextField;

