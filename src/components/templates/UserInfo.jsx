import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { getdata, getdatarealtimedatabase, getonedatarealtimedatabase } from '../../helpers/CRUD/READ/GetAreasData';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { UpdateUserData } from '../../helpers/CRUD/UPDATE/UpdateFunctions';

const UserInfoEdit = () => {
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
        const unsubscribe = getonedatarealtimedatabase(`users/`, userId, (data) => {
            if (data[0]) {
                const user = data[0];
                setBasicInfo({
                    cod: user.codigo || '',
                    lastname: user.apellidos || '',
                    name: user.nombres || '',
                    cod: user.dni || '',
                    ubicacion: user.ubicacion || '',
                    estado: user.estado || '',
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
                    laborpd: user.laborpd || '',
                    ocupacionpd: user.ocupacionpd || '',
                    cecopd: user.cecopd || '',
                    tipohorario: user.tipohorario || '',
                });
            }

        });
        console.log(userId);
        return unsubscribe;

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
        UpdateUserData(basicInfo, userId);
        setIsBasicInfoUpdateSuccessful(true);
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
        <div className='bg-gray-100 min-h-screen py-8'>
            <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-2xl font-semibold flex items-center'>
                    <span>Editar usuario</span>
                    <EditIcon className='ml-2 text-gray-500' />
                </h1>
                {basicInfo !== undefined && (
                    <div>
                        <div className='mt-6'>
                            <h2 className='text-lg font-semibold mb-2'>Información Básica</h2>
                            <form className='space-y-4' onSubmit={handleBasicInfoSubmit}>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Código:</label>
                                    <input
                                        type='text'
                                        name='codigo'
                                        value={basicInfo.codigo || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        className='border rounded-md p-2'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Apellidos:</label>
                                    <input
                                        type='text'
                                        name='apellidos'
                                        value={basicInfo.apellidos || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        className='border rounded-md p-2'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Nombres:</label>
                                    <input
                                        type='text'
                                        name='nombres'
                                        value={basicInfo.nombres || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        className='border rounded-md p-2'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>DNI:</label>
                                    <input
                                        type='text'
                                        name='dni'
                                        value={basicInfo.dni || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        className='border rounded-md p-2'
                                        required
                                    />
                                </div>
                                {
                                    ubidata !== undefined ? (<>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Ubicación:</label>
                                        <select
                                            name='ubicacion'
                                            value={basicInfo.ubicacion || ''}
                                            onChange={(e) => handleInputChange(e, 'basic')}
                                            className='border rounded-md p-2'
                                            required >
                                            <option value=''>Selecciona una opción</option>
                                            {ubidata.map((option, index) => (
                                                <option key={index} value={option.codubi}>
                                                    {option.codubi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    </>) : (<></>)
                                }
                                




                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Estado:</label>
                                    <select
                                        name='estado'
                                        value={basicInfo.estado || ''}
                                        onChange={(e) => handleInputChange(e, 'basic')}
                                        className='border rounded-md p-2'
                                        required
                                    >
                                        <option value=''>Selecciona una opción</option>
                                        <option value='ACTIVO'>ACTIVO</option>
                                        <option value='INACTIVO'>INACTIVO</option>
                                    </select>

                                </div>
                                <div className='w-100 flex justify-end '>
                                    <button
                                        type='submit'
                                        className='bg-cyan-600 text-white text-center justify-center px-4 py-2 rounded-md mt-4'
                                    >
                                        Actualizar Información Básica
                                    </button></div>
                                {isBasicInfoUpdateSuccessful && (
                                    <p className='text-green-500 mt-2'>¡Actualización exitosa!</p>
                                )}
                            </form>
                        </div>

                        {/* Información Adicional */}
                        <div className='mt-6 border-t-2 pt-5 border-gray-300'>
                            <h2 className='text-lg font-semibold mb-5'>
                                <div
                                    onClick={handleAdditionalInfoToggle}
                                    className='  text-blue-gray-500 font-extrabold cursor-pointer'
                                >
                                    Información Adicional
                                    {isAdditionalInfoVisible ? (<UnfoldLessIcon />) : (<UnfoldMoreIcon />)}
                                </div>
                            </h2>
                            {isAdditionalInfoVisible && (
                                <form className='space-y-4' onSubmit={handleAdditionalInfoSubmit}>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Fecha de Ingreso:</label>
                                        <input
                                            type='date'
                                            name='fingreso'
                                            value={additionalInfo.fingreso || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Fecha de Nacimiento:</label>
                                        <input
                                            type='date'
                                            name='fnacimiento'
                                            value={additionalInfo.fnacimiento || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Número de Celular:</label>
                                        <input
                                            type='text'
                                            name='numcelular'
                                            value={additionalInfo.numcelular || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Talla de Zapato:</label>
                                        <input
                                            type='text'
                                            name='tzapato'
                                            value={additionalInfo.tzapato || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Talla de Polo:</label>
                                        <input
                                            type='text'
                                            name='tpolo'
                                            value={additionalInfo.tpolo || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Talla de Pantalón:</label>
                                        <input
                                            type='text'
                                            name='tpantalon'
                                            value={additionalInfo.tpantalon || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Número de campañas:</label>
                                        <input
                                            type='text'
                                            name='numcamp'
                                            value={additionalInfo.numcamp || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Años de Experiencia:</label>
                                        <input
                                            type='text'
                                            name='aexp'
                                            value={additionalInfo.aexp || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Nivel de Estudios:</label>
                                        <input
                                            type='text'
                                            name='nivestudios'
                                            value={additionalInfo.nivestudios || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Habilidades (una por una):</label>
                                        <textarea
                                            name='skills'
                                            value={additionalInfo.skills || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    {gerenciadata !== undefined && departamentodata !== undefined && laborpd !== undefined && ocupacionpd !== undefined && cecopd !== undefined ? (
                                        <>
                                            <div className='flex flex-col'>
                                                <label className='text-gray-600'>Gerencia:</label>
                                                <select
                                                    name='gerenciapd'
                                                    value={additionalInfo.gerenciapd || ''}
                                                    onChange={(e) => handleInputChange(e, 'additional')}
                                                    className='border rounded-md p-2'
                                                >
                                                    <option value=''>Selecciona una opción</option>
                                                    {gerenciadata.map((option, index) => (
                                                        <option key={index} value={option.areacod}>
                                                            {option.areacod + ' - ' + option.areaname}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex flex-col'>
                                                <label className='text-gray-600'>Departamento:</label>
                                                <select
                                                    name='departamentopd'
                                                    value={additionalInfo.departamentopd || ''}
                                                    onChange={(e) => handleInputChange(e, 'additional')}
                                                    className='border rounded-md p-2'
                                                >
                                                    <option value=''>Selecciona una opción</option>
                                                    {departamentodata.map((option, index) => (
                                                        <option key={index} value={option.subareacod}>
                                                            {option.subareacod + ' - ' + option.subareaname}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex flex-col'>
                                                <label className='text-gray-600'>Labor:</label>
                                                <select name='laborpd' value={additionalInfo.laborpd || ''} onChange={(e) => handleInputChange(e, 'additional')} className='border rounded-md p-2'>
                                                    <option value=''>Selecciona una opción</option>
                                                    {laborpd.map((option, index) => (
                                                        <option key={index} value={option.codlab}>
                                                            {option.codlab + ' - ' + option.namelab}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex flex-col'>
                                                <label className='text-gray-600'>Ocupación:</label>
                                                <select name='ocupacionpd' value={additionalInfo.ocupacionpd || ''} onChange={(e) => handleInputChange(e, 'additional')} className='border rounded-md p-2'>
                                                    <option value=''>Selecciona una opción</option>
                                                    {ocupacionpd.map((option, index) => (
                                                        <option key={index} value={option.codocu}>
                                                            {option.codocu + ' - ' + option.nameocu}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='flex flex-col'>
                                                <label className='text-gray-600'>Centro de Coste:</label>
                                                <select name='cecopd' value={additionalInfo.cecopd || ''} onChange={(e) => handleInputChange(e, 'additional')} className='border rounded-md p-2'>
                                                    <option value=''>Selecciona una opción</option>
                                                    {cecopd.map((option, index) => (
                                                        <option key={index} value={option.codcc}>
                                                            {option.codcc + ' - ' + option.namecc}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>




                                        </>
                                    ) : (
                                        <div></div>
                                    )}


                                    <div className='flex flex-col'>
                                        <label className='text-gray-600'>Tipo de Horario:</label>
                                        <input
                                            type='text'
                                            name='tipohorario'
                                            value={additionalInfo.tipohorario || ''}
                                            onChange={(e) => handleInputChange(e, 'additional')}
                                            className='border rounded-md p-2'
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
                                    >
                                        Actualizar Información Adicional
                                    </button>
                                    {isAdditionalInfoUpdateSuccessful && (
                                        <p className='text-green-500 mt-2'>¡Actualización exitosa!</p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfoEdit;
