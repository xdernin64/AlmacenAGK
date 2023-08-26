import { Select } from '@mui/material';
import React from 'react';


const StateSelect = ({ id, data, onChange }) => {
    const selectedOption = data.find(option => option.id === id);

    const options = [
        { value: 'ASISTENCIA', label: 'ASISTENCIA' },
        { value: 'DSO', label: 'DSO' },
        { value: 'DXHA', label: 'DXHA' },
        { value: 'FALTO JUSTIFICADO', label: 'FALTO JUSTIFICADO' },
        { value: 'FALTO INJUSTIFICADO', label: 'FALTO INJUSTIFICADO' },
        { value: 'LICENCIA', label: 'LICENCIA' },
        { value: 'DSO FERIADO', label: 'DSO FERIADO' },
        { value: 'ASISTENCIA FERIADO', label: 'ASISTENCIA FERIADO' },
    ];

    return (
        <Select
            native
            value={selectedOption ? selectedOption.stateas : ''}
            onChange={e => onChange(e.target.value)}
            inputProps={{
                name: 'asiststate',
                id: 'asiststate',
            }}
        >
            <option aria-label="None" value="" />
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};

export default StateSelect;
