import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as XLSX from 'xlsx';
import { GetPrimaryData } from '../../helpers/CRUD/READ/GetDataSb';
import { excelDateToJSDate } from '../../helpers/dateconverter';
import { getifexist, transformData } from '../../helpers/combineddata';
import { CreateFromObject, CreateOrUpdateFromObjectUpsert } from '../../helpers/CRUD/CREATE/CREATEDATASB';

const ExcelUploader = () => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState('');
    //get userdata,get occupationdata,get workdata,get cecodata
    const [userdata, setUserData] = useState([]);
    const [occupationdata, setOccupationData] = useState([]);
    const [workdata, setWorkData] = useState([]);
    const [cecodata, setCecoData] = useState([]);
    const [exceldata, setExcelData] = useState([]);
    const [subdep, setSubdep] = useState("OHYE-OPPTAR");
    const [key, setKey] = useState(0);
    const clearFile = () => {
        setData([]);
        setExcelData([]);
        setFileName('');
    };
    useEffect(() => {

        GetPrimaryData('user', '*', { sdptdtcod: subdep }).then((r) => {
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
        console.log('userdata', userdata);
        console.log('occupationdata', occupationdata);
        console.log('workdata', workdata);
        console.log('cecodata', cecodata);
        console.log('asistence', GetPrimaryData('assistence', '*', { codas: '4534362023-11-20' }));
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

            console.log('Array de objetos:', dataArray);
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
        console.log('result', result);
        console.log('base', exceldata);
        //return result only where prop cdas is not nul
        return result.filter(r => r.codas !== 0);


    }

    return (
        <div>
            <input key={fileName} type="file" className='bg-gray-700 w-48 rounded-xl' onChange={handleFileUpload} accept=".xlsx, .xls" />
            {fileName && <p>Archivo seleccionado: {fileName} <Button onClick={clearFile} className=''>Quitar archivo</Button></p>}
            <button className='bg-black' onClick={() => {
                CreateOrUpdateFromObjectUpsert("assistence", transformDataArray(subdep, exceldata, userdata, occupationdata, workdata, cecodata))
            }}>CONSULTAR</button>
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
                                            console.log('Fecha:', excelDateToJSDate(cell));
                                            content = excelDateToJSDate(cell);
                                        }
                                        if (cellIndex === 1 || cellIndex === 2) {
                                            content = cell;
                                            return <TableCell className={getifexist(userdata, "cod", row[1] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 5 || cellIndex === 6) {
                                            content = cell;
                                            return <TableCell className={getifexist(occupationdata, "occupationcod", row[5] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 7 || cellIndex === 8) {
                                            content = cell;
                                            return <TableCell className={getifexist(workdata, "workcod", row[7] + "")} key={cellIndex}>{content}</TableCell>;

                                        } else if (cellIndex === 9 || cellIndex === 10) {
                                            content = cell;
                                            return <TableCell className={getifexist(cecodata, "cecocod", row[9] + "")} key={cellIndex}>{content}</TableCell>;
                                        } else {
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


