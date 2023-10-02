import React, { useState, useEffect } from 'react';
import { Form, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { GetSpecificData } from '../../helpers/CRUD/READ/GetDataSb';
import AutoCompleteRemoteSubmit from '../molecules/fields/RAutocompleteSubmit';
import { UpdateDataSb } from '../../helpers/CRUD/UPDATE/UpdateDataSb';
import MultilineTextField from '../molecules/fields/MultiLineText';
import { SpaceBar } from '@mui/icons-material';

const UserProfileEditForm = () => {
    const [basicInfo, setBasicInfo] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
    const [isBasicInfoUpdateSuccessful, setIsBasicInfoUpdateSuccessful] = useState(false);
    const [isAdditionalInfoUpdateSuccessful, setIsAdditionalInfoUpdateSuccessful] = useState(false);




    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetSpecificData("user", "cod", userId);
            if (data[0]) {
                const user = data[0];
                setBasicInfo({
                    cod: user.cod || '',
                    lastname: user.lastname || '',
                    name: user.name || '',
                    dni: user.dni || '',
                    gender: user.gender || '',
                    lcdtcod: user.lcdtcod || '',
                    sdptdtcod: user.sdptdtcod || '',
                    state: user.state || '',
                });
                setAdditionalInfo({
                    startworkdate: user.startworkdate || '',//causa error si esta vacio es date
                    birthdate: user.birthdate || '',//causa error si esta vacio es date
                    phonenumber: user.phonenumber || '',//no causa error si esta vacio
                    shoesize: user.shoesize || '',//no causa error si esta vacio
                    shirtsize: user.shirtsize || '',//no causa error si esta vacio
                    pantsize: user.pantsize || '',//no causa error si esta vacio
                    campaingnumber: user.campaingnumber || '',//no causa error si esta vacio
                    expyear: user.expyear || '',//no causa error si esta vacio
                    edulevel: user.edulevel || '',//no causa error si esta vacio
                    skills: user.skills || '',//no causa error si esta vacio
                    wdtcod: user.wdtcod || '',//causa error si esta vacio es un select que carga una consulta de datos
                    ocptdtcod: user.ocptdtcod || '',//causa error si esta vacio es un select que carga una consulta de datos
                    cecodtcod: user.cecodtcod || '',//causa error si esta vacio es un select que carga una consulta de datos
                    jobtime: user.jobtime || '',//no causa error si esta vacio
                    address: user.address || '',//no causa error si esta vacio
                });
            }
        };

        fetchData(); // Call the fetchData function immediately


        // Return a cleanup function to unsubscribe if needed
        return () => {
            // Perform any cleanup logic or unsubscribe here
        };


    }, [userId]);

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'basic') {
            setBasicInfo((prevData) => ({
                ...prevData,
                [name]: value.toUpperCase(), // Convert value to uppercase
            }));
        } else if (formType === 'additional') {
            setAdditionalInfo((prevData) => ({
                ...prevData,
                [name]: value.toUpperCase(),
            }));
        }
    };

    const handleAdditionalInfoToggle = () => {
        setIsAdditionalInfoVisible((prevValue) => !prevValue);
    };

    const handleBasicInfoSubmit = (e) => {
        e.preventDefault();
        // Perform basic info update logic here
        // You can use the 'basicInfo' state to send updated basic info to your API or database
        console.log('Submitting Basic Info:', basicInfo);
        setIsBasicInfoUpdateSuccessful(true);
        UpdateDataSb("user", "cod", userId, basicInfo);
    };

    const handleAdditionalInfoSubmit = (e) => {
        e.preventDefault();

        // Crear una copia actualizada de additionalInfo
        const updatedAdditionalInfo = { ...additionalInfo };

        // Aplicar conversión a mayúsculas solo a campos de entrada de texto que no son select
        Object.keys(updatedAdditionalInfo).forEach((key) => {
            const value = updatedAdditionalInfo[key];
            if (typeof value === 'string' && key !== 'wdtcod' && key !== 'ocptdtcod' && key !== 'cecodtcod') {
                updatedAdditionalInfo[key] = value.toUpperCase();
            }
        });

        // Realizar la actualización
        console.log('Submitting Additional Info:', updatedAdditionalInfo);
        UpdateDataSb("user", "cod", userId,
            {
                phonenumber: updatedAdditionalInfo.phonenumber,
                address: updatedAdditionalInfo.address,
                wdtcod: updatedAdditionalInfo.wdtcod == "" || updatedAdditionalInfo.wdtcod == undefined ? null : updatedAdditionalInfo.wdtcod,
                ocptdtcod: updatedAdditionalInfo.ocptdtcod == "" || updatedAdditionalInfo.ocptdtcod == undefined ? null : updatedAdditionalInfo.ocptdtcod,
                cecodtcod: updatedAdditionalInfo.cecodtcod == "" || updatedAdditionalInfo.cecodtcod == undefined ? null : updatedAdditionalInfo.cecodtcod,
                startworkdate: updatedAdditionalInfo.startworkdate == "" || updatedAdditionalInfo.startworkdate == undefined ? null : updatedAdditionalInfo.startworkdate,
                birthdate: updatedAdditionalInfo.birthdate == "" || updatedAdditionalInfo.birthdate == undefined ? null : updatedAdditionalInfo.birthdate,
                expyear: updatedAdditionalInfo.expyear,
                campaingnumber: updatedAdditionalInfo.campaingnumber,
                edulevel: updatedAdditionalInfo.edulevel,
                skills: updatedAdditionalInfo.skills,
                shirtsize: updatedAdditionalInfo.shirtsize,
                pantsize: updatedAdditionalInfo.pantsize,
                shoesize: updatedAdditionalInfo.shoesize,
                jobtime: updatedAdditionalInfo.jobtime,

            });
        setIsAdditionalInfoUpdateSuccessful(true);
    };



    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isAdditionalInfoUpdateSuccessful) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // hide the message after 3 seconds
        }
    }, [isAdditionalInfoUpdateSuccessful]);

    return (
        <div className='pagina'>
            <h2 className='tittlepage'>Formulario de ususario</h2>

            {basicInfo !== undefined && (

                <div className='md:grid md:grid-cols-1 md:gap-2 '>
                    <div className='p-5'>
                        <div>
                            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                                Información Básica
                            </Typography>
                            <form onSubmit={handleBasicInfoSubmit} className="">
                                <TextField
                                    type='text'
                                    name='cod'
                                    value={basicInfo.cod || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    fullWidth
                                    //make not editable
                                    disabled
                                    required
                                /> <div className='h-5'></div>
                                <TextField
                                    label="Apellidos"
                                    type='text'
                                    name='lastname'
                                    value={basicInfo.lastname || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    required
                                    disabled
                                    fullWidth
                                /><div className='h-5'></div>
                                <TextField
                                    label="Nombres"
                                    type='text'
                                    name='name'
                                    value={basicInfo.name || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    required
                                /><div className='h-5'></div>
                                <TextField
                                    label="DNI"
                                    type='text'
                                    name='dni'
                                    value={basicInfo.dni || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    required
                                    disabled
                                    fullWidth
                                /><div className='h-5'></div>
                                <FormControl fullWidth>
                                    <InputLabel id="gender">Genero</InputLabel>
                                    <Select
                                        labelId='gender'
                                        name='gender'
                                        value={basicInfo.gender || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        label="Genero"
                                        fullWidth
                                        required
                                        disabled
                                    ><div className='h-5'></div>
                                        <MenuItem value={'M'}>Masculino</MenuItem>
                                        <MenuItem value={'F'}>Femenino</MenuItem>
                                        <MenuItem value={'O'}>Otro</MenuItem>
                                    </Select></FormControl><div className='h-5'></div>
                                <div className='hidden'>
                                    <FormControl variant="outlined" fullWidth>
                                        <AutoCompleteRemoteSubmit
                                            db={"detaillocationzone"}
                                            title="Sede"
                                            dataprops={['lcdtcod', 'lcdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                            value={basicInfo.lcdtcod || ''}
                                            onChange={(selectedValue) => handleInputChange({ target: { name: 'state', value: selectedValue } }, 'basic')}
                                            required
                                            disabled
                                        /><div className='h-5'></div>
                                    </FormControl>

                                    <FormControl variant="outlined" fullWidth className='hidden'>
                                        <AutoCompleteRemoteSubmit
                                            db={"subdepartamentdetail"}
                                            title="Subdepartamento"
                                            dataprops={['sdptdtcod', 'sdptdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                            value={basicInfo.sdptdtcod || ''}
                                            onChange={(selectedValue) => handleInputChange({ target: { name: 'ubicacion', value: selectedValue } }, 'basic')}
                                            required
                                            disabled
                                        /><div className='h-5'></div>
                                    </FormControl>
                                </div>

                                <FormControl fullWidth>
                                    <InputLabel id="state">Estado</InputLabel>
                                    <Select
                                        labelId='state'
                                        name='state'
                                        value={basicInfo.state || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        label="Estado"
                                        fullWidth
                                        required
                                        disabled
                                    ><div className='h-5'></div>
                                        <MenuItem value={'ACTIVO'}>Activo</MenuItem>
                                        <MenuItem value={'INACTIVO'}>Inactivo</MenuItem>
                                    </Select></FormControl><div className='h-5'></div>
                                <div style={{ display: 'none', justifyContent: 'flex-end' }}>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        color="primary"

                                    >
                                        Actualizar Información Básica
                                    </Button>
                                </div>
                                {isBasicInfoUpdateSuccessful && (
                                    <Typography variant="body1" style={{ color: 'green', marginTop: '8px' }}>
                                        ¡Actualización exitosa!
                                    </Typography>
                                )}
                            </form> </div></div>

                    <div className='p-5'>
                        <div>
                            <form onSubmit={handleAdditionalInfoSubmit} className="mt-5">
                                <TextField
                                    label="Numero de celular"
                                    type='text'
                                    name='phonenumber'
                                    value={additionalInfo.phonenumber || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth

                                //i want to have space between the fields

                                />
                                <div className='h-5'></div>
                                <TextField
                                    label="Direccion"
                                    type='text'
                                    name='address'
                                    value={additionalInfo.address || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth className="mt-3"
                                />
                                <div className='h-5'></div>
                                <FormControl fullWidth>
                                    <AutoCompleteRemoteSubmit
                                        db={"workdetail"}
                                        title="Labor"
                                        dataprops={['wdtcod', 'wdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                        value={additionalInfo.wdtcod || ''}
                                        onChange={(selectedValue) => handleInputChange({ target: { name: 'wdtcod', value: selectedValue } }, 'additional')}

                                    />
                                </FormControl>
                                <div className='h-5'></div>
                                <FormControl fullWidth>
                                    <AutoCompleteRemoteSubmit
                                        db={"occupationdetail"}
                                        title="Ocupación"
                                        dataprops={['ocptdtcod', 'ocptdtdesc']} // Asegúrate de reemplazar con los nombres correctos    
                                        value={additionalInfo.ocptdtcod || ''}
                                        onChange={(selectedValue) => handleInputChange({ target: { name: 'ocptdtcod', value: selectedValue } }, 'additional')}

                                    /></FormControl>
                                <div className='h-5'></div>
                                <FormControl fullWidth>
                                    <AutoCompleteRemoteSubmit
                                        db={"cecodetail"}
                                        title="Centro de Costo"
                                        dataprops={['cecodtcod', 'cecodtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                        value={additionalInfo.cecodtcod || ''}
                                        onChange={(selectedValue) => handleInputChange({ target: { name: 'cecodtcod', value: selectedValue } }, 'additional')}

                                    /></FormControl>
                                <div className='h-5'></div>
                                <InputLabel id="startworkdate">Fecha de Ingreso</InputLabel>
                                <TextField

                                    labelid="startworkdate"
                                    type='date'
                                    name='startworkdate'
                                    value={additionalInfo.startworkdate || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <InputLabel id="birthdate">Fecha de Nacimiento</InputLabel>
                                <TextField
                                    labelid="birthdate"
                                    type='date'
                                    name='birthdate'
                                    value={additionalInfo.birthdate || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <TextField
                                    label="Años de experiencia"
                                    type='number'
                                    name='expyear'
                                    value={additionalInfo.expyear || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <TextField
                                    label="Numero de campañas"
                                    type='number'
                                    name='campaingnumber'
                                    value={additionalInfo.campaingnumber || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <FormControl fullWidth>
                                    <InputLabel id="edulevel" >Nivel de estudios</InputLabel>
                                    <Select
                                        labelId='edulevel'
                                        name='edulevel'
                                        value={additionalInfo.edulevel || ''}
                                        onChange={(e) => handleInputChange(e, 'additional')}
                                        label="Nivel de estudios"
                                        fullWidth
                                    ><div className='h-5'></div>
                                        <MenuItem value={'PRIMARIA'}>Primaria</MenuItem>
                                        <MenuItem value={'SECUNDARIA'}>Secundaria</MenuItem>
                                        <MenuItem value={'TECNICO'}>Técnico</MenuItem>
                                        <MenuItem value={'UNIVERSITARIO'}>Universitario</MenuItem>
                                        <MenuItem value={'POSTGRADO'}>Postgrado</MenuItem>
                                    </Select></FormControl><div className='h-5'></div>
                                <MultilineTextField
                                    label="Habilidades"
                                    name="skills"
                                    value={additionalInfo.skills || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                /><div className='h-5'></div>
                                <TextField
                                    label="Talla de polo"
                                    type='text'
                                    name='shirtsize'
                                    value={additionalInfo.shirtsize || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <TextField
                                    label="Talla de pantalon"
                                    type='text'
                                    name='pantsize'
                                    value={additionalInfo.pantsize || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <TextField
                                    label="Talla de zapato"
                                    type='text'
                                    name='shoesize'
                                    value={additionalInfo.shoesize || ''}
                                    onChange={(e) => handleInputChange(e, 'additional')}
                                    variant="outlined"
                                    fullWidth
                                /><div className='h-5'></div>
                                <FormControl fullWidth>
                                    <InputLabel id="jobtime">Tipo de horario</InputLabel>
                                    <Select
                                        labelId='jobtime'
                                        name='jobtime'
                                        value={additionalInfo.jobtime || ''}
                                        onChange={(e) => handleInputChange(e, 'additional')}
                                        label="Tipo de horario"
                                        fullWidth
                                    ><div className='h-5'></div>
                                        <MenuItem value={'OFICINA'}>Horario oficina</MenuItem>
                                        <MenuItem value={'CAMPO'}>Horario campo</MenuItem>
                                    </Select></FormControl><div className='h-5'></div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        color="primary"
                                    >
                                        Actualizar Información Adicional
                                    </Button>
                                </div>
                                {/*isAdditionalInfoUpdateSuccessful with settmeout and cancel button that set original data before update */}
                                {isAdditionalInfoUpdateSuccessful && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">¡Éxito!</strong>
                                        <span className="block sm:inline">¡Actualización exitosa!</span>
                                    </div>
                                )}
                            </form></div>
                    </div>

                </div>
            )}

        </div>
    );
};


export default UserProfileEditForm;

