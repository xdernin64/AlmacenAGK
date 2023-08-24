import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { getdata, getdatarealtimedatabase, getonedatarealtimedatabase } from '../../helpers/CRUD/READ/GetAreasData';
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
import { UpdateUserData } from '../../helpers/CRUD/UPDATE/UpdateFunctions';
import { GetSpecificData } from '../../helpers/CRUD/READ/GetDataSb';
import AutoCompleteRemoteSubmit from '../molecules/fields/RAutocompleteSubmit';
import { UpdateDataSb } from '../../helpers/CRUD/UPDATE/UpdateDataSb';

const UserProfileEditForm = () => {
    const [basicInfo, setBasicInfo] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
    const [isBasicInfoUpdateSuccessful, setIsBasicInfoUpdateSuccessful] = useState(false);
    const [isAdditionalInfoUpdateSuccessful, setIsAdditionalInfoUpdateSuccessful] = useState(false);
    const [gerenciadata, setGerenciadata] = useState([]);
    const [departamentodata, setDepartamentodata] = useState([]);//detaildepartament
    const [laborpd, setLaborpd] = useState([]);//work
    const [ocupacionpd, setOcupacionpd] = useState([]);//occupation
    const [cecopd, setCecopd] = useState([]);//ceco
    const [ubidata, setUbidata] = useState([]);//location



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
                    gender:user.gender || '',
                    lcdtcod: user.lcdtcod || '',
                    sdptdtcod: user.sdptdtcod || '',
                    state: user.state || '',
                });
                setAdditionalInfo({
                    fingreso: user.fingreso || '',
                    fnacimiento: user.fnacimiento || '',
                    numcelular: user.numcelular || '',
                    tzapato: user.tzapato || '',
                    tpolo: user.tpolo || '',
                    tpantalon: user.tpantalon || '',
                    numcamp: user.numcamp || '',
                    aexp: user.aexp || '',
                    nivestudios: user.nivestudios || '',
                    skills: user.skills || '',
                    gerenciapd: user.gerenciapd || '',
                    departamentopd: user.departamentopd || '',
                    wdtcod: user.wdtcod || '',
                    ocupacionpd: user.ocupacionpd || '',
                    cecopd: user.cecopd || '',
                    tipohorario: user.tipohorario || '',
                });
            }
        };

        fetchData(); // Call the fetchData function immediately

        console.log(userId);
        console.log(basicInfo);

        // Return a cleanup function to unsubscribe if needed
        return () => {
            // Perform any cleanup logic or unsubscribe here
        };


    }, [userId]);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('details/ubicacion', setUbidata);

        return unsubscribe;
    }, []);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('areas', setGerenciadata);
        return unsubscribe;
    }, []);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('subareas', setDepartamentodata);
        return unsubscribe;
    }, []);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('details/labor', setLaborpd);
        return unsubscribe;
    }, []);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('details/ocupacion', setOcupacionpd);
        return unsubscribe;
    }, []);
    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('details/centrocoste', setCecopd);
        return unsubscribe;
    }, []);

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
        // Perform additional info update logic here
        // You can use the 'additionalInfo' state to send updated additional info to your API or database
        console.log('Submitting Additional Info:', additionalInfo);
        UpdateUserData(additionalInfo, userId);
        setIsAdditionalInfoUpdateSuccessful(true);
    };

    const iconStyle = {
        fontSize: '2rem',
        color: 'gray',
    };
    return (
        <Container component="div" maxWidth="md" style={{ backgroundColor: '#f1f1f1', minHeight: '100vh', paddingTop: '8px' }}>
            <Paper elevation={3} style={{ padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" component="h1" style={{ display: 'flex', alignItems: 'center' }}>
                    Editar usuario
                    <EditIcon style={{ marginLeft: '8px', color: '#888' }} />
                </Typography>
                {basicInfo !== undefined && (
                    <div>
                        <div style={{ marginTop: '24px' }}>
                            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                                Información Básica
                            </Typography>
                            <form onSubmit={handleBasicInfoSubmit} style={{ display: 'grid', gap: '16px' }}>
                                <TextField
                                    type='text'
                                    name='cod'
                                    value={basicInfo.cod || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Apellidos"
                                    type='text'
                                    name='lastname'
                                    value={basicInfo.lastname || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Nombres"
                                    type='text'
                                    name='name'
                                    value={basicInfo.name || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="DNI"
                                    type='text'
                                    name='dni'
                                    value={basicInfo.dni || ''}
                                    onChange={(e) => handleInputChange(e, 'basic')}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
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
                                    >
                                        <MenuItem value={'M'}>Masculino</MenuItem>
                                        <MenuItem value={'F'}>Femenino</MenuItem>
                                        <MenuItem value={'O'}>Otro</MenuItem>
                                    </Select></FormControl>
                                <FormControl variant="outlined" fullWidth>
                                    <AutoCompleteRemoteSubmit
                                        db={"detaillocationzone"}
                                        title="Sede"
                                        dataprops={['lcdtcod', 'lcdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                        value={basicInfo.lcdtcod || ''}
                                        onChange={(selectedValue) => handleInputChange({ target: { name: 'state', value: selectedValue } }, 'basic')}
                                        required
                                    />
                                </FormControl>
                                <FormControl variant="outlined" fullWidth>
                                    <AutoCompleteRemoteSubmit
                                        db={"subdepartamentdetail"}
                                        title="Subdepartamento"
                                        dataprops={['sdptdtcod', 'sdptdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                        value={basicInfo.sdptdtcod || ''}
                                        onChange={(selectedValue) => handleInputChange({ target: { name: 'ubicacion', value: selectedValue } }, 'basic')}
                                        required
                                    />
                                </FormControl>
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
                                    >
                                        <MenuItem value={'ACTIVO'}>Activo</MenuItem>
                                        <MenuItem value={'INACTIVO'}>Inactivo</MenuItem>
                                    </Select></FormControl>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                            </form>
                        </div>
                        <div style={{ marginTop: '24px', borderTop: '2px solid #ccc', paddingTop: '16px' }}>
                            <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
                                <div
                                    onClick={handleAdditionalInfoToggle}
                                    style={{ color: '#0077cc', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Información Adicional
                                    {isAdditionalInfoVisible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                                </div>
                            </Typography>
                            {isAdditionalInfoVisible && (
                                <form onSubmit={handleAdditionalInfoSubmit} style={{ display: 'grid', gap: '16px' }}>
                                        <FormControl fullWidth>
                                            <AutoCompleteRemoteSubmit
                                                db={"workdetail"}
                                                title="Labor"
                                                dataprops={['wdtcod', 'wdtdesc']} // Asegúrate de reemplazar con los nombres correctos
                                                value={additionalInfo.wdtcod || ''}
                                                onChange={(selectedValue) => handleInputChange({ target: { name: 'wdtcod', value: selectedValue } }, 'additional')}
                                                required
                                            />

                                        </FormControl>

                                </form>
                            )}
                        </div>
                    </div>
                )}
            </Paper>
        </Container>
    );
};


export default UserProfileEditForm;

