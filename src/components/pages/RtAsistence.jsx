import { useEffect, useState } from "react";
import { GetPrimaryData } from "../../helpers/CRUD/READ/GetDataSb";
import { getMatchingValue2, getPropertyByIdAndPropName, getStatusBackgroundColor, getStatusColor, mergeDatauseras2 } from "../../helpers/combineddata";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import CustomizedDialogs from "../organism/modals/ModalAsistence";
import { convertDateFormat, dateToString } from "../../helpers/dateconverter";
import { supabase } from "../../supabaseClient";
import { where } from "firebase/firestore";
import { sumarDias } from "../charts/chartshelpers/functionhelpers";
import { Progress } from "@material-tailwind/react";


const RtAsistence = ({ wheresb,rol }) => {
    const [combinedData, setCombinedData] = useState([]);
    const [copycombinedData, setCopyCombinedData] = useState([]);
    const [numberofrecords, setNumberofrecords] = useState(0);
    const [Userdata, setUserdata] = useState([]);
    const [Asistancedata, setAsistancedata] = useState([]);
    const [locationdata, setLocationdata] = useState([]);
    const [subdepartamentdata, setSubdepartamentdata] = useState([]);
    const [occupationdata, setOccupationdata] = useState([]);
    const [workData, setWorkData] = useState([]);
    const [cecoData, setCecoData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editedValue, setEditedValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); // add state to keep track of selected row
    const [orderBy, setOrderBy] = useState('cod');
    const [order, setOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentdate, setCurrentdate] = useState(dateToString(new Date()));
    const [selecteddate, setSelecteddate] = useState(dateToString(new Date()));
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setCurrentdate(newDate);
        setUpdate(true);
    };
    async function checkassistance(codas, newData2) {
        const data = await GetSpecificData("assistence", "codas", codas);
        if (data.length == 0) {
            await CreateFromObject("assistence", newData2).then(() => {
                setUpdate(true);
            });
        } else {
            await UpdateDataSb("assistence", "codas", codas, newData2).then(() => {
                setUpdate(true);
            });
        }
    }

    //efect to charge te data in the start
    useEffect(() => {
        const wherestate = { state: "TRUE", ...wheresb };
        async function getMaindata() {
            try {
                const combinedobject = { state: "ACTIVO", ...wheresb }
                const combinedobjectdate = { dateas: currentdate, ...wheresb }
                const userData = await GetPrimaryData("user", '*', { state: "ACTIVO", ...wheresb });
                const asistenceData = await GetPrimaryData("assistence", 'cod,codas,user(name,lastname,jobtime),stateas,lcdtcod,intime,outtime,jobtime,ocptdtcod,wdtcod,cecodtcod,sdptdtcod,asdesc,dateas,extratime25,extratime35,doubletime,discounthours', combinedobjectdate);
                const occupationData = await GetPrimaryData("occupationdetail", 'ocptdtcod,sdptdtcod,occupationcod,ocptdtdesc,stateasocpt', wherestate);
                const locationdata = await GetPrimaryData("detaillocationzone", '*');
                const subdepartamentdata = await GetPrimaryData("subdepartamentdetail", '*', wheresb);
                const workData = await GetPrimaryData("workdetail", '*', wherestate);
                const cecoData = await GetPrimaryData("cecodetail", '*', wheresb);
                setOccupationdata(occupationData);
                setWorkData(workData);
                setCecoData(cecoData);
                setUserdata(userData);
                setLocationdata(locationdata);
                setSubdepartamentdata(subdepartamentdata);
                setAsistancedata(asistenceData);
                setCombinedData(mergeDatauseras2(userData, asistenceData))
            }
            catch (error) {
                console.log(error);
            }
        }
        getMaindata();
    }, []);
    //actualizando la copia de combinedData

    useEffect(() => {
        if (update) {
            const combinedobjectdate = { dateas: currentdate, ...wheresb }
            GetPrimaryData('assistence', 'cod,codas,user(name,lastname,jobtime),stateas,lcdtcod,intime,outtime,jobtime,ocptdtcod,wdtcod,cecodtcod,sdptdtcod,asdesc,dateas,extratime25,extratime35,doubletime,discounthours', combinedobjectdate).then((data) => {
                setAsistancedata(data);
                setCombinedData(mergeDatauseras2(Userdata, Asistancedata));
                setUpdate(false);
                setSelecteddate(currentdate);
            });
        } else {

            setCombinedData(mergeDatauseras2(Userdata, Asistancedata));
            console.log("Escuchando");
        }

    }, [update, Asistancedata]);


    const handleOpen = (e, row) => {
    if (e.ctrlKey && (rol=="ADMINISTRADOR" || (rol!="ADMINISTRADOR" && selecteddate==dateToString(new Date())))) {
            setSelectedRow(row); // set selected row
            setOpen(true);
        }
    };
    const handleOpenbtn = (e, row) => {

        setSelectedRow(row); // set selected row
        setOpen(true);

    };

    const handleClose = () => {
        setSelectedRow(null); // reset selected row
        setOpen(false);
    };

    const handleSave = (newData) => {
        setData(newData);
        handleClose();
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = combinedData.sort((a, b) => {
        const isAsc = order === 'asc';
        let result = 0;
        if (a[orderBy] < b[orderBy]) {
            result = -1;
        } else if (a[orderBy] > b[orderBy]) {
            result = 1;
        }
        return isAsc ? result : -result;
    });

    const searched = combinedData
        .filter((row) => {
            const searchString = `${row.cod} ${row.lastname} ${row.jobtime} ${row.dateas} ${row.stateas} ${row.intime} ${row.outtime} ${row.lcdtcod} ${row.ocptdtcod} ${row.ocptdtdesc} ${row.wdtcod} ${row.cecodtcod}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
            const isAsc = order === 'asc';
            let result = 0;
            if (a[orderBy] < b[orderBy]) {
                result = -1;
            } else if (a[orderBy] > b[orderBy]) {
                result = 1;
            }
            return isAsc ? result : -result;
        });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////REALTIME-SUPABASE//////////////////////////////////////////////////////////////////////////////////
    const handleRecordInserted = (payload) => {
        console.log('Change received!', payload);
        // Actualiza el estado con el nuevo registro.
        setAsistancedata(prevData => [...prevData, payload.new]);
    }
    const handleRecordDeleted = (payload) => {
        console.log('Change received!', payload);
        // Filtra el registro eliminado del estado.
        setAsistancedata(prevData => prevData.filter(item => item.codas !== payload.old.codas));
    }

    const handleRecordUpdated = (payload) => {
        console.log('Change received!', payload);
        // Encuentra y actualiza el registro modificado en el estado.
        setAsistancedata(prevData => prevData.map(item => item.codas === payload.new.codas ? payload.new : item));
    }

    ///this is the suscription to the realtime changes
    let channel = supabase
        .channel(wheresb.sdptdtcod);

    if (wheresb.sdptdtcod !== undefined) {
        let filter = 'sdptdtcod=eq.' + wheresb.sdptdtcod;
        channel
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'assistence', filter }, handleRecordInserted)
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'assistence', filter }, handleRecordDeleted)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'assistence', filter }, handleRecordUpdated);
    } else {
        channel
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'assistence' }, handleRecordInserted)
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'assistence' }, handleRecordDeleted)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'assistence' }, handleRecordUpdated);
    }

    channel.subscribe();

    useEffect(() => {

        setCopyCombinedData(combinedData);
        setNumberofrecords(copycombinedData.filter(item => item.stateas !== "").length);
        console.log("Actualizando la copia de combinedData", numberofrecords / searched.length);
        //constando la cantidad de registros con stateas difrente a null en copycombinedData

    }, [searched]);
    return (
        <div>
            <div className="text-center flex items-center w-2/4 cursor-pointer">
                <input
                    value={currentdate}
                    onChange={handleDateChange}
                    className="text-center text-2xl mx-auto bg-gray-100 border-gray-300 rounded-md py-2 px-3"
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    onKeyPress={(e) => e.preventDefault()}
                    onKeyUp={(e) => e.preventDefault()}
                />

            </div>
            <TextField
                label="Buscar"
                variant="outlined"
                onChange={(e) => { setSearchTerm(e.target.value) }}
            />

            <div className="grid">
                <div className="text-center text-xl font-bold"> Asistencias del día  {selecteddate} ( {numberofrecords} / {combinedData.length})</div>
                <Progress value={Math.round((numberofrecords / combinedData.length) * 100)} size="lg" label={""} color="green" className="m-2" />
            </div>
            <div>

                <CustomizedDialogs 
                currentdateinput={currentdate} open={open} handleClose={handleClose} rowData={selectedRow} occupation={occupationdata} work={workData} ceco={cecoData} location={locationdata} subdepartamentdata={subdepartamentdata} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, borderWidth: 'solid' }} >
                    <TableHead className="rounded ">
                        <TableRow className="bg-blue-800 text-gray-500 font-bold" sx={{ border: 'solid 1px', borderColor: 'gray' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center" >Acción</TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'cod')}>
                                Codigo
                                {orderBy === 'cod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'lastname')}>
                                Trabajador
                                {orderBy === 'lastname' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'jobtime')}>
                                Horario
                                {orderBy === 'jobtime' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'dateas')}>
                                Fecha
                                {orderBy === 'dateas' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'stateas')}>
                                Estado
                                {orderBy === 'stateas' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'intime')}>
                                Ingreso
                                {orderBy === 'intime' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'outtime')}>
                                Salida
                                {orderBy === 'outtime' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'outtime')}>
                                Hor Extras
                                {orderBy === 'outtime' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'sdptdtcod')}>
                                Sub Area
                                {orderBy === 'sdptdtcod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'ocptdtcod')}>
                                Ocupación
                                {orderBy === 'optdtcod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                            </TableCell>

                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'wdtcod')}>
                                {orderBy === 'wdtcod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                                Labor
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'cecocod')}>
                                {orderBy === 'cecocod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                                Ceco
                            </TableCell>
                            <TableCell className="cursor-pointer" sx={{ color: 'white', fontWeight: 'bold' }} align="center" onClick={(event) => handleRequestSort(event, 'cecocod')}>
                                {orderBy === 'cecocod' ? (
                                    <span style={{ fontSize: '12px' }}>
                                        {order === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                ) : null}
                                Observaciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searched.map((row, key) => (
                            <TableRow
                                key={key}
                                onClick={(e) => handleOpen(e, row)} // pass row to handleOpen
                                onAuxClick={(e) => handleOpen(e, row)} // pass row to handleOpen
                                sx={{
                                    '&:hover': { backgroundColor: 'hsla(207, 100%, 36%, 0.2)' },

                                }} // add hover effect
                            >
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas), fontWeight: 'bold' }} align="center">
                                    <div className={rol!="ADMINISTRADOR" && (selecteddate!=dateToString(new Date()) && selecteddate!=sumarDias(dateToString(new Date()),0))  ? "hidden" : "" }>
                                    <button className="bg-blue-600 p-1 m-0" onClick={(e) => handleOpenbtn(e, row)} >Editar</button></div></TableCell>

                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.cod}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.lastname} {row.name}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.jobtime}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{convertDateFormat(row.dateas)}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.stateas}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.intime}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.outtime}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.extratime25 + row.extratime35 + row.doubletime - row.discounthours}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: "#" + getMatchingValue2(subdepartamentdata, 'Color', 'sdptdtcod', row.sdptdtcod), color: "black" }} align="center">{getMatchingValue2(subdepartamentdata, 'sdptdtdesc', 'sdptdtcod', row.sdptdtcod)}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{getPropertyByIdAndPropName(occupationdata, row.ocptdtcod, "ocptdtcod", "occupationcod")}<br /> {getPropertyByIdAndPropName(occupationdata, row.ocptdtcod, "ocptdtcod", "ocptdtdesc")} </TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{getPropertyByIdAndPropName(workData, row.wdtcod, "wdtcod", "workcod")} <br /> {getPropertyByIdAndPropName(workData, row.wdtcod, "wdtcod", "wdtdesc")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{getPropertyByIdAndPropName(cecoData, row.cecodtcod, "cecodtcod", "cecocod")} <br /> {getPropertyByIdAndPropName(cecoData, row.cecodtcod, "cecodtcod", "cecodtdesc")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "1px", margin: "1px", backgroundColor: getStatusBackgroundColor(row.stateas), color: getStatusColor(row.stateas) }} align="center">{row.asdesc}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default RtAsistence;