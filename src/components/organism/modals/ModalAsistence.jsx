import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { convertirHoraEnDecimal } from '../../charts/chartshelpers/functionhelpers';
import { getStatusBackgroundColor, getStatusColor } from '../../../helpers/combineddata';
import AutoCompleteRemoForteForm from '../../molecules/fields/AutocompleteForFroms';
import AutocompleteComponent from '../../molecules/fields/repeatedautocomplete';
import SimpAutocomplete from '../../molecules/fields/AutoCReact.JSX';
import { convertDateFormat } from '../../../helpers/dateconverter';
import { CreateFromObject } from '../../../helpers/CRUD/CREATE/CREATEDATASB';
import { UpdateDataSb } from '../../../helpers/CRUD/UPDATE/UpdateDataSb';
import { DeleteDataSb } from '../../../helpers/CRUD/DELETE/DeleteDataSb';
import { deleteDataSwal, errorMessage } from '../../../helpers/Alerts/alerts';
import { oc, ro } from 'date-fns/locale';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClose, rowData, occupation, work, ceco, location, subdepartamentdata, currentdateinput }) {

    const [intime, setIntime] = React.useState(rowData?.intime || '');
    const [outtime, setOuttime] = React.useState(rowData?.outtime || '');
    const [extratime25, setExtratime25] = React.useState(rowData?.extratime25 || '');
    const [extratime35, setExtratime35] = React.useState(rowData?.extratime35 || '');
    const [workinghours, setWorkinghours] = React.useState(rowData?.workinghours || '');
    const [doubletime, setDoubletime] = React.useState(rowData?.doubletime || '');
    const [discountime, setDiscountime] = React.useState(rowData?.discountime || '');
    const [asdesc, setAsDesc] = React.useState(rowData?.asdesc || '');
    const [lcdtcod, setLcdtcod] = React.useState(rowData?.lcdtcod || '');
    const [sdptdtcod, setSdptdtcod] = React.useState(rowData?.sdptdtcod || '');
    const [ocptdtcod, setOcptdtcod] = React.useState(rowData?.ocptdtcod || '');
    const [wdtcod, setWdtcod] = React.useState(rowData?.wdtcod || '');
    const [cecodtcod, setCecodtcod] = React.useState(rowData?.cecodtcod || '');
    const [stateas, setStateas] = React.useState(rowData?.stateas || '');
    const [jobtime, setJobtime] = React.useState(rowData?.jobtime || '');
    const [cod, setCod] = React.useState(rowData?.cod || '');
    const [codas, setCodas] = React.useState(rowData?.codas || '');
    const [name, setName] = React.useState(rowData?.name || '');
    const [lastname, setLastname] = React.useState(rowData?.lastname || '');
    const [dateas, setDateAs] = React.useState(rowData?.dateas || '');
    const [hiden, setHiden] = React.useState(false);
    const [bgcolor, setBgcolor] = React.useState('bg-gray-200');
    
    React.useEffect(() => {
        setIntime(rowData?.intime || '');
        setOuttime(rowData?.outtime || '');
        setExtratime25(rowData?.extratime25 || '');
        setExtratime35(rowData?.extratime35 || '');
        setWorkinghours(rowData?.workinghours || '');
        setDoubletime(rowData?.doubletime || '');
        setDiscountime(rowData?.discountime || '');
        setAsDesc(rowData?.asdesc || '');
        setLcdtcod(rowData?.lcdtcod || '');
        setSdptdtcod(rowData?.sdptdtcod || '');
        setOcptdtcod(rowData?.ocptdtcod || '');
        setWdtcod(rowData?.wdtcod || '');
        setCecodtcod(rowData?.cecodtcod || '');
        setStateas(rowData?.stateas || '');
        setJobtime(rowData?.jobtime || '');
        setCod(rowData?.cod || '');
        setCodas(rowData?.codas || '');
        setName(rowData?.name || '');
        setLastname(rowData?.lastname || '');
        setDateAs(rowData?.dateas || '');
    }, [rowData]);


    const handleSubmit = () => {
        // TODO: Implement submit data logic here
        if (codas == "") {
            console.log("no hay codas")
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
            console.log("si hay codas")
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
console.log(JSON.stringify(occupation))

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
                    <Typography className='text-gray-500 text-end text-bold relative'>
                        Fecha: {convertDateFormat(rowData.dateas)}
                    </Typography>
                    <Typography component={'div'}>
                        <div>
                            
                            <select  className="" id="stateas" value={stateas} onChange={(e) => setStateas(e.target.value)}>
                                <option aria-label="None" value="" />
                                <option value="ASISTENCIA">ASISTENCIA</option>
                                <option value="ASISTENCIA FERIADO">ASISTENCIA FERIADO</option>
                                <option value="DSO">DSO</option>
                                <option value="DSO FERIADO">DSO FERIADO</option>
                                <option value="DXHA">DXHA</option>
                                <option value="FALTA">FALTA</option>
                                <option value="LICENCIA">LICENCIA</option>
                            </select>

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
                        <label className='text-gray-500 text-bold'>Fundo</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["lcdtcod", "lcdtdesc", "locationcod"]} local localdb={location} value={lcdtcod} onChange={(e) => setLcdtcod(e)} />
                        <label className='text-gray-500 text-bold'>Sub departamento</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["sdptdtcod", "sdptdtdesc", "subdepartamentcode"]} local localdb={subdepartamentdata} value={sdptdtcod} onChange={(e) => setSdptdtcod(e)} />
                        <label className='text-gray-500 text-bold'>Ocupación</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["ocptdtcod", "ocptdtdesc", "occupationcod"]} local localdb={occupation} value={ocptdtcod} onChange={(e) => setOcptdtcod(e)} />
                        <label className='text-gray-500 text-bold'>Labor</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["wdtcod", "wdtdesc", "workcod"]} local localdb={work} value={wdtcod} onChange={(e) => setWdtcod(e)} />
                        <label className='text-gray-500 text-bold'>Ceco</label>
                        <AutoCompleteRemoForteForm required db="" dataprops={["cecodtcod", "cecodtdesc", "cecocod"]} local localdb={ceco} value={cecodtcod} onChange={(e) => setCecodtcod(e)} />
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
