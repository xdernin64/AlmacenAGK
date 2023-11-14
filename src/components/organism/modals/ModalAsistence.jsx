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
import { Container, Paper } from '@mui/material';
import { convertirHoraEnDecimal } from '../../charts/chartshelpers/functionhelpers';
import { getStatusBackgroundColor, getStatusColor } from '../../../helpers/combineddata';
import AutoCompleteRemote from '../../molecules/fields/AutoCompleteRemote';
import SimpleAutocomplete from '../../molecules/fields/SimpleAutocomplete';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClose, rowData,occupation,work,ceco }) {

    const [intime, setIntime] = React.useState(rowData?.intime || '');
    const [outtime, setOuttime] = React.useState(rowData?.outtime || '');
    const [extratime25, setExtratime25] = React.useState(rowData?.extratime25 || '');
    const [extratime35, setExtratime35] = React.useState(rowData?.extratime35 || '');
    const [workinghours, setWorkinghours] = React.useState(rowData?.workinghours || '');
    const [doubletime, setDoubletime] = React.useState(rowData?.doubletime || '');
    const [discountime, setDiscountime] = React.useState(rowData?.discountime || '');
    const [asDesc, setAsDesc] = React.useState(rowData?.asDesc || '');
    const [lcdtcod, setLcdtcod] = React.useState(rowData?.lcdtcod || '');
    const [ocptdtcod, setOcptdtcod] = React.useState(rowData?.ocptdtcod || '');
    const [wdtcod, setWdtcod] = React.useState(rowData?.wdtcod || '');
    const [cecodtcod, setCecodtcod] = React.useState(rowData?.cecodtcod || '');
    const [stateas, setStateas] = React.useState(rowData?.stateas || '');
    const [jobtime, setJobtime] = React.useState(rowData?.jobtime || '');
    const [cod, setCod] = React.useState(rowData?.cod || '');
    const [codas, setCodas] = React.useState(rowData?.codas || '');
    const [name, setName] = React.useState(rowData?.name || '');
    const [lastname, setLastname] = React.useState(rowData?.lastname || '');
    const [subdepartamentdetail, setSubdepartamentdetail] = React.useState(rowData?.subdepartamentdetail || '');
    const [subdepartament, setSubdepartament] = React.useState(rowData?.subdepartament || '');
    const [departament, setDepartament] = React.useState(rowData?.departament || '');
    const [departamentcode, setDepartamentcode] = React.useState(rowData?.departamentcode || '');
    const [subdepartamentname, setSubdepartamentname] = React.useState(rowData?.subdepartamentname || '');
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
        setAsDesc(rowData?.asDesc || '');
        setLcdtcod(rowData?.lcdtcod || '');
        setOcptdtcod(rowData?.ocptdtcod || '');
        setWdtcod(rowData?.wdtcod || '');
        setCecodtcod(rowData?.cecodtcod || '');
        setStateas(rowData?.stateas || '');
        setJobtime(rowData?.jobtime || '');
        setCod(rowData?.cod || '');
        setCodas(rowData?.codas || '');
        setName(rowData?.name || '');
        setLastname(rowData?.lastname || '');
        setSubdepartamentdetail(rowData?.subdepartamentdetail || '');
        setSubdepartament(rowData?.subdepartament || '');
        setDepartament(rowData?.departament || '');
        setDepartamentcode(rowData?.departamentcode || '');
        setSubdepartamentname(rowData?.subdepartamentname || '');
        setDateAs(rowData?.dateas || '');
    }, [rowData]);

    const handleSubmit = () => {
        // TODO: Implement submit data logic here
        console.log('Submitting data...');
        console.log({
            intime,
            outtime,
            extratime25,
            extratime35,
            workinghours,
            doubletime,
            discountime,    
            asDesc,
            lcdtcod,
            ocptdtcod,
            wdtcod,
            cecodtcod,
            stateas,
            jobtime,
            cod,
            codas,
            name,
            lastname,
            subdepartamentdetail,
            subdepartament,
            departament,
            departamentcode,
            subdepartamentname,
            dateas,
            

        });
    };
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
                }
                if (convertirHoraEnDecimal(outtime) <= 15.5) {
                    setWorkinghours(8)
                    setExtratime25(0)
                    setExtratime35(0)
                } else if (convertirHoraEnDecimal(outtime) > 15.5) {
                    setWorkinghours(8)
                    if (convertirHoraEnDecimal(outtime) - 15.5 > 2) {
                        setExtratime25(2)
                        setExtratime35(convertirHoraEnDecimal(outtime) - 15.5 - 2)
                    } else {
                        setExtratime25(convertirHoraEnDecimal(outtime) - 15.5)
                        setExtratime35(0)
                    }
                }
            } else {
                if (intime == '00:00' & outtime == '00:00') {
                    setIntime('06:00');
                    setOuttime('14:45');
                }
                if (convertirHoraEnDecimal(outtime) <= 14.75) {
                    setWorkinghours(8)
                    setExtratime25(0)
                    setExtratime35(0)
                } else if (convertirHoraEnDecimal(outtime) > 14.75) {

                    setWorkinghours(8)
                    if (convertirHoraEnDecimal(outtime) > 2) {
                        setExtratime25(2)
                        setExtratime35(convertirHoraEnDecimal(outtime) - 14.75 - 2)
                    } else {
                        setExtratime25(convertirHoraEnDecimal(outtime))
                        setExtratime35(0)
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
                if (convertirHoraEnDecimal(outtime) <= 15.5) {
                    setDoubletime(8);
                } else {
                    setDoubletime(convertirHoraEnDecimal(outtime) - 15.5 + 8);
                }
            } else {
                setDoubletime(convertirHoraEnDecimal(outtime) - convertirHoraEnDecimal(intime) - 0.75);
            }
        } else if (stateas == 'DXHA') {
            setWorkinghours(0);
            setExtratime25(0);
            setExtratime35(0);
            setDoubletime(0);
            setDiscountime(8);
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

    return (
        <React.Fragment>
            {(rowData !== null) ? (<BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >

                <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title" style={{ backgroundColor: getStatusBackgroundColor(stateas), padding: '8px', color: getStatusColor(stateas) }}>
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
                        Fecha: {rowData.dateas}
                    </Typography>
                    <Typography component={'div'}>
                        <div>
                            <label className='text-gray-500 text-bold'>Estado</label>
                            <select id="stateas" value={stateas} onChange={(e) => setStateas(e.target.value)}>
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
                                <label className='text-gray-500 text-bold'>Ingreso</label>
                                <input id="intime" type="time" placeholder='Hora de ingreso' value={intime} onChange={(e) => setIntime(e.target.value)} />
                            </div>
                            <div>
                                <label className='text-gray-500 text-bold' >Salida</label>

                                <input id="outtime" type="time" placeholder='Hora de salida' value={outtime} onChange={(e) => setOuttime(e.target.value)} />
                            </div>
                        </div>
                        {/*div to calculate extra time difference between times*/}
                        <div className={`grid grid-flow-row w-100 border-gray-300 bg-gray-200 border ${hiden ? 'hidden' : ''}`}>
                            <div className='grid grid-flow-col'>
                                <div>
                                    <label className='text-gray-500 text-bold'>HE totales</label>
                                    <input id="extratime" type="number" placeholder='HE Totales' value={Number(extratime25) + Number(extratime35)} onChange={() => { }} />
                                </div>
                                <div>
                                    <label className='text-gray-500 text-bold'>HE 25%</label>
                                    <input id="extratime25" type="number" placeholder='HE 25%' value={extratime25} onChange={(e) => setExtratime25(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-500 text-bold'>HE 35%</label>
                                    <input id="extratime35" type="number" placeholder='HE 35%' value={extratime35} onChange={(e) => setExtratime35(e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-flow-col'>
                                <div>
                                    <label className='text-gray-500 text-bold'>H.Trabajo</label>
                                    <input id="workinghours" type="number" placeholder='H. trabajo' value={workinghours} onChange={(e) => setWorkinghours(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-500 text-bold'>H. dobles</label>
                                    <input id="doubletime" type="number" placeholder='H. Dobles' value={doubletime} onChange={(e) => setDoubletime(e.target.value)} />
                                </div>
                                <div>
                                    <label className='text-gray-500 text-bold'>H. descontadas </label>
                                    <input id="discountime" type="number" placeholder='H. Descontadas' value={discountime} onChange={(e) => setDiscountime(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <label className='text-gray-500 text-bold'>Observaciones</label>
                        <input id="asDesc" type="text" placeholder='Observaciones' value={asDesc} onChange={(e) => setAsDesc(e.target.value)} />
                        <label className='text-gray-500 text-bold'>Fundo</label>
                        <input id="lcdtcod" type="text" placeholder='Fundo' value={lcdtcod} onChange={(e) => setLcdtcod(e.target.value)} />
                        <label className='text-gray-500 text-bold'>Ocupación</label>
                        <input id="ocptdtcod" type="text" placeholder='Ocupación' value={ocptdtcod} onChange={(e) => setOcptdtcod(e.target.value)} />
                        <label className='text-gray-500 text-bold'>Labor</label>
                        <input id="wdtcod" type="text" placeholder='Labor' value={wdtcod} onChange={(e) => setWdtcod(e.target.value)} />
                        <label className='text-gray-500 text-bold'>Ceco</label>
                        <SimpleAutocomplete data={occupation} onChange={(e) => setOcptdtcod(e.target.value)} textField={ocptdtcod}  valueField={ocptdtcod}/>
                        


                        <input id="cecodtcod" type="text" placeholder='Ceco' value={cecodtcod} onChange={(e) => setCecodtcod(e.target.value)} />
                    </Typography>
                </DialogContent>
                <DialogActions style={{ backgroundColor: getStatusBackgroundColor(stateas), padding: '8px', color: getStatusColor(stateas) }}>
                    <Button sx={{ backgroundColor: 'hsla(172, 25%, 93%, 0.7)' }} onClick={handleSubmit}>
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </BootstrapDialog>) : (<></>)}

        </React.Fragment>
    );
}
