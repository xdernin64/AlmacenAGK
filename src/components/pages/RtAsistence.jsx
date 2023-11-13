import { useEffect, useState } from "react";
import { GetPrimaryData } from "../../helpers/CRUD/READ/GetDataSb";
import { mergeDatauseras2 } from "../../helpers/combineddata";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CustomizedDialogs from "../organism/modals/ModalAsistence";

const RtAsistence = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [Userdata, setUserdata] = useState([]);
    const [Asistancedata, setAsistancedata] = useState([]);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [editedValue, setEditedValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); // add state to keep track of selected row

    //efect to charge te data in the start
    useEffect(() => {
        async function getMaindata() {
            try {
                
                const userData = await GetPrimaryData("user", '*', { state: "ACTIVO" });
                const asistenceData = await GetPrimaryData("assistence", '*', { dateas: "2023-11-10" });
                setUserdata(userData);
                setAsistancedata(asistenceData);
                setCombinedData(mergeDatauseras2(userData, asistenceData))
            }
            catch (error) {
                console.log(error);
            }
        }
        getMaindata();
    }, []);
    //efect to charge updated data
    useEffect(() => {
        GetPrimaryData('assistence', '*', { dateas: "2023-11-10" }).then((data) => {
            setAsistancedata(data);
            setCombinedData(mergeDatauseras2(Userdata, Asistancedata));
            setUpdate(false);
        });
    }, [update]);

    const handleOpen = (e, row) => {
        if (e.ctrlKey) {
            setSelectedRow(row); // set selected row
            setOpen(true);
            console.log(row); // print row props to console
        }
    };

    const handleClose = () => {
        setSelectedRow(null); // reset selected row
        setOpen(false);
    };

    const handleSave = (newData) => {
        setData(newData);
        handleClose();
    };

    return (
        <Container>
            
            <div>
                <button onClick={handleOpen}>Editar datos</button>
                <CustomizedDialogs open={open} handleClose={handleClose} rowData={selectedRow} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, borderWidth: 'solid' }} aria-label="simple table">
                    <TableHead className="rounded ">
                        <TableRow className="bg-blue-800 text-gray-500 font-bold" sx={{ border: 'solid 1px', borderColor: 'gray' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Codigo</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Trabajador</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center" >Fecha</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Estado</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Ingreso</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Salida</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Fundo</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Ocupación</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Labor</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Ceco</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {combinedData.map((row, key) => (
                            <TableRow
                                key={key}
                                onClick={(e) => handleOpen(e, row)} // pass row to handleOpen
                                onAuxClick={(e) => handleOpen(e, row)} // pass row to handleOpen
                                sx={{ '&:hover': { backgroundColor: 'hsla(207, 100%, 36%, 0.2)' } }} // add hover effect
                                
                            >
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.codas}</TableCell>
                                <TableCell sx={{ bgcolor: 'hsla(207, 100%, 36%, 0.2)', border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.cod}</TableCell>
                                <TableCell sx={{ bgcolor: 'hsla(207, 100%, 36%, 0.2)', border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.lastname} {row.name}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.dateas}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.stateas}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.intime}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.outtime}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.lcdtcod}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.ocptdtcod}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.wdtcod}</TableCell>
                                <TableCell sx={{ border: 'solid 1px', borderColor: 'hsla(211, 100%, 36%, 0.10)' }} align="center">{row.cecodtcod}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
}
export default RtAsistence;