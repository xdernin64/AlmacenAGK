import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from "../../../helpers/CRUD/READ/GetDataSb";

const AutoCompleteRemote = ({ db, title, dataprops, value, onChange }) => {
    const [selectsdb1, setSelectsdb1] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const selectdata1 = await GetPrimaryData(db);
            setSelectsdb1(selectdata1);
        }
        fetchData();
    }, [db]);

    const initialValue = value || '';
    const initialdbsl1 = selectsdb1 && selectsdb1.find(selectdb1 => selectdb1[dataprops[0]] === initialValue);
    
    return (
        <Autocomplete
            value={initialdbsl1 || null}
            onChange={(event, newValue) => {
                const selectedDb1 = newValue ? newValue[dataprops[0]] : '';
                onChange(selectedDb1);
            }}
            options={selectsdb1}
            getOptionLabel={selectdb1 => selectdb1[dataprops[0]] + ": " + selectdb1[dataprops[1]]}
            renderInput={params => (
                <TextField {...params} label={title} variant="outlined" />
            )}
        />
    );
}

export default AutoCompleteRemote;
