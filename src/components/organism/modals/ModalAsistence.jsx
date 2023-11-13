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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleClose, rowData }) {
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
        });
    };

    return (
        <React.Fragment>
            {(rowData !== null) ? (<BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {rowData.lastname} {rowData.name} ({rowData.jobtime})
                    <Typography className='text-gray-600'>
                        {rowData.cod}
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
                        Fecha: {rowData.dateAs}
                    </Typography>
                    <Typography component={'div'}>
                        <div className='grid grid-flow-col w-100'>
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
                        <div className='grid grid-flow-row w-100 border-gray-300 bg-gray-200 border'>
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
                        <input id="cecodtcod" type="text" placeholder='Ceco' value={cecodtcod} onChange={(e) => setCecodtcod(e.target.value)} />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>) : (<></>)}

        </React.Fragment>
    );
}
