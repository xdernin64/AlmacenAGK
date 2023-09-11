import { ThemeProvider, createTheme } from "@mui/material"
import { getDay, getSpanishDate } from "../../../helpers/date";
import { useState } from "react";
import { useEffect } from "react";
import { GetPrimaryData, GetPrimaryDataBetweenDates } from "../../../helpers/CRUD/READ/GetDataSb";
import MaterialTable from "material-table";
import { dateToString } from "../../../helpers/dateconverter";
import * as xlsx from "xlsx";




const ConsolidadoTable = ({ wheresb }) => {
    const [data, setData] = useState([]); //table data
    const [customfields, setCustomfields] = useState([]); //table data
    const [loading, setLoading] = useState(true);
    const [startdate, setStartdate] = useState(dateToString(new Date()));
    const [enddate, setEnddate] = useState(dateToString(new Date()));
    const [search, setSearch] = useState(false); //table title
    const handleStartdate = (e) => {
        setStartdate(e.target.value);
    }
    const handleEnddate = (e) => {
        setEnddate(e.target.value);
    }
    const handleSearch = (e) => {
        setSearch(true);
    }

    useEffect(() => {
        GetPrimaryDataBetweenDates(
            'assistence',
            'cod, dateas, user(name, lastname), cecodetail(ceco(cecocod, ceconame)), occupationdetail(occupation(occupationcod, occupationname)), workdetail(work(workcod, workname))', wheresb, startdate, enddate

        ).then((r) => {
            // Add 'day' property to each item in the data
            const updatedData = r.map((item) => ({
                ...item,
                namelastname: `${item.user.name} ${item.user.lastname}`,
                day: getDay(item.dateas),
                date: getSpanishDate(item.dateas),

                // Use getDay to calculate 'day' from 'dateas'
            }));
            setData(updatedData);
            setLoading(false);
        });
        setSearch(false);
    }, [search]);

    const theme = createTheme();
    const columns = [
        {
            title: 'Codigo', field: 'cod', editable: 'never',
            cellStyle: {
                textAlign: 'center',
                color: "#0000CC",
                fontFamily: 'calibri'
            }
        },
        {
            //i wanto to have more weight to this column
            title: 'NOMBRES Y APELLIDOS', field: 'namelastname', editable: 'never',
            //i want to have more width in my column as two columns
            width: '40%',
            cellStyle: {
                textAlign: 'center',
                color: "#0000CC",
                fontFamily: 'calibri'
            }
        },
        {
            title: 'DIA', field: 'day', editable: 'never',

            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        },
        {
            title: 'FECHA', field: 'date', editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        },
        {
            title: "Cod Ocup.", field: "occupationdetail.occupation.occupationcod", editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        },
        {
            title: "Ocupacion", field: "occupationdetail.occupation.occupationname", editable: 'never',
            cellStyle: (rowData, dataIndex) => {
                return {
                    textAlign: 'center',
                    fontFamily: 'calibri',
                    backgroundColor: rowData === 'DSO' ? '#ffeb9c' : 'transparent',
                    color: rowData === 'DSO' ? '#9c6524' : 'black'
                };
            }
        },
        {
            title: "Cod Labor", field: "workdetail.work.workcod", editable: 'never',
            cellStyle: {
                backgroundColor: '#FFFFCC',
                textAlign: 'center',
            }
        },
        {
            title: "Labor", field: "workdetail.work.workname", editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        },
        {
            title: "Cod ceco", field: "cecodetail.ceco.cecocod", editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        },
        {
            title: "Centro de Coste", field: "cecodetail.ceco.ceconame", editable: 'never',
            cellStyle: {
                textAlign: 'center',
                fontFamily: 'calibri'
            }
        }
    ]
    const exportToExcel = () => {
        const dataToExport = data.map((item) => ({
            Codigo: item.cod,
            "Nombres y Apellidos": item.namelastname,
            Dia: item.day,
            Fecha: item.date,
            "Cod Ocup.": item.occupationdetail.occupation.occupationcod,
            Ocupacion: item.occupationdetail.occupation.occupationname,
            "Cod Labor": item.workdetail.work.workcod,
            Labor: item.workdetail.work.workname,
            "Cod ceco": item.cecodetail.ceco.cecocod,
            "Centro de Coste": item.cecodetail.ceco.ceconame,
        }));

        const ws = xlsx.utils.json_to_sheet(dataToExport);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Consolidado");
        xlsx.writeFile(wb, "Consolidado.xlsx");

    };

    return (
        <div className="">
            <ThemeProvider theme={theme}>

                <div>
                    {/* i want to have two input dates with start and end date with nice styles in tailwindcss */}
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-col mr-4">
                            <label htmlFor="startdate">Fecha de inicio</label>
                            <input type="date" name="startdate" id="startdate" onChange={handleStartdate} value={startdate} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="enddate">Fecha de fin</label>
                            <input type="date" name="enddate" id="enddate" onChange={handleEnddate} value={enddate} />
                        </div>
                        <div className="flex flex-col justify-end">
                            <button className=" m-0 bg-gray-500" type="submit" onClick={handleSearch}>Buscar</button>
                        </div>
                    </div>
                    <button className=" m-0 bg-gray-500" onClick={exportToExcel}>
                        Exportar a Excel
                    </button>
                </div>
                <MaterialTable
                    title="Consolidado"
                    columns={columns}
                    data={data}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'Filas',
                            labelRowsPerPage: 'Filas por página:',
                        },
                        toolbar: {
                            searchPlaceholder: 'Buscar',
                        },
                        //laction for change delete confirmation text 
                        header: {
                            actions: 'Acciones'
                        },
                        body: {
                            emptyDataSourceMessage: 'No hay registros para mostrar',
                            filterRow: {
                                filterTooltip: 'Filtrar',
                            },
                            addTooltip: 'Agregar',
                            deleteTooltip: 'Eliminar',
                            editTooltip: 'Editar',
                            editRow: {
                                deleteText: '¿Estás seguro de querer eliminar esta fila?',
                                cancelTooltip: 'Cancelar',
                                saveTooltip: 'Guardar',
                            },
                        },
                        //group text for grouping
                        grouping: {
                            placeholder: "Arrastre las columnas aquí para agruparlas",
                            groupedBy: 'Agrupado por:',
                        },

                    }}
                    options={{
                        exportButton: true,
                        headerStyle: {
                            backgroundColor: '#95B3D7',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: 'calibri',
                            textAlign: 'center',
                        },
                        cellStyle: {
                            textAlign: 'center',
                            fontFamily: 'calibri',
                            border: '1px solid #000', // Establece el borde en las celdas
                        },
                        rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        actionsCellStyle: {
                            backgroundColor: '#FFF',
                        },
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30],
                        emptyRowsWhenPaging: true,
                        addRowPosition: 'first',
                        actionsColumnIndex: -1,
                        exportAllData: true,
                        exportFileName: 'Consolidado',
                        grouping: true,
                        search: true,
                        showSelectAllCheckbox: true,
                        showTextRowsSelected: true,
                        showTitle: true,
                        toolbarButtonAlignment: 'right',
                        headerSelectionProps: {
                            color: 'primary',
                        },
                        selectionProps: (rowData) => ({
                            disabled: rowData.disabled,
                        }),
                    }}


                />

            </ThemeProvider>

        </div>
    )
}
export default ConsolidadoTable;