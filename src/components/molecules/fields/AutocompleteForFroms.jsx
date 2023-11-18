import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from "../../../helpers/CRUD/READ/GetDataSb";


const AutoCompleteRemoForteForm = ({ db, title, dataprops, value, onChange, local = false, localdb = {} }) => {
    const initialValue = value || '';
    const [selectsdb1, setSelectsdb1] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const dataToSet = await GetPrimaryData(db);
            setSelectsdb1(dataToSet);
        };
        if (local) {
            setSelectsdb1(localdb);
        } else {
            fetchData();
        }

    }, [db]);

    const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[dataprops[0]] === initialValue);


    const handleChange = (event, newValue) => {
        const selectedDb1 = newValue ? newValue[dataprops[0]] : '';
        onChange(selectedDb1);
    };

    return (
        <>
            {local ? (
                <>
                    <Autocomplete
                        value={initialdbsl1 || null}
                        onChange={handleChange}
                        options={selectsdb1}
                        getOptionLabel={selectdb1 => `${selectdb1[dataprops[2]]}: ${selectdb1[dataprops[1]]} (${selectdb1[dataprops[0]]}) `}
                        renderOption={(props, option) => (
                            <div {...props} className="bg-blue-gray-700 text-gray-200 pl-3 hover:bg-blue-gray-500 transition-all text-lg border border-blue-gray-600">
                                {`${option[dataprops[2]]}: ${option[dataprops[1]]}  `}
                            </div>
                        )}
                        renderInput={params => <TextField sx={{color:'darkblue',backgroundColor:'hsla(225, 57%, 48%, 0.2)'}} {...params} label={title} variant="outlined" />}
                    />
                </> // Aquí puedes poner el contenido que deseas renderizar cuando local es true
            ) : (
                <Autocomplete
                    value={initialdbsl1 || null}
                    onChange={handleChange}
                    options={selectsdb1}
                    getOptionLabel={selectdb1 => `${selectdb1[dataprops[0]]}: ${selectdb1[dataprops[1]]}`}
                    renderInput={params => <TextField {...params} label={title} variant="outlined" />}
                />
            )}
        </>
    );

}

export default AutoCompleteRemoForteForm;
