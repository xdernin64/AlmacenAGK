import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from "../../../helpers/CRUD/READ/GetDataSb";

const AutoCompleteRemote = ({ db, title, dataprops, value, onChange, qstate, qdata }) => {
    const initialValue = value || '';
    const [selectsdb1, setSelectsdb1] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const dataToSet = qstate ? qdata : await GetPrimaryData(db);
            setSelectsdb1(dataToSet);
        };
        fetchData();
    }, [db, qstate]);

    const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[dataprops[0]] === initialValue);

    const inputStyles = {
        width: 270,
        '& .MuiInputBase-input': {
            fontSize: '0.7rem',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#60e030',
            },
            '&:hover fieldset': {
                borderColor: '#e00330',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#940560',
            },
        },
    };

    const handleChange = (event, newValue) => {
        const selectedDb1 = newValue ? newValue[dataprops[0]] : '';
        onChange(selectedDb1);
    };

    return (
        <Autocomplete
            sx={inputStyles}
            value={initialdbsl1 || null}
            onChange={handleChange}
            options={selectsdb1}
            getOptionLabel={selectdb1 => `${selectdb1[dataprops[0]]}: ${selectdb1[dataprops[1]]}`}
            renderInput={params => <TextField {...params} label={title} variant="outlined" />}
        />
    );
}

export default AutoCompleteRemote;
