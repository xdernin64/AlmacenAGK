import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { convertirHoraEnDecimal, sumarDias } from '../../charts/chartshelpers/functionhelpers';
import { getMatchingValue2, getStatusBackgroundColor, getStatusColor } from '../../../helpers/combineddata';
import AutoCompleteRemoForteForm from '../../molecules/fields/AutocompleteForFroms';
import { convertDateFormat } from '../../../helpers/dateconverter';
import { CreateFromObject } from '../../../helpers/CRUD/CREATE/CREATEDATASB';
import { UpdateDataSb } from '../../../helpers/CRUD/UPDATE/UpdateDataSb';
import { DeleteDataSb } from '../../../helpers/CRUD/DELETE/DeleteDataSb';
import { deleteDataSwal, errorMessage } from '../../../helpers/Alerts/alerts';

import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import PopverHistorial from '../popvers/Historial';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClose, rowData, occupation, work, ceco, location, subdepartamentdata, currentdateinput }) {

    const [intime, setIntime] = React.useState('');
    const [outtime, setOuttime] = React.useState('');
    const [extratime25, setExtratime25] = React.useState('');
    const [extratime35, setExtratime35] = React.useState('');
    const [workinghours, setWorkinghours] = React.useState('');
    const [doubletime, setDoubletime] = React.useState('');
    const [discountime, setDiscountime] = React.useState('');
    const [asdesc, setAsDesc] = React.useState('');
    const [lcdtcod, setLcdtcod] = React.useState('');
    const [sdptdtcod, setSdptdtcod] = React.useState('');
    const [ocptdtcod, setOcptdtcod] = React.useState('');
    const [wdtcod, setWdtcod] = React.useState('');
    const [cecodtcod, setCecodtcod] = React.useState('');
    const [stateas, setStateas] = React.useState('');
    const [jobtime, setJobtime] = React.useState('');
    const [cod, setCod] = React.useState('');
    const [codas, setCodas] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [dateas, setDateAs] = React.useState('');
    const [hiden, setHiden] = React.useState(false);
    const [bgcolor, setBgcolor] = React.useState('bg-gray-200');
    /* */
    const setresetdata = () => {
        setIntime('00:00');
        setOuttime('00:00');
        setExtratime25(0);
        setExtratime35(0);
        setWorkinghours(0);
        setDoubletime(0);
        setDiscountime(0);
        setAsDesc('');
        setLcdtcod('');
        setSdptdtcod('');
        setOcptdtcod('');
        setWdtcod('');
        setCecodtcod('');
        setStateas('');
    }	
    React.useEffect(() => {
        if (open) {
            setJobtime(rowData?.jobtime || '');
            GetPrimaryData("assistence", "*", { codas: rowData.cod + currentdateinput }).then((res) => {
                if (res.length == 0) {
                    //Si no hay registros de asistencia para el dia actual
                    const dianterior = rowData.cod + sumarDias(currentdateinput, 0)
                    GetPrimaryData("assistence", "*", { codas: dianterior }).then((res) => {
                        if (res.length == 0) {
                            console.log("no hay registros")
                            setresetdata()
                        } else {
                                if (res[0].stateas == "ASISTENCIA" && rowData.jobtime == "CAMPO") {
                                    setIntime("06:00")
                                    setOuttime("14:45")
                                } else if (res[0].stateas == "ASISTENCIA" && rowData.jobtime == "OFICINA") {
                                    setIntime("06:00")
                                    setOuttime("15:30")
                                }
                                handleWorkChange(res[0].wdtcod)
                                handlechangeocupation(res[0].ocptdtcod)
                        }

                    })
                } else {
                    console.log("esta es la asistencia !!!", res)
                    setExtratime25(res[0]?.extratime25 || '')
                    setExtratime35(res[0]?.extratime35 || '')
                    setWorkinghours(res[0]?.workinghours || '')
                    setDoubletime(res[0]?.doubletime || '')
                    setDiscountime(res[0]?.discountime || '')
                    setAsDesc(res[0]?.asdesc || '')
                    setLcdtcod(res[0]?.lcdtcod || '')
                    setSdptdtcod(res[0]?.sdptdtcod || '')
                    setOcptdtcod(res[0]?.ocptdtcod || '')
                    setWdtcod(res[0]?.wdtcod || '')
                    setCecodtcod(res[0]?.cecodtcod || '')
                    setStateas(res[0]?.stateas || '')
                    setCod(res[0]?.cod || '')
                    setDateAs(res[0]?.dateas || '')
                    setIntime(res[0]?.intime || '')
                    setOuttime(res[0]?.outtime || '')
                    setAsDesc(res[0]?.asdesc || '')
                    handleWorkChange(res[0].wdtcod)
                    handlechangeocupation(res[0].ocptdtcod)
                }
            })
        }

        
        
        setCod(rowData?.cod || '');
        setCodas(rowData?.codas || '');
        setName(rowData?.name || '');
        setLastname(rowData?.lastname || '');
        setDateAs(rowData?.dateas || '');

    }, [rowData]);



    const handleSubmit = () => {
        // TODO: Implement submit data logic here
        if (codas === "") {
            //console.log("no hay codas")
            CreateFromObject("assistence", [{
                intime,
                outtime,
                extratime25,
                extratime35,
                workinghours,
                doubletime,
                discounthours: discountime,
                asdesc,
                lcdtcod,
                sdptdtcod,
                ocptdtcod,
                wdtcod,
                cecodtcod,
                stateas,
                jobtime,
                cod,
                codas: cod + currentdateinput,
                dateas: currentdateinput
            }])
            handleClose();
        } else {
            
            UpdateDataSb("assistence", "codas", codas, [{
                intime,
                outtime,
                extratime25,
                extratime35,
                workinghours,
                doubletime,
                discounthours: discountime,
                asdesc,
                lcdtcod,
                sdptdtcod,
                ocptdtcod,
                wdtcod,
                cecodtcod,
                stateas,
                jobtime,
                cod,
                dateas: currentdateinput
            }])
            handleClose();
        }
    };

    const handleremove = () => {

        if (codas == "") {
            errorMessage("No se puede eliminar un registro que no existe")
        } else {
            deleteDataSwal(() => {
                DeleteDataSb("assistence", "codas", codas);
                handleClose();
            }, "¿Estás seguro de eliminar el registro?", "Error al eliminar el registro", "Registro eliminado correctamente")
        }
    }
    const handlechangeocupation = (e) => {
        setOcptdtcod(e)
        setStateas(getMatchingValue2(occupation, "stateasocpt", "ocptdtcod", e))
        setSdptdtcod(getMatchingValue2(occupation, "sdptdtcod", "ocptdtcod", e))

    }
    const handleWorkChange = (e) => {
        //here lctdtcod and ocptdtcod
        setWdtcod(e)
        setLcdtcod(getMatchingValue2(work, "lctdtcod", "wdtcod", e))
        setCecodtcod(getMatchingValue2(work, "cecodtcod", "wdtcod", e))

    }

    React.useEffect(() => {
        //seteando para stateas ASISTENCIA
        if (stateas == 'ASISTENCIA') {
            setDoubletime(0);
            setDiscountime(0);
            setHiden(false);

            if (jobtime == 'OFICINA') {

                //if intime or outtime is null then do nothing (why
                if (intime == '00:00' & outtime == '00:00') {
                    setIntime('06:00');
                    setOuttime('15:30');
                } else if (intime == '18:00') {
                    setWorkinghours(8)
                    setExtratime25(2)
                    setExtratime35(1.25)
                } else {
                    if (convertirHoraEnDecimal(outtime) <= 15.5) {
                        setWorkinghours(8)
                        setExtratime25(0)
                        setExtratime35(0)
                    } else if (convertirHoraEnDecimal(outtime) > 15.5) {
                        setWorkinghours(8)
                        if (convertirHoraEnDecimal(outtime) - 15.5 > 2) {
                            setExtratime25(parseFloat((2).toFixed(2)))
                            setExtratime35(parseFloat((convertirHoraEnDecimal(outtime) - 15.5 - 2).toFixed(2)))
                        } else {
                            setExtratime25(parseFloat((convertirHoraEnDecimal(outtime) - 15.5).toFixed(2)))
                            setExtratime35(0)
                        }
                    }
                }
            } else {


                if (intime == '00:00' & outtime == '00:00') {
                    setIntime('06:00');
                    setOuttime('14:45');
                } else if (intime == '18:00') {
                    setWorkinghours(8)
                    setExtratime25(2)
                    setExtratime35(1.25)
                } else {
                    if (convertirHoraEnDecimal(outtime) <= 14.75) {
                        setWorkinghours(8)
                        setExtratime25(0)
                        setExtratime35(0)
                    } else if (convertirHoraEnDecimal(outtime) > 14.75) {

                        setWorkinghours(8)
                        if (convertirHoraEnDecimal(outtime) - 14.75 > 2) {
                            setExtratime25(parseFloat((2).toFixed(2)))
                            setExtratime35(parseFloat((convertirHoraEnDecimal(outtime) - 14.75 - 2).toFixed(2)))
                        } else {
                            setExtratime25(parseFloat((convertirHoraEnDecimal(outtime) - 14.75).toFixed(2)))
                            setExtratime35(0)
                        }
                    }
                }
            }
        } else if (stateas == 'ASISTENCIA FERIADO') {
            setWorkinghours(0);
            setExtratime25(0);
            setExtratime35(0);
            setDiscountime(0);
            setHiden(false);

            if (jobtime == 'OFICINA') {
                if (intime == '00:00' & outtime == '00:00') {
                    setIntime('06:00');
                    setOuttime('14:45');
                } else if (intime == '18:00') {
                    setDoubletime(11.25);
                } else {
                    if (convertirHoraEnDecimal(outtime) <= 15.5) {
                        setDoubletime(parseFloat((8).toFixed(2)));
                    } else {
                        setDoubletime(parseFloat((convertirHoraEnDecimal(outtime) - 15.5 + 8).toFixed(2)));
                    }
                }
            } else {
                if (intime == '00:00' & outtime == '00:00') {
                    setIntime('06:00');
                    setOuttime('14:45');
                } else if (intime == '18:00') {
                    setDoubletime(11.25);
                } else {
                    setDoubletime(parseFloat((convertirHoraEnDecimal(outtime) - convertirHoraEnDecimal(intime) - 0.75).toFixed(2)));
                }
            }
        } else if (stateas == 'DXHA') {
            setWorkinghours(0);
            setExtratime25(0);
            setExtratime35(0);
            setDoubletime(0);
            setDiscountime(parseFloat((8).toFixed(2)));
            setIntime('00:00');
            setOuttime('00:00');
            setHiden(true);
            //i want to set inputs insde the class controlhoras disabled
            //add class in the div controlhoras



        } else {
            setWorkinghours(0);
            setExtratime25(0);
            setExtratime35(0);
            setDoubletime(0);
            setDiscountime(0);
            setIntime('00:00');
            setOuttime('00:00');
            setHiden(true);
        }

    }, [stateas, intime, outtime]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openpopver = Boolean(anchorEl);


    return (
        <React.Fragment>
            {(rowData !== null) ? (<BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={'md'}
            >

                <DialogTitle sx={{ m: 0, p: 0.5 }} id="customized-dialog-title" style={{ backgroundColor: getStatusBackgroundColor(stateas), padding: '8px', color: getStatusColor(stateas) }}>
                    {lastname} {name} ({jobtime})
                    <Typography style={{ backgroundColor: getStatusBackgroundColor(stateas), color: getStatusColor(stateas) }} className='text-gray-600'>
                        {cod}
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <Typography className='text-gray-900 text-end text-bold relative'>
                        Fecha: {convertDateFormat(rowData.dateas)}
                    </Typography>
                    <Typography component={'div'}>
                        <div>
                        </div>
                        <div className={`grid grid-flow-col w-100 ${hiden ? 'hidden' : ''}`} >
                            <div>
                                <label className='text-gray-500 text-bold '>Ingreso</label>
                                <input id="intime" type="time" placeholder='Hora de ingreso' value={intime} onChange={(e) => setIntime(e.target.value)} />
                            </div>
                            <div>
                                <label className='text-gray-500 text-bold' >Salida</label>

                                <input id="outtime" type="time" placeholder='Hora de salida' value={outtime} onChange={(e) => setOuttime(e.target.value)} />
                            </div>
                        </div>
                        {/*div to calculate extra time difference between times*/}
                        <div className={`grid grid-flow-row w-100 border-gray-300 bg-gray-200 border hidden`}>
                            <div className='grid grid-flow-col bg-gray-600 text-center rounded-lg'>
                                <div>
                                    <label className='text-gray-300 text-bold '>HE totales</label>
                                    <input id="extratime" type="number" placeholder='HE Totales' className='bg-blue-gray-100 font-bold text-center' value={parseFloat(Number(extratime25) + Number(extratime35)).toFixed(2)} onChange={() => { }} />
                                </div>
                                <div>
                                    <label className='text-gray-300 text-bold'>HE 25%</label>
                                    <input id="extratime25" type="number" placeholder='HE 25%' className='bg-blue-gray-100 font-bold text-center' value={extratime25} onChange={(e) => setExtratime25(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-300 text-bold'>HE 35%</label>
                                    <input id="extratime35" type="number" placeholder='HE 35%' className='bg-blue-gray-100 font-bold text-center' value={extratime35} onChange={(e) => setExtratime35(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-flow-col bg-gray-600 text-center'>
                                <div>
                                    <label className='text-gray-300 text-bold'>H.Trabajo</label>
                                    <input id="workinghours" type="number" className='bg-blue-gray-100 font-bold text-center' placeholder='H. trabajo' value={workinghours} onChange={(e) => setWorkinghours(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-300 text-bold'>H. dobles</label>
                                    <input id="doubletime" type="number" className='bg-blue-gray-100 font-bold text-center' placeholder='H. Dobles' value={doubletime} onChange={(e) => setDoubletime(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-300 text-bold'>H. descontadas </label>
                                    <input id="discountime" type="number" className='bg-blue-gray-100 font-bold text-center' placeholder='H. Descontadas' value={discountime} onChange={(e) => setDiscountime(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <label className='text-gray-500 text-bold'>Observaciones</label>

                        <input id="asdesc" type="text" placeholder='Observaciones' value={asdesc} onChange={(e) => setAsDesc(e.target.value)} />
                        <div className='text-end '>
                            <div className='text-end '>

                                <PopverHistorial anchorEl={anchorEl} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} open={openpopver} fecha={currentdateinput} codigo={rowData.cod} openmodal={open} />
                            </div></div>

                        <label className='text-gray-500 text-bold'>Ocupación</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["ocptdtcod", "ocptdtdesc", "occupationcod"]} local localdb={occupation} value={ocptdtcod} onChange={(e) => handlechangeocupation(e)} />
                        <label className='text-gray-500 text-bold'>Labor</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["wdtcod", "wdtdesc", "workcod"]} local localdb={work} value={wdtcod} onChange={(e) => handleWorkChange(e)} />
                    </Typography>
                </DialogContent>
                <DialogActions style={{ backgroundColor: getStatusBackgroundColor(stateas), padding: '8px', color: getStatusColor(stateas) }}>

                    <button className='bg-red-300 text-gray-100' onClick={handleremove}>
                        Eliminar Registro
                    </button>
                    <button className='bg-green-300 text-blue-gray-900' onClick={handleSubmit}>
                        Guardar Cambios
                    </button>
                </DialogActions>
            </BootstrapDialog>) : (<></>)}

        </React.Fragment>
    );
}
