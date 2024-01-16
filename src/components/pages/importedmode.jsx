import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as XLSX from 'xlsx';
import { GetPrimaryData } from '../../helpers/CRUD/READ/GetDataSb';
import { decimalToTime, excelDateToJSDate } from '../../helpers/dateconverter';
import { getifexist, transformData } from '../../helpers/combineddata';
import { CreateFromObject, CreateOrUpdateFromObjectUpsert } from '../../helpers/CRUD/CREATE/CREATEDATASB';
import { deleteDataSwal, errorMessage } from '../../helpers/Alerts/alerts';
import { get } from 'firebase/database';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaFileExcel } from "react-icons/fa";

const ExcelUploader = ({ area, departament, subdepartament, rol }) => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState('');
    //get userdata,get occupationdata,get workdata,get cecodata
    const [userdata, setUserData] = useState([]);
    const [occupationdata, setOccupationData] = useState([]);
    const [workdata, setWorkData] = useState([]);
    const [cecodata, setCecoData] = useState([]);
    const [exceldata, setExcelData] = useState([]);
    const [subdep, setSubdep] = useState(subdepartament);
    const [key, setKey] = useState(0);
    const [subdepoptions, setSubdepoptions] = useState([]);
    const clearFile = () => {
        setData([]);
        setExcelData([]);
        setFileName('');
    };
    useEffect(() => {
        GetPrimaryData('subdepartamentdetail').then((r) => {
            setSubdepoptions(r);
        })
    }, [rol == "ADMINISTRADOR"]);


    useEffect(() => {

        GetPrimaryData('user', '*').then((r) => {
            setUserData(r);
        }
        );
        GetPrimaryData('occupationdetail', '*', { sdptdtcod: subdep }).then((r) => {
            setOccupationData(r);
        }
        );
        GetPrimaryData('workdetail', '*', { sdptdtcod: subdep }).then((r) => {
            setWorkData(r);
        }
        );
        GetPrimaryData('cecodetail', '*', { sdptdtcod: subdep }).then((r) => {
            setCecoData(r);
        }
        );

        clearFile();
    }, [subdep]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const headerMapping = {
            'CODIGO': 'cod',
            'NOMBRES Y APELLIDOS': "name",
            'FECHA': 'date',
            'Cod Ocup.': 'occupationcod',
            'Ocupacion ': 'occupationname',
            'Cod. Labor': 'workcod',
            'Destino Labor(ubicación)': 'workname',
            'CECO': 'cecocod',
            'DESCRIPCION CECO': 'ceconame',
            'H.I.': 'intime',
            'H.F.': 'outtime',
            'UBICACIÓN': 'lcdtcod'
            // Agrega más mapeos según sea necesario
        };
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setData(excelData);

            // Convertir los datos de la tabla en un array de objetos e imprimir en la consola
            const dataArray = excelData.slice(1).map((row) => {

                const obj = {};
                excelData[0].forEach((header, index) => {
                    obj[header] = row[index] !== undefined ? row[index] : null;
                    if (header === 'FECHA') {
                        // Formatear la fecha si es la columna 'FECHA'
                        obj[header] = row[index] !== undefined ? excelDateToJSDate(row[index]) : null;
                    } else if (header == "H.I." || header == "H.F.") {
                        obj[header] = row[index] !== undefined ? decimalToTime(row[index]) : null;
                        console.log("hora de entrada", obj[header]);
                    } else if (header === 'Cod Ocup.' || header === 'Cod. Labor' || header === 'CECO' || header === 'CODIGO') {
                        // Utilizar el valor sin cambios para otras columnas
                        obj[header] = row[index] !== undefined ? row[index] + '' : null;
                    }

                    /* if (header === 'FECHA') {
                        // Formatear la fecha si es la columna 'FECHA'
                        console.log('Fecha:',excelDateToJSDate(row[index]));
                    }*/
                });
                return obj;
            });
            setExcelData(dataArray.map(row => {
                const mappedRow = {};
                for (const header in row) {
                    const friendlyHeader = headerMapping[header] || header;
                    mappedRow[friendlyHeader] = row[header];
                }
                return mappedRow;
            }));
        };
        reader.readAsBinaryString(file);
    };

    function transformDataArray(subdep, exceldataArray, userdata, occupationdata, workdata, cecodata) {
        const result = exceldataArray.map(exceldata => transformData(subdep, exceldata, userdata, occupationdata, workdata, cecodata));

        //return result only where prop cdas is not nul
        return result.filter(r => r.codas !== 0);
    }

    return (

        <div className='pagina'>
            <Breadcrumbs>
                <Link to="/home" className="breadcrumb">Home</Link>
                <Link to="/asistencia" className="breadcrumb">Asistencias</Link>
                <Link to="/importedmode" className="breadcrumb">Importar excel</Link>

            </Breadcrumbs>
            <div className='tittlepage'>Importar excel</div>

            <IconButton

                component="label"
                sx={{ color: "white" }}
                key={fileName}
            >   <div className='border border-green-400 flex p-2 rounded-md  hover:bg-green-100'>
                    <FaFileExcel className='text-green-600' /> <div className='text-green-400 text-lg pl-2 '>  Subir excel</div></div>
                <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                    accept=".xlsx, .xls"
                />
            </IconButton>
            <a href="../../../public/Jornales-OHYE.xlsx">
                <button className='bg-white text-blue-600 border hover:bg-blue-100 border-blue-600'>DESCARGAR PLANTILLA</button> </a>
            {fileName && <p>Archivo seleccionado: {fileName} <Button onClick={clearFile} className=''>Quitar archivo</Button></p>}
            {rol === "ADMINISTRADOR" && (
                <select className='bg-gray-100 rounded-xl' onChange={(e) => {
                    setSubdep(e.target.value);
                }}>
                    <option value="">Seleccionar Subarea</option>
                    {subdepoptions.map((subdepoption, index) => (
                        <option key={index} value={subdepoption.sdptdtcod}>{subdepoption.sdptdtdesc}</option>
                    ))}
                </select>
            )}


            <button className='bg-blue-gray-800' onClick={() => {
                deleteDataSwal(() => {
                    CreateOrUpdateFromObjectUpsert("assistence", transformDataArray(subdep, exceldata, userdata, occupationdata, workdata, cecodata))
                },
                    "Antes de guardar revisar que no existan datos de color rojo en la tabla, consultar con 959077258 para validar los datos en rojo, si no hay datos en rojo, dar click en aceptar, si hay datos en rojo los datos se guardaran o actualizaran en caso ya exista un dato anterior. Solo subir asistencia de la subarea actual " + subdep,
                    "Error al subir los datos",
                    "Datos subidos correctamente");
            }}>Guardar datos</button>
            {data.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {data[0].map((col, index) => (
                                    <TableCell key={index}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(1).map((row, rowIndex) => (

                                <TableRow key={rowIndex}>

                                    {row.map((cell, cellIndex) => {
                                        let content = cell;
                                        let style = ""
                                        if (cellIndex === 4) {
                                            content = excelDateToJSDate(cell);
                                        }
                                        if (cellIndex === 1 || cellIndex === 2) {
                                            content = cell;
                                            return <TableCell sx={{ color: "whitesmoke" }} className={getifexist(userdata, "cod", row[1] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 5 || cellIndex === 6) {
                                            content = cell;
                                            return <TableCell sx={{ color: "whitesmoke" }} className={getifexist(occupationdata, "occupationcod", row[5] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 7 || cellIndex === 8) {
                                            content = cell;
                                            return <TableCell sx={{ color: "whitesmoke" }} className={getifexist(workdata, "workcod", row[7] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 9 || cellIndex === 10) {
                                            content = cell;
                                            return <TableCell sx={{ color: "whitesmoke" }} className={getifexist(cecodata, "cecocod", row[9] + "")} key={cellIndex}>{content}</TableCell>;
                                        } else if (cellIndex === 11 || cellIndex === 12) {
                                            content = cell;
                                            return <TableCell  key={cellIndex}>{decimalToTime(content)}</TableCell>;
                                        }else {
                                            return <TableCell key={cellIndex}>{content}</TableCell>;
                                        }
                                    })}
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ExcelUploader;


