import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteComponent({ items }) {
    const [selectedValue, setSelectedValue] = useState(null);

    return (
        <Autocomplete
            id="combo-box-demo"
            options={items}
            getOptionLabel={(option) => option.occupation.occupationname + ' ' + option.ocptdtcod}
            style={{ width: 300 }}
            onChange={(event, newValue) => {
                setSelectedValue(newValue ? newValue.ocptdtcod : null);
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    {option.occupation.occupationname}
                    <span style={{ color: 'transparent' }}>{option.ocptdtcod}</span>
                </li>
            )}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Occupation" 
                    variant="outlined" 
                    value={selectedValue ? items.find(item => item.ocptdtcod === selectedValue).occupation.occupationname : params.inputProps.value}
                />
            )}
        />
    );
}
