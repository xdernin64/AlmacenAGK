import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SimpleAutocomplete({ data, textField, valueField, onChange }) {
    console.log(data);
    return (
        <Autocomplete
            options={data}
            getOptionLabel={(option) => option.ocptdtcod}
            renderInput={(params) => <TextField {...params} label={textField} />}
            onChange={(event, value) => onChange(value ? value.ocptdtcod : null)}
            value={valueField ? data.find((option) => option[valueField] === valueField) : null}
            renderOption={(props, option) => (
                <li {...props}>
                    {option.ocptdtcod}
                </li>
            )}
        />
    );
}
