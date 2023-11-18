import React from 'react';
import { Autocomplete, TextField } from "@mui/material";

const SimpleAutocomplete = ({ id, name, options, value, onChange }) => {
    const selectedOption = options.find((option) => option.id === value);

    return (
        <Autocomplete
            id={id}
            options={options}
            getOptionLabel={(option) => option[name]}
            value={selectedOption}
            onChange={(event, newValue) => {
                onChange(newValue.id);
            }}
            renderInput={(params) => (
                <TextField {...params} label={name} variant="outlined" />
            )}
            freeSolo // Add this prop to allow free text input
        />
    );
};

export default SimpleAutocomplete;
