import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from "../../../helpers/CRUD/READ/GetDataSb";

const AutoCompleteRemoForteForm = ({ db, title, dataprops, value, onChange}) => {
    const initialValue = value || '';
    const [selectsdb1, setSelectsdb1] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const dataToSet = await GetPrimaryData(db);
            setSelectsdb1(dataToSet);
        };
        fetchData();
    }, [db]);

    const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[dataprops[0]] === initialValue);


    const handleChange = (event, newValue) => {
        const selectedDb1 = newValue ? newValue[dataprops[0]] : '';
        onChange(selectedDb1);
    };

    return (
        <Autocomplete
            value={initialdbsl1 || null}
            onChange={handleChange}
            options={selectsdb1}
            getOptionLabel={selectdb1 => `${selectdb1[dataprops[0]]}: ${selectdb1[dataprops[1]]}`}
            renderInput={params => <TextField {...params} label={title} variant="outlined" />}
        />
    );
}

export default AutoCompleteRemoForteForm;
